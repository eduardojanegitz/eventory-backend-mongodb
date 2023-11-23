import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const item = {
      branch: req.body.branch,
      name: req.body.name,
      description: req.body.description,
      value: req.body.value,
      responsable: req.body.responsable,
      location: req.body.location,
      supplier: req.body.supplier,
      serialNumber: req.body.serialNumber,
      tag: req.body.tag,
      acquisitionDate: req.body.acquisitionDate,
      depreciation: req.body.depreciation,
      itemGroup: req.body.itemGroup,
      costCenter: req.body.costCenter,
      invoice: req.body.invoice,
    };

    const response = await Item.create(item);
    res.status(201).json({ response, msg: "Item criado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const getItem = await Item.find();

    res.status(200).json(getItem);
  } catch (error) {
    console.log(error);
  }
};

export const getOne = async (req, res) => {
  try {
    const tag = req.params.tag;
    const getItemByTag = await Item.findOne({ tag });

    res.status(200).json(getItemByTag);
  } catch (error) {
    console.log("Erro em encontrar o item", error);
  }
};

export const updateItem = async (req, res) => {
  try {
    const {
      name,
      description,
      value,
      supplier,
      serialNumber,
      acquisitionDate,
      tag,
      branch,
      depreciation,
      costCenter,
    } = req.body;

    const { id } = req.params;
    const item = await Item.findById(id).exec();
    if (!item) {
      res.status(204).json({ msg: `Nenhum item encontrado com esse ID!` });
    }
    const response = await item.updateOne({
      name,
      description,
      value,
      supplier,
      serialNumber,
      acquisitionDate,
      tag,
      branch,
      depreciation,
      costCenter,
    });
    res.status(201).json({ response, msg: "Item atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).exec();
    if (!item) {
      res.status(204).json({ msg: `Nenhum item encontrado!` });
    }
    const response = await item.deleteOne();
    res.status(200).json({ response, msg: "Item excluído com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};

export const uploadItemImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).exec();
    if (!item) {
      res.status(404).json({ msg: "Item não encontrado" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ msg: "Nenhuma imagem foi enviada" });
      return;
    }

    item.image.data = req.file.buffer;
    item.image.contentType = req.file.mimetype;

    await item.save();

    res.status(200).json({ msg: "Imagem do item atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};
