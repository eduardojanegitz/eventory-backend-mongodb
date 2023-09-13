import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    item: [
      {
        descricao: String,
        nome: String,
        localizacao: String,
        serial: String,
      },
    ],
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
