import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

import AuthPage from "./user/AuthPage";

const Base = () => {

    const productDropdown = () => {
        return (
            <ul>
                <li>
                    <Link to="">ProductList</Link>
                </li>
                <li>
                    <Link to="">Add Product</Link>
                </li>
            </ul>
        );
}

    const categoryDropdown = () => {
        return (
            <ul>
                <li>
                <Link to="">Category List</Link>
                </li>
                <li>
                <Link to="">Add Category</Link>
                </li>
            </ul>
        )
    }

  return (
    <div className="w-screen border-2  h-screen border-black parent">
      <div className="header bg-red">
        <h1 className="logo w-1/3 text-center logosize">
          Inventory <br />
          management <br />
          system
        </h1>
        <ul className="w-2/3 flex flex-wrap justify-evenly nav">
          <li className="flex-3 text-center ">Product</li>
          <li className="flex-1 text-center">Category</li>
          <li className="flex-1 text-center">nav</li>
        </ul>
      </div>
      <div className="content">
        
        <AuthPage />
      </div>
    </div>
  );
};

export default Base;
