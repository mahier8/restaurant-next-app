import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

function Featured() {
  // we first set an index to 0, meaning the starting position
  // of the images will 0
  const [index, setIndex] = useState(0);

  // an array of all the images to loop through
  const images = ["/img/pizza.png", "/img/pizza2.png", "/img/pizza3.png"];

  // in the onclick functions below we set the arguments to "l" and "r"
  const handleArrow = (direction) => {
    // direction is the argument
    if (direction === "l") {
      // if we press the arrow image and it is equal to "l", then if the
      // index is not 0, set the index to -1, otherwise set it to 2 this
      // causes the image to bounce from 0 to 2 in its starting position
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      // similarly, if we press the arrow image and it is equal to "r", then
      // if the index is not 2, set the index to +1, otherwise set it to 0
      // this causes the image to bounce from 2 to 0 in its starting position
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        // we pass in "l" as a parameter
        onClick={() => handleArrow("l")}
      >
        {/* if you click the arrow image, then the function will be triggered */}
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
        // when we click on the arrow image, it will move alongside the x axis to the left
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        // we pass in "l" as a parameter
        onClick={() => handleArrow("l")}
      >
        {/* if you click the arrow image, then the function will be triggered */}
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain" />
      </div>
    </div>
  );
}

export default Featured;
