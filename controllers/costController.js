import Cost from "../models/Cost.js";

export const getAllCost = async (req, res) => {
  try {
    const getCost = await Cost.find();

    res.status(200).json(getCost);
  } catch (error) {}
};

export const createCost = async (req, res) => {
  try {
    const { description, code, active } = req.body;
    const existCost = await Cost.findOne({ code });
    if (existCost) {
      res
        .status(400)
        .json({ error: "Já existe um centro de custo com esse código" });
    }
    const response = await Cost.create({ description, code, active });
    res
      .status(201)
      .json({ response, msg: "Centro de custo criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateCost = async (req, res) => {
  try {
    const { description, active } = req.body;
    //   if (!req?.body?.code) {
    //     return res.status(400).json({ msg: 'Parâmetro ID é obrigatório!' });
    // }
    const { _id } = req.params;
    const cost = await Cost.findById({ _id }).exec();
    if (!cost) {
      res.status(204).json({ msg: `Nenhum centro de custo com esse ID` });
    }
    const response = await cost.updateOne({ description, active });
    res
      .status(201)
      .json({ response, msg: "Centro de custo atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCost = async (req, res) => {
  try {
    const { _id } = req.params;
    const cost = await Cost.findById({ _id }).exec();
    if (!cost) {
      res.status(204).json({ msg: `Nenhum centro de custo com esse ID` });
    }
    const response = await cost.deleteOne({ _id });
    res
      .status(201)
      .json({ response, msg: "Centro de custo deletado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};
