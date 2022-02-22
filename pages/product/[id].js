import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import axios from "axios";

function Product({ pizza }) {
  // we set the size to 0 initially, the first amount (0 index)
  // in the price array below
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  // the very first price in the pizza array, a small size pizza
  const [extras, setExtras] = useState([]);
  // we create an empty array to store the extras a pizza has
  const [quantity, setQuantity] = useState(1);
  // how many pizza we want, the default value is 1

  // we originally hardcoded the below, but now that we have
  // pizza passed in using getServerSideProps, we dont need it
  // const pizza = {
  //   id: 1,
  //   img: "/img/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };

  const changePrice = (number) => {
    setPrice(price + number);
    // the price of what we chose plus the difference
    // passed in as a value
  };

  const handleSize = (sizeIndex) => {
    // what we click on - the actual size
    // we have the prices of the pizzas, then depending on
    // what we clcik on, we subtract that from prices of the
    // pizza based on the size. for example the pizza should
    // start at the small size lets say 12$. Then, when we
    // pick a size lets say medium, the price would now be
    // 13$. If we subtract 13 - 12 we get 1. That is the
    // difference variable.
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex); // now we make what we chose the size
    changePrice(difference); //we call the function changePrice
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    // we store a variable checked, which is when we click
    // on one of the checkboxes. We use this same variable
    // below to adjust the price base on what is checked

    if (checked) {
      changePrice(option.price);
      // we now pass in the value of the additional option
      // then call the function which will take the pizza
      // price then add it with the additional option
      setExtras((prev) => [...prev, option]);
      // we add these values to the array in the useState hook
    } else {
      changePrice(-option.price);
      // we now do the opposite, we subtract the value of the
      // additional price from the pizza price
      setExtras(extras.filter((extra) => extra._id !== option._id));
      // we subtract these values from the array in the useState hook
    }
  };

  console.log(extras);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            {/* used to be setsize before, then read from 
            the above data object, pizza */}
            {/* <div className={styles.size} onClick={() => setSize(0)}></div> */}
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}

          {/* we dont need the below hardcoded anymore */}
          {/* <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cheese"
              name="cheese"
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="spicy"
              name="spicy"
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div> */}
          {/* <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="garlic"
              name="garlic"
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div> */}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

// we now want to fetch a single product - we therefore use
// the products id *** dont forget to destructure the params
export const getServerSideProps = async ({ params }) => {
  // we grab the parameter of the product, which in this case, is the id
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
      // we do the same thing here we did on the homepage,
      // we store what we get back from the API request
      // in the props. Then we send it to the top and pass
      // it into the function, as a prop. This is a single
      // pizza, which means we dont have to hardcode the
      // pizza data like before
    },
  };
};

export default Product;
