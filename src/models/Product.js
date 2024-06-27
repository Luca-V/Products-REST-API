import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  imgURL: {
    type: String
  },
}, {
  timestamps: true,
  versionKey: false
});

export default model("Product", productSchema);