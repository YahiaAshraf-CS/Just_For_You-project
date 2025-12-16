import React from 'react'
import ButtonPink from '../components/buttons/ButtonPink'
import NavbarUser from '../layout/NavbarUser'

function ProductPage() {
 
  
  return (
    <div>
      <NavbarUser/>
      <h2 className='text-9xl text-center text-pink-600 m-auto mt-20'>ProductPage</h2>
      <ButtonPink to="/">Back to Home</ButtonPink>
          
    </div>
  )
}

export default ProductPage
