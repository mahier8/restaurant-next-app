import mongoose from "mongoose";

// creating a schema for products. Need schemas for titles(names),
// descriptions, prices, size, additional ingredients, images
//  *check the product page
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

// if we already have a model for Product, do not create an
// additional model, just use the model we already have
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
