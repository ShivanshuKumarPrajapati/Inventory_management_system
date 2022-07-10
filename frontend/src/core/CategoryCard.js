import React from 'react'
import './CategoryCard.css'

import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryCard = () => {
  return (
    <div className="w-screen cardParent">
      <div className="Card m-3">
        <div className="categoryname w-full h-1/3">
          <h1>name</h1>
        </div>
        <div className="h-2/3">
        <div className="flex mt-3 justify-end">
          <FaEdit className="mr-3 " />
          <FaTrash className="mr-2" />
        </div>
        <p className="mt-3 text-left ml-1">lsakdjf laskdjf alksdfj alsdklksad jfalkdfja askdjf alskdjf alskdfj adescription</p>
        
        </div>
      </div>
    </div>
  );
}

export default CategoryCard