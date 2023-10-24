import mongoose from "mongoose";

const ItemGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    depreciation: {
      type: Number,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ItemGroup = mongoose.model("ItemGroup", ItemGroupSchema);
export default ItemGroup;
