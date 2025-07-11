// import { useState } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Gategories/Gategories";

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

const Cart = lazy(() => import("./components/Cart/Cart"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Cart/Cart"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const WishListContextProvider = lazy(() => import("./Context/WishListContext"));

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
              <Online>
                <h2 className="bg-green-400 py-3 rounded-md absolute fixed bottom-0 start-2">
                  Conected
                </h2>
              </Online>
              <Offline>
                <h2 className="bg-red-400 py-3 rounded-md absolute fixed bottom-0 start-2">
                  DisConected
                </h2>
              </Offline>
            </CounterContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
