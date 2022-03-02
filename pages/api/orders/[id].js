import dbConnect from "../../../util/mongo"; // connection to our db
import Order from "../../../models/Order"; // connection to our model

const handler = async (req, res) => {
  // we create a req (request) method
  const {
    method,
    query: { id },
  } = req;

  // we first have to make sure our db is connected
  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true, // now it will return the newest version
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
