import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
// we import redux
import { useSelector } from "react-redux";
import Link from "next/link";

function Navbar() {
  // we use the useSelector hook to bring in the Redux state
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>HomePage</li>
          </Link>

          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          {/* my image below isnt working */}
          <Image src="/img.logo.png" alt="" width="160" height="69" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      {/* I can make the range of the div I click on smaller */}
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            {/* we read from the above variable */}
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
