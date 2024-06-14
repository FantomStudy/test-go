import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  //get
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:34135/api/allpost/1"
        );
        setPostData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    FetchData();
  }, []);
  console.log(postData);
  //post
  // const [data, setData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  // });
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:34135/api/register",
  //       data
  //     );
  //     console.log("Success", response.data);
  //   } catch (error) {
  //     console.error("fatal", error);
  //   }
  // };
  return (
    <>
      {/* <h1>
        {postData.Title} {postData.id}
      </h1>
      <p>{postData.Desc}</p>
      <p>{postData.UserID}</p>
      <img src={postData.Image} alt="" /> */}
      {/* <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          name="first_name"
          value={data.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          value={data.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
}

export default App;
