import React from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

function Featured() {
  const images = [];
  return (
    <div className={styles.container}>
      <Image src="/img/arrowl.png" alt="" />
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <Image src="" alt="" />
        </div>
        <div className={styles.imgContainer}>
          <Image src="" alt="" />
        </div>
        <div className={styles.imgContainer}>
          <Image src="" alt="" />
        </div>
      </div>
      <Image src="/img/arrowr.pn" alt="" />
    </div>
  );
}

export default Featured;
