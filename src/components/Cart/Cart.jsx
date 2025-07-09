import React, { useEffect, useState, useContext } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let [counter, setcounter] = useState(0);
  let {
    numOfCartItems,
    totalPrice,
    products,
    updateCart,
    deleteCart,
    clearCart,
  } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleUpdate(prodId, count) {
    let response = await updateCart(prodId, count);
    if (response.data.status === "success") {
      toast.success("Product Updated");
    } else {
      toast.error("error....");
    }
  }
  async function handleDelete(prodId) {
    let response = await deleteCart(prodId);

    if (response.data.status === "success") {
      toast.success("Product Deleted");
      navigate("/");
    } else {
      toast.error("error....");
    }
  }

  async function handleClear() {
    let response = await clearCart();
    console.log(response);
    if (response?.data?.message === "success") {
      toast.success("Product cleared");
      navigate("/");
    } else {
      toast.error("error....");
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      {products?.length > 0 ? (
        <div>
          <h2 className="text-xl pb-3 text-green-500">
            Num Of Cart Items : {numOfCartItems}
          </h2>
          <h3 className="text-xl">Total Price : {totalPrice} EGP</h3>

          <button
            onClick={() => {
              handleClear();
            }}
            className="absolute top-30 start-300 bg-green-100  text-sm font-medium me-2 p-3 rounded-full dark:bg-green-900 text-white"
          >
            Clear all Cart
          </button>

          <div className="relative pt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((prod) => {
                  return (
                    <tr
                      key={prod?.product?._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={prod?.product?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {prod?.product?.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              handleUpdate(prod?.product?._id, prod?.count - 1);
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="first_product"
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={prod?.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() => {
                              handleUpdate(prod?.product?._id, prod?.count + 1);
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {prod?.price}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => {
                            handleDelete(prod?.product?._id);
                          }}
                          className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className="w-full bg-green-500 rounded-md text-white py-2">
                CheckOut
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-xl pb-3 text-green-500">
            Num Of Cart Items : {numOfCartItems}
          </h2>
          <h3 className="text-xl">Total Price : {totalPrice} EGP</h3>

          <button
            onClick={() => {
              handleClear();
            }}
            className="absolute top-30 start-300 bg-green-100  text-sm font-medium me-2 p-3 rounded-full dark:bg-green-900 text-white"
          >
            Clear all Cart
          </button>

          {products?.length > 0 && (
            <Link to="/checkout">
              <button className="w-full bg-green-500 rounded-md text-white py-2">
                CheckOut
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
