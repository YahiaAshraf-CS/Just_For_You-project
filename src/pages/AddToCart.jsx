import NavbarUser from "../layout/NavbarUser";
import Footer from "../layout/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const AddToCart = () => {
    const api = "http://127.0.0.1:5000/api/shop";
    const [cartlist, setCartlist] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const user_id = currentUser.id;
    useEffect(() => {
        get_cart();
    }, []);
    const get_cart = async () => {
        const response = await fetch(`${api}/cart/${user_id}`);
        const data = await response.json();
        setCartlist(data);
    };

    const remove_from_cart = async (cart_id) => {
        const response = await fetch(`${api}/cart/${cart_id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            get_cart();
        }
    };

    // حساب الإجمالي
    const total = cartlist.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <NavbarUser />
            <div className="container mx-auto p-6 max-w-4xl min-h-screen">
                <h1 className="text-3xl font-bold text-pink-600 flex justify-center gap-2 mb-8">
                    <FaShoppingCart /> Your Cart
                </h1>

                {cartlist.length === 0 ? (
                    <div className="text-center p-10 bg-white border rounded shadow-sm">
                        <p className="text-gray-400">your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {cartlist.map((item) => (
                            <div key={item.id} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between border border-pink-100">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        {item.name ? <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3> : <h3 className="font-bold text-gray-800 text-lg">no name</h3>}
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                        <p className="text-pink-600 font-bold">${item.price} SAR</p>

                                        <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={() => remove_from_cart(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    <p className="font-bold text-gray-800 text-lg">Total: ${total}</p>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default AddToCart;
