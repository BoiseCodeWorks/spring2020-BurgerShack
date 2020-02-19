import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Combo = new Schema(
  {
    boardNumber: { type: Number, required: true, unique: true },
    burgerId: { type: ObjectId, ref: "Burger", required: true },
    sideId: { type: ObjectId, ref: "Side", required: true },
    price: { type: Number, required: true, default: 1 }
  },
  { timestamps: true, toJSON: { virtuals: true } } // _id: && id
);

export default Combo;
