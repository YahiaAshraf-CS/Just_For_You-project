import React, { useEffect, useState } from 'react';
import NavbarUser from '../layout/NavbarUser';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function AddToCart() {
    const [cartItems, setCartItems] = useState([]);

    const api = "http://127.0.0.1:5000";
    const user_id = 1; 

    useEffect(() => {
        view_cart();
    }, []);

    const view_cart = async () => {
        const response = await fetch(`${api}/cart/${user_id}`);
        const data = await response.json();
        setCartItems(data);
    };

    const add_to_cart = async (product_id, quantity) => {
        const response = await fetch(`${api}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: user_id, 
                product_id: product_id, 
                quantity: quantity 
            })
        });

        if (response.ok) {
            view_cart();
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    const remove_from_cart = async (cart_id) => {
        const response = await fetch(`${api}/cart/${cart_id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            setCartItems(cartItems.filter(item => item.id !== cart_id));
        }
    };

    const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    return (
        <>
            <NavbarUser />
            <div className="container mx-auto p-6 max-w-4xl min-h-screen">
                <h1 className="text-4xl font-bold text-pink-600 flex items-center justify-center gap-3 mb-8">
                    <FaShoppingCart /> your cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-10 border rounded-lg bg-white shadow-sm">
                        <p className="text-xl text-gray-500">your cart is empty</p>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-pink-100 text-pink-700">
                                <tr>
                                    <th className="p-4 text-left">product</th>
                                    <th className="p-4 text-center">price</th>
                                    <th className="p-4 text-center">qty</th>
                                    <th className="p-4 text-center">total</th>
                                    <th className="p-4 text-center">action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-semibold text-gray-700">{item.product_name}</td>
                                        <td className="p-4 text-center text-gray-600">${item.price}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button 
                                                    onClick={() => add_to_cart(item.product_id, -1)} 
                                                    className="p-1 rounded bg-gray-200 hover:bg-pink-200"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button 
                                                    onClick={() => add_to_cart(item.product_id, 1)} 
                                                    className="p-1 rounded bg-gray-200 hover:bg-pink-200"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center font-bold text-pink-600">${item.total}</td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => remove_from_cart(item.id)} 
                                                className="text-red-400 hover:text-red-600"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-6 bg-gray-50 flex justify-end border-t">
                            <h2 className="text-2xl font-bold text-gray-800">
                                total: <span className="text-pink-600">${grandTotal}</span>
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddToCart;
