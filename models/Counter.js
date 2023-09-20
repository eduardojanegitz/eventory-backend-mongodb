import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: String,
  count: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;
