import React from 'react'

import { API } from "../../backend";

const Image = ({ product }) => {
   const imageUrl = product
     ? `${API}/photo/product/${product._id}`
     : `https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`;
    
   return (
       <div>
       <img src={imageUrl} alt="img" className="cardImg" />
     </div>
   );
}

export default Image