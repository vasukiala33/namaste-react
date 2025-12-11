import React, { useState } from "react";
import Seller from "./Seller";
import Customer from "./Customer";
import decode from "../utils/jwtDecode";

const Home = () => {
  const role = decode()?.role;

  return (
    <div>
      <h1 className="border h-10 rounded text-center pt-2 bg-gray-800 text-white fixed w-screen">
        Welcome to E-Commerce!
      </h1>
      {role === "seller" && <Seller />}
      {role === "customer" && <Customer />}
    </div>
  );
};

export default Home;
