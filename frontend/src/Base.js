import React from "react";
import "./style.css";
import { Link,useLocation } from "react-router-dom";


import { isAuthenticated } from "./auth/helper";



const Base = ({ children }) => {

  const location = useLocation();
  
  const currentTab = (path) => {
  
    if (location.pathname === path) {
      return { color: "#2ecc72", backgroundColor:"#4b4848"  };
    } else {
      return { color: "#FFFFFF" };
    }
  };

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
            <li className="flex-1 ">
              <Link
                to="/home/product"
                style={currentTab("/home/product")}
                className="inline-block h-full w-full flex items-center justify-center"
              >
                Product
              </Link>
            </li>
            <li className="flex-1 ">
              <Link
                to="/home/product/add"
                style={currentTab("/home/product/add")}
                className="inline-block h-full w-full flex items-center justify-center text-center"
              >
                {" "}
                Add Product
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to="/home/category"
                style={currentTab("/home/category")}
                className="inline-block h-full w-full flex items-center justify-center"
              >
                Category
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to="/home/category/add"
                style={currentTab("/home/category/add")}
                className="inline-block h-full w-full flex items-center justify-center text-center"
              >
                Add Category
              </Link>
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
