import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Footer from "../layout/Footer";
import ButtonPink from "../components/buttons/ButtonPink";
import NavbarUser from "../layout/NavbarUser";

// import { useCart } from "../context/useCart"; // استدعاء الهوك
// import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // const [iswish, setIsWish] = useState(false);
    // const navigate = useNavigate();

    //i want to fetch products from the backend api and display them here  http://127.0.0.1:5000/api/shop/products
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/shop/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const filterCategory = (cat) => {
        if (cat === "all") {
            setFilteredProducts(products);
        } else {
            const result = products.filter((item) => item.category === cat);
            setFilteredProducts(result);
        }
    };
    const handleAddToWishlist = async (product) => {
        const response = await fetch("http://127.0.0.1:5000/api/shop/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                product_id: product.id,
            }),
        });

        const data = await response.json();
        if (data.status === "error") {
            alert(data.message);
            // setIsWish(false);
            return;
        }
        if (data.message === "Product already in wishlist") {
            alert("Product already in wishlist");
            return;
        }

        alert("Added to wishlist");
    };

    const handleAddTocartlist = async (product) => {
        const response = await fetch("http://127.0.0.1:5000/api/shop/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                product_id: product.id,
                quantity: 1,
            }),
        });
        const data = await response.json();
        if (data.status === "error") {
            alert(data.message);
            // setIsWish(false);
            return;
        }

        alert("Added to cart");
    };

    return (
        <div>
            <NavbarUser />
            {currentUser.is_admin === true && (
                <div className="text-center mt-4">
                    <h1 className=" text-2xl text-pink-600 font-bold">Welcome Admin {currentUser.firstName}</h1>
                </div>
            )}
            <h2 className=" text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl text-center text-pink-600 m-auto mt-20">ProductPage</h2>
            {/* <ButtonPink to="/">Back to Home</ButtonPink> */}
            <br />
            <br />

            {/* Mobile dropdown */}
            <nav className="flex justify-center items-center mb-8 px-4">
                <div className="flex gap-5 items-center justify-center flex-wrap">
                    {["perfume", "makeup", "accessories", "toys"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => filterCategory(cat)}
                            className="bg-pink-400 px-4 py-1 rounded-lg shadow-md text-white shadow-pink-300 hover:shadow-pink-600 hover:shadow-xl transition-all cursor-pointer duration-300 ease-in-out hover:bg-pink-600">
                            {cat}
                        </button>
                    ))}
                    <button
                        onClick={() => filterCategory("all")}
                        className="bg-pink-400 text-white px-4 py-1 rounded-lg shadow-md shadow-pink-300 hover:shadow-pink-500 hover:shadow-xl transition-all cursor-pointer duration-300 ease-in-out hover:bg-pink-600">
                        All Categories
                    </button>
                </div>
            </nav>

            <br />
            <br />
            <div className="min-h-screen bg-white px-6 py-10">
                {products ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-pink-100 rounded-2xl p-4 shadow-pink-500 shadow-md hover:shadow-xl  transition transform hover:-translate-y-1">
                                <img src={product.image} alt={product.name} className="w-full h-90 object-cover rounded-xl mb-4" />

                                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                                <h4 className="text-lg text-gray-600">{product.description}</h4>
                                <p className="text-pink-600 font-bold text-lg">{product.price} SAR</p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleAddTocartlist(product)}
                                        className="flex-1 bg-pink-500 cursor-pointer text-white py-2 rounded-lg font-bold hover:bg-pink-600 transition flex justify-center items-center gap-2">
                                        <FaShoppingCart /> Add to cart
                                    </button>
                                    <button onClick={() => handleAddToWishlist(product)} className="p-3 bg-white text-pink-400 rounded-lg border border-pink-200 hover:bg-pink-100 transition">
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl text-pink-600 font-bold">No products available.</h2>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ProductPage;
