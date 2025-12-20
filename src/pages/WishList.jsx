import React, { useEffect, useState } from 'react';
import NavbarUser from '../layout/NavbarUser';
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const api = "http://127.0.0.1:5000/api/shop/wishlist"; 
    const user_id = 1;

    useEffect(() => {
        get_wishlist();
    }, []);

    const get_wishlist = async () => {
        const response = await fetch(`${api}/wishlist/${user_id}`);
        const data = await response.json();
        setWishlistItems(data);
    };

    const remove_from_wishlist = async (wishlist_id) => {
        const response = await fetch(`${api}/wishlist/${wishlist_id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            get_wishlist(); 
        }
    };

    const add_to_cart = async (product_id, wishlist_id) => {
        const response = await fetch(`http://127.0.0.1:5000/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, product_id, quantity: 1 })
        });

        if (response.ok) {
            remove_from_wishlist(wishlist_id);
            alert("item moved to your cart");
        }
    };

    return (
        <>
            <NavbarUser />
            <div className="container mx-auto p-6 max-w-4xl min-h-screen">
                <h1 className="text-3xl font-bold text-pink-600 flex justify-center gap-2 mb-8">
                    <FaHeart /> my wishlist
                </h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center p-10 bg-pink-100 border rounded shadow-sm">
                        <p className="text-gray-400">your wishlist is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {wishlistItems.map((item) => (
                            <div key={item.wishlist_id} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between border border-pink-100">
                                <div className="flex items-center gap-4">
                                   
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">{item.category}</p>
                                        <p className="text-pink-600 font-bold">${item.price}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => add_to_cart(item.product_id, item.wishlist_id)}
                                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 flex items-center gap-2 transition-colors"
                                    >
                                        <FaShoppingCart size={14}/> Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => remove_from_wishlist(item.wishlist_id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Wishlist;

