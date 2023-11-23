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
    },
    responsable: {
      type: String,
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
      type: String,
      required: true,
    },
    acquisitionDate: {
      type: Date,
      required: true,
    },
    writeOffDate: {
      type: Date,
    },
    depreciation: {
      type: Number,
      required: true,
    },
    itemGroup: {
      type: String,
      required: true,
    },
    costCenter: {
      type: String,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
