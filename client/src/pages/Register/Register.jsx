import styles from "./Register.module.css";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  //post
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:34135/api/register",
        data
      );
      console.log("Success", response.data);
    } catch (error) {
      console.error("fatal", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.formReg}
        >
          <h1>Регистрация</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {/* <img className={styles.fluid} src="fluid.svg" alt="fluid.svg" /> */}
      </div>
    </>
  );
}
