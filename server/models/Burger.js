import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Burger = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, default: 1 },
    ingredients: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } } // _id: && id
);

export default Burger;
