import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Base from './Base';
import AuthPage from './user/AuthPage';
import PrivateRoutes from './auth/helper/PrivateRoute';
import Product from './core/Product';

const RouteFxn = () => {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthPage />} />
          <Route
            exact
            path="/home/product"
            element={
              <PrivateRoutes>
                <Product />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    );
};

export default RouteFxn;