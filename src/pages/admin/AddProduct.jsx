import React from 'react'
import { NavLink } from 'react-router-dom';

function AddProduct() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-50 text-pink-600">Add Product</h1>
      <NavLink to="/admin">back to admin</NavLink>
      
    </div>
  )
}

export default AddProduct
