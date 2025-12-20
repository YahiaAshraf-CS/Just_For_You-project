import React from 'react'
import { NavLink } from 'react-router';

function RemoveProduct() {
  return (
      <div>
          <h1 className="text-4xl text-center mt-50 text-pink-600">Remove Product</h1>
          <NavLink to="/admin">back to addmin</NavLink>
    </div>
  )
}

export default RemoveProduct
