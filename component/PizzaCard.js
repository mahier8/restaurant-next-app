import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/PizzaCard.module.css";

function PizzaCard({ pizza }) {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        {/* clickable images, should take you to a dynamic
         route, based on the id (pizza you clicked on)*/}
        <Image src={pizza.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      {/* prices is stored in a prices array in the model */}
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
}

export default PizzaCard;
