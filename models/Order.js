import mongoose from "mongoose";

// creating a schema for orders. Need schemas for OrderId(names),
// Customer, Adress, Total, additional ingredients, images
//  *check the orders page
const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// if we already have a model for Product, do not create an
// additional model, just use the model we already have
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
