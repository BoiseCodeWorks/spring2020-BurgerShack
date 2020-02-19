import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Order = new Schema(
  {
    burgers: [{ type: ObjectId, ref: "Burger" }],
    sides: [{ type: ObjectId, ref: "Side" }],
    combos: [{ type: ObjectId, ref: "Combo" }],
    subtotal: { type: Number, required: true, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Order;
