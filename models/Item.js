import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    tag: {
      type: Number,
      required: true,
    },
    acquisitionDate: {
      type: Date,
      required: true,
    },
    writeOffDate: {
      type: Date,
      required: true,
    },
    depreciation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
