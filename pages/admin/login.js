import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";

function Login() {
  // basic data gathering from form
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  // error handling
  const [error, setError] = useState(false);
  // after logging in we will move to the admin page
  const router = useRouter();

  const handleClick = async () => {
    try {
      // try to post something, expecting a username and password
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      // will direct us to the admin page if successful
      router.push("/admin");
    } catch (err) {
      // I am stuck here
      console.log(err.response);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {/* if we have an error, which is a boolean set to 
        true in the error block of the handleClick function, 
        then display this message */}
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
}

export default Login;
