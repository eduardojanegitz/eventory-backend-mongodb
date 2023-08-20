import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    item: String
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
