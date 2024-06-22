import styles from "./Register.module.css";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  //post
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
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
      <h1>Регистрация</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
        className={styles.formReg}
      >
        <input
          type="text"
          placeholder="first_name"
          name="first_name"
          value={data.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="last_name"
          name="last_name"
          value={data.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="phone"
          name="phone"
          value={data.phone}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
