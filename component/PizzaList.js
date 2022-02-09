import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzaList }) {
  // dont forgot to destructure what you want
  // as the above prop
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
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
          // the id in the key, comes from the id that gets created
          // each time in the database (MONGO DB) once we create
          // (INSERT eg. MySQL) pizza entries
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
