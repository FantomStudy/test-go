import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
import Register from "./pages/Register/Register";

export default function App() {
  //get
  // const [postData, setPostData] = useState(null);

  // useEffect(() => {
  //   const FetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:34135/api/allpost/1"
  //       );
  //       setPostData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   FetchData();
  // }, []);

  {
    /* <h1>
        {postData.Title} {postData.id}
      </h1>
      <p>{postData.Desc}</p>
      <p>{postData.UserID}</p>
      <img src={postData.Image} alt="" /> */
  }
  return (
    <>
      <Register />
    </>
  );
}