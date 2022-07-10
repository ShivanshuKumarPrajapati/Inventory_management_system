import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from './user/AuthPage';
import PrivateRoutes from './auth/helper/PrivateRoute';
import Product from './core/Product/Product';
import AddCategory from './core/Category/AddCategory';

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
          <Route
            exact
            path="/home/category/add"
            element={
              <PrivateRoutes>
                <AddCategory />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    );
};

export default RouteFxn;