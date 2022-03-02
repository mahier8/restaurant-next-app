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
  // a variable to control the status
  const status = ["preparing", "on the way", "delievered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      // we use the delete method and delete from the api using
      // the id as a parameter. this however only changes the db.
      // check above for UI changes
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      // for the UI
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      // we catch an error in case
      console.log(err);
    }
  };

  // when we click on the next stage button
  const handleStatus = async (id) => {
    // we filter though the orders we have making the sure
    // the id matches. We then take the first match we get
    const item = ordersList.filter((order) => order._id === id)[0];
    // we set the status, look at the above variable declared
    const currentStatus = item.status;

    try {
      // to update the db
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        // we add 1 to our current status each time we click
        status: currentStatus + 1,
      });
      // then, for the UI
      setOrdersList([
        res.data, // get back our response data
        // we delete our order in our orderList
        ...ordersList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
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
          {ordersList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                {/* a javascript method to only display the first 5 numbers */}
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {/* we are checking the order method. If its 0 return 
                  the first span otherwise return the second span */}
                  {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                </td>
                {/* we set the status variable above, to the order model
                 status, just like we got data from the order model before */}
                <td>{status[order.status]}</td>
                <td>
                  {/* call the function handleStatus and pass in the order._id as a value */}
                  <button onClick={() => handleStatus(order._id)}>
                    Next stage
                  </button>
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
