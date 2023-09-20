import Item from "../models/Item.js";
import Movement from "../models/Movement.js";

export const getAll = async (req, res) => {
  try {
    const getMovement = await Movement.find();
    res.status(200).json(getMovement);
  } catch (error) {
    console.error("Erro ao buscar movimentos:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const createMovement = async (req, res) => {
  try {
    const { name, actualLocation, newLocation, reason, observations } =
      req.body;

    if (!name || !actualLocation || !newLocation || !reason || !observations) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const itemId = req.body.id;

    const item = await Item.findByIdAndUpdate(itemId, {
      location: newLocation,
    });

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado." });
    }

    const movement = {
      name,
      actualLocation,
      newLocation,
      reason,
      observations,
      user: req.username,
    };

    const response = await Movement.create(movement);
    res
      .status(201)
      .json({ response, message: "Movimento registrado com sucesso!" });
  } catch (error) {
    res.status(500).json("Erro interno do servidor:", error);
  }
};
