import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    inventoryCode: {
      type: Number,
      unique: true,
    },
    item: [
      {
        descricao: String,
        nome: String,
        localizacao: String,
        serial: String,
        tag: String,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
