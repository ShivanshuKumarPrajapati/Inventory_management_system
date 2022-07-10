import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


import { isAuthenticated } from "./auth/helper";

const Base = ({children}) => {

  return (
    <div className="w-screen border-2  h-screen border-black parent">
      <div className="header bg-red">
        <h1
          className={`logo w-1/3 text-center ${
            isAuthenticated() ? "logosize" : ""
          }`}
        >
          Inventory <br />
          management <br />
          system
        </h1>
        {isAuthenticated() && (
          <ul className="w-2/3 flex flex-wrap nav">
            <li className="flex-1 flex items-center justify-center active">
              <Link to="/home/product"> Product</Link>
            </li>
            <li className="flex-1 flex items-center justify-center text-center ">
              Add Product
            </li>
            <li className="flex-1 flex items-center justify-center text-center">
              Category
            </li>
            <li className="flex-1 flex items-center justify-center text-center">
              Add Category
            </li>
            <li className="flex-1 flex items-center justify-center">nav</li>
          </ul>
        )}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Base;
