import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

function PizzaList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best pizza in town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        perferendis quod voluptatibus necessitatibus totam reiciendis
        exercitationem alias et dolorum consectetur quos aliquid minus deleniti,
        officia aut error sunt tenetur cum!
      </p>
      <div className={styles.wrapper}>
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
      </div>
    </div>
  );
}

export default PizzaList;
