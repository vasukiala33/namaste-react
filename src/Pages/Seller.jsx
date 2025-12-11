import React from "react";
import { PROFILE_ICON } from "../utils/constants";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";

const Seller = () => {
  return (
    <div className="bg-gray-300 w-screen h-screen flex-col flex">
      {/* Header */}
      <div className="flex justify-between items-center pt-10 px-5">
        <h1 className="font-semibold text-xl">Home</h1>
        <img src={PROFILE_ICON} alt="profile_icon" className="w-12 h-12" />
      </div>

      {/* Buttons placed side by side */}
      <div className="flex justify-center gap-10 pt-10 w-full">
        <CreateCategory />
        <CreateProduct />
      </div>
    </div>
  );
};

export default Seller;
