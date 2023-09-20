import Inventory from "../models/Inventory.js";
import Item from "../models/Item.js";
import Counter from "../models/Counter.js";

async function getNextInventoryCode() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "inventoryCode" },
      { $inc: { count: 1 } },
      { new: true }
    );

    if (!counter) {
      throw new Error("Não foi possível obter o próximo número de inventário.");
    }

    return counter.count;
  } catch (error) {
    throw new Error(
      `Erro ao obter o próximo número de inventário: ${error.message}`
    );
  }
}

export const getAllInventory = async (req, res) => {
  try {
    const getInventory = await Inventory.find();
    res.status(200).json(getInventory);
  } catch (error) {
    console.error("Erro na consulta dos inventários:", error);
    res.status(500).json({ error: "Erro ao buscar inventários" });
  }
};

export const getItemByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    const getItem = await Item.find({ location });
    res.status(200).json(getItem);
  } catch (error) {
    console.error("Erro ao buscar itens por localização:", error);
    res.status(500).json({ error: "Erro ao buscar itens por localização" });
  }
};

export const createInventory = async (req, res) => {
  try {
    const nextInventoryCode = await getNextInventoryCode();
    const item = {
      inventoryCode: nextInventoryCode,
      item: req.body.list,
      user: req.username,
    };

    const response = await Inventory.create(item);
    res.status(201).json({ response, msg: "Item inventariado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar inventário:", error);
    res.status(500).json({ error: "Erro ao criar inventário" });
  }
};
