import React, { useContext } from "react";
import logo from "../assets/assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  let { numOfCartItems } = useContext(CartContext);
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
      <nav className="bg-slate-300 py-4 fixed top-0 left-0 right-0 z-100">
        <div className="container  flex flex-col justify-between md:flex md:flex-row  m-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <img className="mx-2" width={130} src={logo} alt="" />
            <ul className="py-2 md:flex md:flex-row">
              {/* handle navbar */}
              {userLogin !== null ? (
                <>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="/" className="relative active">
                      Home
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800  ">
                    <NavLink to="brands" className="relative active">
                      Brands
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="products" className="relative active">
                      Products
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="wishlist" className="relative active">
                      WishList
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="cart" className="relative active">
                      Cart
                      <span className="absolute -top-4 -end-5 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                        {numOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="categories" className="relative active">
                      Categories
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <ul className="md:flex md:flex-row">
              {/* handle navbar */}
              {userLogin == null ? (
                <>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="register" className="relative active">
                      Register
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2 text-xl text-slate-800">
                    <NavLink to="login" className="relative active">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={logout}
                    className="mx-2 py-2 text-xl text-slate-800"
                  >
                    <span className="relative cursor-pointer active">
                      Logout
                    </span>
                  </li>
                </>
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
