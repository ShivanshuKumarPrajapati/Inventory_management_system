import React from 'react'
import { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import "./AddCategory.css";

import Base from "../../Base";
import { isAuthenticated } from '../../auth/helper';
import { updateCategory, getCategory } from '../helper/categoryhelper';


const UpdateCategory = () => {

    const [values, setValues] = useState({
      name: "",
      description: "",
      error: "",
      success: false,
    });
  
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user, token } = isAuthenticated();

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setValues({ ...values, [name]: value });
    };

    const onSubmit = (e) => {
       e.preventDefault();

      setValues({ ...values, error: "", success: false });
      
       const { name, description } = values;

       updateCategory(categoryId, user._id, token, { name, description }).then(
         (data) => {
           if (data.error) {
              setValues({ ...values, error: `${data.error}` });

              setTimeout(() => {
                setValues({...values, error: ""});
              }, 3000);
           }
           else {
             setValues({
               name: "",
               description: "",
               success: true,
             });

             setTimeout(() => {
               setValues({ success: false });
               navigate('/home/category')
             }, 2000);
           }
         }
       );
    };
  
   const preloadCategory = (categoryId,userId,token) => {
     getCategory(categoryId, userId, token).then((data) => {
       if (data.error) {
         console.log(data.error);
       } else {
         setValues({
           name: data.name,
           description:data.description
         })
       }
     });
   };
  
    useEffect(() => {
      preloadCategory(categoryId,user._id,token);
    }, []);


    const successMessage = () => {
      return (
        <div className="flex justify-center ">
          <div className="w-50">
            <div
              className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-0 mt-1"
              role="alert"
              style={{ display: values.success ? "" : "none" }}
            >
              Category updated successfully
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
              className={`bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-0 mt-1 `}
              role="alert"
              style={{ display: values.error ? "block" : "none" }}
            >
              {values.error}
            </div>
          </div>
        </div>
      );
    };

    const updateCategoryForm = () => {
      return (
        <div className="CategoryParent">
          <div className="w-full ">
            <h1 className="Categorytext py-2 w-full text-center ">
            Update Category
            </h1>
          </div>
          {successMessage()}
          {errorMessage()}
          <form className="CategoryForm">
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Enter name"
              onChange={handleChange}
              required
              className="CategoryInput w-full"
            />
            <textarea
              name="description"
              value={values.description}
              placeholder="Enter description"
              onChange={handleChange}
              required
              className="CategoryInput w-full"
              rows={4}
            />
            <button type="submit" className="CategoryBtn" onClick={onSubmit}>
              Update category
            </button>
          </form>
        </div>
      );
    };

  return (
      <Base>
      {updateCategoryForm()}
      </Base>
  )
}

export default UpdateCategory