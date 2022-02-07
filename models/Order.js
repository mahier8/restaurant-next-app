import { Mongoose } from "mongoose";

// creating a schema for orders. Need schemas for OrderId(names),
// Customer, Adress, Total, additional ingredients, images
//  *check the orders page
const OrderSchema = new Mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
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
export default Mongoose.models.Order || Mongoose.model("Order", OrderSchema);
