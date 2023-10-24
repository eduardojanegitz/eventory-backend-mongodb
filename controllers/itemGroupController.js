import ItemGroup from "../models/ItemGroup.js";

export const getAllItemGroup = async (req, res) => {
  try {
    const getItemGroup = await ItemGroup.find();

    res.status(200).json(getItemGroup);
  } catch (error) {
    console.log("Erro ao encontrar os grupos de itens", error);
  }
};

export const createItemGroup = async (req, res) => {
  try {
    const { name, description, depreciation, active } = req.body;
    const response = await ItemGroup.create({ name, description, depreciation, active });
    res
      .status(201)
      .json({ response, msg: "Grupo de itens criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateItemGroup = async (req, res) => {
  try {
    const { name, description, depreciation, active } = req.body;

    const { id } = req.params;
    const itemGroup = await ItemGroup.findById(id).exec();
    if (!itemGroup) {
      res.status(204).json({ msg: `Nenhum grupo de itens com esse ID` });
    } else {
      const response = await itemGroup.updateOne({ name, description, depreciation, active });
      res
        .status(201)
        .json({ response, msg: "Grupo de itens atualizado com sucesso!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const itemGroup = await ItemGroup.findById(id).exec();
    if (!itemGroup) {
      res.status(204).json({ msg: `Nenhum centro de custo com esse ID` });
    }
    const response = await itemGroup.deleteOne();
    res 
      .status(200)
      .json({ response, msg: "Grupo de itens deletado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};
