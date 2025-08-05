import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
const Footer = () => {
  const { userLogin } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext);

  if (!userLogin) return null;
  useEffect(() => {}, []);
  return (
    <>
      <footer className="bg-zinc-50 mt-[150px] pb-[30px] text-center text-surface dark:bg-gray-300 dark:text-black">
        <div className="px-6 pt-6">
          <form>
            <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
              <div className="md:mb-6 font-bold text-2xl md:ms-auto">
                <p>
                  <strong>freshCart</strong>
                </p>
              </div>

              <ul className="py-2 -mt-6 md:flex md:flex-row flex-col items-start md:items-center">
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
                      <NavLink to="cart">
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

              <div className="mb-6 md:me-auto">
                <button
                  type="button"
                  className="inline-block text-xl rounded bg-primary px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-black/5 p-4 text-center">
          © 2023 Copyright:
          <a href="https://tw-elements.com/">TW Elements</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
