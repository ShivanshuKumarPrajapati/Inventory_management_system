import React from 'react'
import { Navigate } from "react-router-dom";

import { isAuthenticated } from "./index";

const CheckRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/home/product" />;
  } else {
    return children;
  }
};

export default CheckRoute