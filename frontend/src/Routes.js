import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from './user/AuthPage';
import PrivateRoutes from './auth/helper/PrivateRoute';
import CheckRoute from './auth/helper/CheckRoute';
import Product from './core/Product/Product';
import AddCategory from './core/Category/AddCategory';
import Category from "./core/Category/Category"
import UpdateCategory from './core/Category/UpdateCategory';

const RouteFxn = () => {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <CheckRoute>
                <AuthPage />
              </CheckRoute>
            }
          />
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
          <Route
            exact
            path="/home/category"
            element={
              <PrivateRoutes>
                <Category />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/category/update/:categoryId"
            element={
              <PrivateRoutes>
                <UpdateCategory />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    );
};

export default RouteFxn;