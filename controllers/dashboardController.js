import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Item from "../models/Item.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllInventory = {
  getAll: async (req, res) => {
    try {
      const getInventory = await Transaction.find();

      res.status(200).json(getInventory);
    } catch (error) {
      console.log("erro na consulta dos inventários", error);
    }
  },
};

export const postInventoriedItem = {
  create: async (req, res) => {
    try {
      const item = {
        location: req.body.location,
        responsable: req.body.responsable,
        item: req.body.item,
      };

      const response = await Transaction.create(item);
      res.status(201).json({ response, msg: "Item inventariado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

export const totalValue = async (req, res) => {
  try {
    const countVal = await Item.aggregate([
      {
        $group: {
          _id: { id: "_id" },
          total: { $sum: "$value" },
        },
      },
    ]);

    res.status(200).json(countVal);
  } catch (error) {
    console.log(error);
  }
};

export const totalValueByYear = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const totalValueByYear = await Item.aggregate([
      {
        $addFields: {
          createdAt: { $toDate: "$acquisitionDate" },
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$acquisitionDate" },
          },
          total: { $sum: "$value" },
        },
      },
    ]);

    res.status(200).json(totalValueByYear);
  } catch (error) {
    console.log("Erro interno no servidor.", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export const getItemsFromLastMonth = async (req, res) => {
  try {
    const today = new Date();

    const firstDayActualMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    firstDayActualMonth.setHours(0, 0, 0, 0);

    const firstDayLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - 1);
    firstDayLastMonth.setHours(0, 0, 0, 0);

    const itemsLastMonth = await Item.find({
      createdAt: {
        $gte: firstDayLastMonth,
        $lt: firstDayActualMonth,
      },
    });

    if (itemsLastMonth.length === 0) {
      res.status(204).json("0");
    } else {
      res.status(200).json(itemsLastMonth);
    }
  } catch (error) {
    console.log("Erro em encontrar os itens do mês anterior", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getItemByCostCenter = async (req, res) => {
  try {
    const itemByCostCenter = await Item.aggregate([
      {
        $group: {
          _id: "$costCenter",
          totalValue: { $sum: "$value" },
        },
      },
    ]);

    res.status(200).json(itemByCostCenter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const getItemByItemGroup = async (req, res) => {
  try {
    const itemByItemGroup = await Item.aggregate([
      {
        $group: {
          _id: "$itemGroup",
          totalValue: { $sum: "$value" },
        },
      },
    ]);

    res.status(200).json(itemByItemGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const calculateAverageAge = async (req, res) => {
  try {
    // Obtenha todos os itens
    const allItems = await Item.find();

    if (allItems.length === 0) {
      return res.status(204).json("Nenhum item encontrado");
    }

    const ages = allItems.map((item) => {
      const acquisitionDate = new Date(item.acquisitionDate);
      const currentDate = new Date();
      const ageInYears =
        currentDate.getFullYear() - acquisitionDate.getFullYear();

      return ageInYears;
    });

    const totalAges = ages.reduce((acc, age) => acc + age, 0);
    const averageAge = totalAges / ages.length;

    res.status(200).json({ averageAge });
  } catch (error) {
    console.error("Erro ao calcular a idade média do ativo imobilizado", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
