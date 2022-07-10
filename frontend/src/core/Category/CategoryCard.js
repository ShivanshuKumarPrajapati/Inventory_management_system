import React from 'react'
import './CategoryCard.css'
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";

import { isAuthenticated } from '../../auth/helper';
import { deleteCategory,getCategories } from '../helper/categoryhelper';


const CategoryCard = () => {

  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const delCategory = (categoryId) => {
    console.log(categoryId);
     deleteCategory(categoryId, user._id, token).then((data) => {
       if (data.error) {
         console.log(data.error);
       } else {
         preloadCategories();
       }
     });
   };
  
  const preloadCategories = () => {
    getCategories(user._id,token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preloadCategories();
  }, []);



  return (
    <div className="w-screen categoryCardParent mt-2">
      {
      categories.map((category, index) => {
        return (
          <div key={index} className="categoryCard m-6">
            <div className="categoryname w-full  h-1/3">{category.name}</div>
            <div className="h-2/3">
              <div className="flex mt-3 justify-end">
                <Link to={`/category/update/${category._id}`}>
                  <FaEdit className="mr-3 " />
                </Link>
                <FaTrash
                  className="mr-2 btn-danger"
                  onClick={() => delCategory(category._id)}
                />
              </div>
              <p className="mt-3 text-left ml-1 text-lg leading-3">
                <span className="font-extrabold text-xl">Description : </span>
                {category.description}
              </p>
            </div>
          </div>
        );
      })
    }
    </div>
  );
}

export default CategoryCard