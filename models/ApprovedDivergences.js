import mongoose from "mongoose";

const approvedDivergenceSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    item: [
      {
        nome: String,
        descricao: String,
        localizacao: String,
        serial: String,
        tag: String,
      },
    ],
  },
  { timestamps: true }
);

const ApprovedDivergences = mongoose.model("ApprovedDivergences", approvedDivergenceSchema);

export default ApprovedDivergences;
