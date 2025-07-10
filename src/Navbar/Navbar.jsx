import React, { useContext, useState } from "react";
import logo from "../assets/assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  let { numOfCartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);

  let { counter } = useContext(CounterContext);

  function logout() {
    localStorage.removeItem("userToken");

    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-300 py-4 fixed top-0 left-0 right-0 z-50">
        <div className="container flex flex-col md:flex-row justify-between items-center m-auto max-w-7xl">
          <div className="flex justify-between items-center w-full md:w-auto">
            {numOfCartItems > 0 && (
              <span className="absolute  start-1 top-1 md:hidden bg-green-100 text-green-800 text-[12px] font-medium px-1 w-4 h-5 text-center rounded-full dark:bg-green-900 dark:text-green-300">
                {numOfCartItems}
              </span>
            )}
            <img className="mx-2" width={130} src={logo} alt="logo" />

            <button
              className="md:hidden cursor-pointer text-2xl mx-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars"></i>{" "}
            </button>
          </div>

          <div
            className={`w-full md:flex md:flex-row justify-between items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="py-2 md:flex md:flex-row flex-col items-start md:items-center">
              {userLogin !== null && (
                <>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="brands">Brands</NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="products">Products</NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="wishlist">WishList</NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800 relative">
                    <NavLink to="cart" >
                      Cart
                      {numOfCartItems > 0 && (
                        <span className="absolute  md:-top-2 md:-end-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                          {numOfCartItems}
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="categories">Categories</NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className="md:flex md:flex-row flex-col items-start md:items-center">
              {userLogin == null ? (
                <>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="register">Register</NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="login">Login</NavLink>
                  </li>
                </>
              ) : (
                <li
                  onClick={logout}
                  className="mx-2 py-2 text-xl text-slate-800 cursor-pointer"
                >
                  Logout
                </li>
              )}
              <li className=" py-2 text-xl">
                <i className="mx-2 fa-brands fa-facebook-f"></i>
                <i className="mx-2 fa-brands fa-tiktok"></i>
                <i className="mx-2 fa-brands fa-youtube"></i>
                <i className="mx-2 fa-brands fa-linkedin"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
