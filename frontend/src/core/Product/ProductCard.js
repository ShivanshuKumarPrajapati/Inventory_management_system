import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'

import { FaEdit, FaTrash } from "react-icons/fa";

import Image from './Image';
import { isAuthenticated } from '../../auth/helper/index';
import { getAllProducts, deleteProduct } from "./../helper/producthelper";

const ProductCard = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const deleteProductFxn = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadAllProducts();
      }
    });
  };

  const loadAllProducts = () => {
    getAllProducts(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

   useEffect(() => {
     loadAllProducts();
   }, []);
  
   
  const showProduct = () => {
    return (
      products.map((product, index) => {
        return (
          <div key={index} className="Card m-7">
            <Image product={product} />
            <div className="flex mt-3 justify-end">
              <Link to={`/product/update/${product._id}`} className="mr-3 ">
                <FaEdit />
              </Link>
              <FaTrash
                className="mr-2"
                onClick={() => {
                  deleteProductFxn(product._id);
                }}
              />
            </div>
            <p className="mt-0">Rs {product.price}</p>
            <h2 className="mt-1 font-extrabold text-xl">{product.name}</h2>
            <p className="mt-2 text-left ml-1">Item Sold: {product.sold}</p>
            <p className="mt-2 text-left ml-1 ">Stock Left: {product.stock}</p>
            <p className="border-solid border-t-2 border-black mt-2"></p>
            <p
              className="pt-1 mb-1 text-right
      mr-1"
            >
              Category:{" "}
              <span className="font-italic">{product.category.name}</span>
            </p>
          </div>
        );
      })
    )
  }
  
  return (
      products.length > 0 ? (     
        <div className="w-screen cardParent">
        {showProduct()}
        </div>
      )
          :
        (
          <div className='empty'>
            <h1 className='font-extrabold'>No product FOUND</h1>
            <p>Add product to view</p>
          </div>
      )
  );
}

export default ProductCard;