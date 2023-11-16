import Divergences from "../models/Divergences.js";
import ApprovedDivergences from "../models/ApprovedDivergences.js";

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
    const { location } = req.body;
    const item = {
      item: req.body.divergences,
      user: req.username,
      location,
    };

    const response = await Divergences.create(item);
    res.status(201).json({
      response,
      msg: "Inventário divergente. Saiba mais informações na tela de Divergências!",
    });
  } catch (error) {
    console.error("Erro ao criar inventário:", error);
    res.status(500).json({ error: "Erro ao criar inventário" });
  }
};

export const approveDivergence = async (req, res) => {
  try {
    const { id } = req.params;
    const divergence = await Divergences.findById(id).exec();

    if (!divergence) {
      res.status(204).json({ msg: `Nenhuma divergência encontrada!` });
      return;
    }

    const approvedDivergenceData = {
      location: divergence.location,
      user: req.username,
      item: divergence.item,
    };

    const approvedDivergence = await ApprovedDivergences.create(
      approvedDivergenceData
    );

    const response = await divergence.deleteOne();

    res
      .status(200)
      .json({ response, approvedDivergence, msg: "Divergência aprovada!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erro ao aprovar divergência e mover dados para a nova tabela",
    });
  }
};

export const getAllApprovedDivergences = async (req, res) => {
  try {
    const getApprovedDivergences = await ApprovedDivergences.find();
    res.status(200).json(getApprovedDivergences);
  } catch (error) {
    console.error("Erro na consulta das divergências:", error);
    res.status(500).json({ error: "Erro ao buscar divergências" });
  }
} 