import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    // the query is what we send in the url (the query)
    // when we call get getServerSideProps in the product
    // file in the Product folder. The params.
  } = req;

  await dbConnect();

  if (method === "GET") {
    // GET (READ) the data (pizza)
    try {
      const product = await Product.findById(id);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err); // if there is an error
    }
  }

  if (method === "PUT") {
    // PUT (UPDATE) the data (pizza)
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err); // if there is an error
    }
  }

  if (method === "DELETE") {
    // DELETE the data (pizza)
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted");
    } catch (err) {
      res.status(500).json(err); // if there is an error
    }
  }
}
