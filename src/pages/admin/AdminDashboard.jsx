import React from 'react'
import ButtonPink from '../../components/buttons/ButtonPink'
import { useState, useEffect } from "react";
import NavbarUser from '../../layout/NavbarUser';
import { NavLink } from 'react-router';
import { Outlet } from 'react-router';
import Footer from '../../layout/Footer';

function AdminDashboard() {
    // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    }, []);
    // http://127.0.0.1:5000/api/admin/api/products
    // http://127.0.0.1:5000/api/shop/products
    
    return (
        <>
            <NavbarUser />
            <h1 className="text-4xl text-center mt-15 text-pink-600">welcome {currentUser && currentUser.firstName}</h1>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10 mb-10">
                <ButtonPink to="add_product">Add Product</ButtonPink>
                <ButtonPink to="remove_product">Remove Product</ButtonPink>
                <ButtonPink to="view_users">View Users</ButtonPink>
                <ButtonPink to="/admin">back to admin</ButtonPink>
            </div>
            <Outlet />
            <br /><br /><br /><br /><br /><br /><br /><br />
            <Footer />
        </>
    );
}

export default AdminDashboard
