import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  // We are tring to affect the UI, once we delete something
  // create 2 useState hooks set to the data that is
  // stored that we receive from the getServerSideProps
  // function below
  const [pizzaList, setPizzaList] = useState(products);
  const [ordersList, setOrdersList] = useState(orders);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      // we use the delete method and delete from the api using
      // the id as a parameter. this however only changes the db.
      // check above for UI changes
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      ); // for the UI
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      // we catch an error in case
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                {/* we only display the first 5 numbers in the id string */}
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orders.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                {/* a javascript method to only display the first 5 numbers */}
                <td>{"8555241688151584".slice(0, 5)}...</td>
                <td>John Doe</td>
                <td>50$</td>
                <td>paid</td>
                <td>preparing</td>
                <td>
                  <button>Next stage</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default Index;
