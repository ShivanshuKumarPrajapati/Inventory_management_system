import React from 'react'
import { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import "./AddProduct.css";

import Base from "../../Base";
import { isAuthenticated } from "../../auth/helper";
import { getCategories } from "./../helper/categoryhelper";
import { getProduct, updateProduct } from "../helper/producthelper";


const UpdateProduct = () => {

  const { user, token } = isAuthenticated();
  const { productId } = useParams();
  const navigate = useNavigate();
  
    const [values, setValues] = useState({
      name: "",
      price: "",
      stock: "",
      sold: "",
      photo: "",
      categories: [],
      category: "",
      loading: false,
      error: "",
      success: false,
      formData: "",
    });

    const {
      name,
      price,
      stock,
      sold,
      photo,
      categories,
      category,
      loading,
      error,
      success,
      createdProduct,
      formData,
    } = values;

    const preloadCategories = () => {
      getCategories(user._id, token).then((data) => {
        if (data.error) {
          setValues({ ...values, error: `${data.error}` });
        } else {
          setValues({
            categories: data,
            formData: new FormData(),
          });
        }
      });
    };

  const preloadProduct = (productId) => {
    getProduct(productId, user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: `${data.error}` });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          price: data.price,
          sold:data.sold,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  }

    useEffect(() => {
      preloadProduct(productId);
    }, []);

    const handleChange = (name) => (event) => {
      const value =
        name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

    const onSubmit = (e) => {
       e.preventDefault();
       setValues({ ...values, error: "", loading: true });

       updateProduct(productId, user._id, token, formData).then((data) => {
         if (data.error) {
           setValues({ ...values, error: `${data.error}` });
         } else {
           setValues({
             ...values,
             name: "",
             price: "",
             sold:'',
             photo: "",
             stock: "",
             loading: false,
             success:true
           });
           setTimeout(() => {
             setValues({ success: false });
             navigate('/home/product')
           }, 2000);
         }
       });
    };

    const successMessage = () => {
      return (
        <div className="flex justify-center">
          <div className="w-50">
            <div
              className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-0 mt-1"
              role="alert"
              style={{ display: values.success ? "" : "none" }}
            >
              New product added successfully
            </div>
          </div>
        </div>
      );
    };

    const errorMessage = () => {
      return (
        <div className="flex justify-center">
          <div className="w-50">
            <div
              className={`bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-0 mt-2 `}
              role="alert"
              style={{ display: values.error ? "block" : "none" }}
            >
              {values.error}
            </div>
          </div>
        </div>
      );
    };

    const updateProductForm = () => {
      return (
        <div className="ProductParent">
          <div className="w-full ">
            <h1 className="Producttext py-2 w-full text-center ">
              Add new Product
            </h1>
          </div>
          {successMessage()}
          {errorMessage()}
          <form className="ProductForm">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={handleChange("name")}
              required
              className="ProductInput w-full"
            />
            <input
              type="number"
              name="price"
              value={price}
              placeholder="Enter price"
              onChange={handleChange("price")}
              required
              className="ProductInput w-full bg-white"
            />
            <select
              name="category"
              onChange={handleChange("category")}
              required
              placeholder="Select product category"
              className="ProductInput w-full"
            >
              <option>Select</option>
              {categories &&
                categories.map((ctgry, index) => {
                  return (
                    <option key={index} value={ctgry._id}>
                      {ctgry.name}
                    </option>
                  );
                })}
            </select>
            <input
              type="number"
              name="stock"
              value={stock}
              placeholder="Enter stock"
              onChange={handleChange("stock")}
              required
              className="ProductInput w-full"
            />
            <input
              type="number"
              name="sold"
              value={sold}
              placeholder="Stock sold"
              onChange={handleChange("sold")}
              required
              className="ProductInput w-full"
            />
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a product img"
              className="ProductInput w-full btn-success"
            />
            <button type="submit" className="ProductBtn" onClick={onSubmit}>
              Update Product
            </button>
          </form>
        </div>
      );
    };


  return <Base>{updateProductForm()}</Base>;
}

export default UpdateProduct