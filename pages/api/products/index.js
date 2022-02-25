import dbConnect from "../../../util/mongo"; // connection to our db
import Product from "../../../models/Product"; // connection to our model

export default async function handler(req, res) {
  // we create a req (request) method
  const { method } = req;

  // we first have to make sure our db is connected
  await dbConnect();

  // if we use the GET method then do this
  if (method === "GET") {
    try {
      // try and catch block
      const products = await Product.find(); // we want to fetch data
      res.status(201).json(products);
      // whatever we get back in the positive case,
      // we convert to json
    } catch (err) {
      // if there is an error
      res.status(500).json(err);
    }
  }

  // if we use the POST method then do this
  if (method === "POST") {
    try {
      // try and catch block
      const product = await Product.create(req.body); // we want to create data
      res.status(201).json(product);
      // whatever we get back in the positive case,
      // we convert to json
    } catch (err) {
      // if there is an error
      res.status(500).json(err);
    }
  }
}
