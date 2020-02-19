import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Side = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, default: 1 },
    sizes: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } } // _id: && id
);

export default Side;
