import { RouterProvider, Outlet, createBrowserRouter } from "react-router";

import "./App.css";

import HomePage from "./pages/HomePage";
import { TbError404 } from "react-icons/tb";
import LoginPage from "./pages/auth/LoginPage";
import SignPage from "./pages/auth/SignPage";
import ButtonPink from "./components/buttons/ButtonPink";
import ProductPage from "./pages/ProductPage";
import WishList from "./pages/WishList";
import AddToCart from "./pages/AddToCart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import RemoveProduct from "./pages/admin/RemoveProduct";
import ViewUsers from "./pages/admin/ViewUsers";

function App() {
    const router = createBrowserRouter([
        { path: "/", element: <HomePage /> },
        { path: "/auth", element: <LoginPage /> },
        { path: "/sign", element: <SignPage /> },
        { path: "/product", element: <ProductPage /> },
        { path: "/wish", element: <WishList /> },
        { path: "/cart", element: <AddToCart /> },
        {
            path: "/admin",
            element: <AdminDashboard />,
            children: [
                {
                    path: "add_product",
                    element: <AddProduct />,
                },
                {
                    path: "remove_product",
                    element: <RemoveProduct />,
                },
                {
                    path: "view_users",
                    element: <ViewUsers />,
                },
                {
                    path: "*",
                    element: (
                        <div className="flex flex-col items-center gap-2 justify-center h-fit ">
                            <TbError404 className="text-9xl text-center text-pink-600 m-auto mt-20" />
                            <h1 className="text-pink-500 font-bold text-5xl text-center"> Sorry Admin is Page not found</h1>
                            <ButtonPink to="/">Back to Home</ButtonPink>
                        </div>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: (
                <div className="flex flex-col items-center gap-2 justify-center h-fit ">
                    <TbError404 className="text-9xl text-center text-pink-600 m-auto mt-20" />
                    <h1 className="text-pink-500 font-bold text-5xl text-center">Page not found</h1>
                    <ButtonPink to="/">Back to Home</ButtonPink>
                </div>
            ),
        },
    ]);
    // http:
    return (
        <>
            <RouterProvider router={router} />
            <Outlet />
        </>
    );
}

export default App;
