import Location from "../models/Location";

export const getAll = async (req, res) => {
  try {
    const getLocation = await Location.find();
    res.status(200).json(getLocation);
  } catch (error) {
    console.error("Erro ao buscar as localizações:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const createLocation = async (req, res) => {
  try {
    const { name, description } =
      req.body;

    if (!name) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const location = {
      name,
      description
    };

    const response = await Location.create(location);
    res
      .status(201)
      .json({ response, message: "Localização registrada com sucesso!" });
  } catch (error) {
    res.status(500).json("Erro interno do servidor:", error);
  }
};
