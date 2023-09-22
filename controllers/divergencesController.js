import Divergences from "../models/Divergences.js";

export const getAllDivergences = async (req, res) => {
  try {
    const getDivergences = await Divergences.find();
    res.status(200).json(getDivergences);
  } catch (error) {
    console.error("Erro na consulta das divergências:", error);
    res.status(500).json({ error: "Erro ao buscar divergências" });
  }
};

export const createDivergence = async (req, res) => {
  try {
    const item = {
      item: req.body.divergences,
      user: req.username
    };

    const response = await Divergences.create(item);
    res.status(201).json({ response, msg: "Item inventariado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar inventário:", error);
    res.status(500).json({ error: "Erro ao criar inventário" });
  }
};
