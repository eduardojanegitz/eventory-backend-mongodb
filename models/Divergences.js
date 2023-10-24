import mongoose from "mongoose";

const DivergencesSchema = new mongoose.Schema(
  {
    item: [
      {
        descricao: String,
        nome: String,
        localizacao: String,
        serial: String,
      },
    ],
    location: {
      type: String 
    },
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Divergences = mongoose.model("Divergences", DivergencesSchema);

export default Divergences;
