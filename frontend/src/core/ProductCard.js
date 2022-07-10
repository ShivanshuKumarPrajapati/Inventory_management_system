import React from 'react';
import './ProductCard.css'

import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="w-screen cardParent">
      <div className="Card m-3">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-VrB_W6Oj3-8%2FUvaVxSykQaI%2FAAAAAAAAAR4%2FUuEmfGK-Z-s%2Fs1600%2FKatrina%252bKaif%252bLatest%252bPictures%252b2014%252bbollywoodchoose3.JPG&f=1&nofb=1"
          alt="img"
          className="cardImg"
        />
        <div className="flex mt-3 justify-end">
          <FaEdit className="mr-3 " />
          <FaTrash className="mr-2" />
        </div>
        <p className="mt-0">price</p>
        <h2 className="mt-1 font-extrabold text-xl">name</h2>
        <p className="mt-2 text-left ml-1">Sold</p>
        <p className="mt-2 text-left ml-1 ">Stock</p>
        <p className="border-solid border-t-2 border-black mt-2"></p>
        <p
          className="pt-1 mb-1 text-right
      mr-1"
        >
          Category
        </p>
      </div>
    </div>
  );
}

export default ProductCard;