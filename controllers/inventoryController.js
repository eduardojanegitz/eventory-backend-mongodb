import Inventory from "../models/Inventory.js";
import Item from "../models/Item.js";

export const getAllInventory = async (req, res) => {
  try {
    const getInventory = await Inventory.find();

    res.status(200).json(getInventory);
  } catch (error) {
    console.log("erro na consulta dos inventários", error);
  }
};

export const getItemByLocation = async (req, res) => {
  try {
    const location = req.params.location
    const getItem = await Item.find({location})

    res.status(200).json(getItem)
  } catch (error) {
    console.log(error)
  }
}

export const createInventory = async (req, res) => {
  try {
    const item = {
      // location: req.body.location,
      // responsable: req.body.responsable,
      item: req.body.list,
      user: req.username,
    };

    const response = await Inventory.create(item);
    res.status(201).json({ response, msg: "Item inventariado com sucesso" });
  } catch (error) {
    console.log(error);
  }
};
