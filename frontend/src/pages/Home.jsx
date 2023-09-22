import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((store) => store.auth);
  console.log(auth);
  return <div>welcome to home page</div>;
};

export default Home;
