// import { useState } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Gategories/Gategories";
import Login from "./components/login/login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Productdetails from "./components/Productdetails/Productdetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyReset from "./components/VerifyReset/VerifyReset";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";

let route = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectRoute>
              <Brands />
            </ProtectRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectRoute>
              <Productdetails />
            </ProtectRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectRoute>
              <Categories />
            </ProtectRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "products",
          element: (
            <ProtectRoute>
              <Products />
            </ProtectRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectRoute>
              <CheckOut />
            </ProtectRoute>
          ),
        },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "verifyReset",
          element: <VerifyReset />,
        },
        {
          path: "resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectRoute>
              <WishList />
            </ProtectRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ],
  { basename: "/E-commerce" }
);

function App() {
  // let [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={route}></RouterProvider>
              <Toaster />
            </CounterContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
