import dbConnect from "../../../util/mongo"; // connection to our db
import Order from "../../../models/Order"; // connection to our model

const handler = async (req, res) => {
  // we create a req (request) method
  const { method } = req;

  // we first have to make sure our db is connected
  await dbConnect();

  // these steps are exactly the same as I first did in the API/products
  if (method === "GET") {
    try {
      const orders = await Order.find(); // we want to fetch data
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body); // we want to create data
      res.status(201).json(order);
    } catch {
      res.status(500).json(err);
    }
  }
};

export default handler;
