import React from "react";
import { Navigate } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoutes = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate  to="/" />;
  }
};

export default PrivateRoutes;
