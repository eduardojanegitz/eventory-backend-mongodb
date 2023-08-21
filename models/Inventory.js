import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    item: [
      {
        descricao: String,
        nome: String,
        localizacao: String,
        serial: String
      }
    ]
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
