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

          <div className="relative pt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              </thead> */}
              <tbody>
                {products?.map((prod) => {
                  return (
                    <tr key={prod?.product?._id} className="bg-white border-b">
                      <td className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={prod?.product?.imageCover}
                              className="w-80 md:w-24 max-w-full max-h-full"
                              alt="Product"
                            />
                            <span className="font-semibold text-gray-600">
                              {prod?.product?.title}
                            </span>
                          </div>

                          <div className="flex items-center justify-between md:justify-end flex-wrap gap-2 mt-2 md:mt-0">
                            <button
                              onClick={() =>
                                handleUpdate(
                                  prod?.product?._id,
                                  prod?.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-green-500 bg-white border border-green-300 rounded-full hover:bg-gray-100"
                              type="button"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>

                            <span className="w-10 text-center">
                              {prod?.count}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdate(
                                  prod?.product?._id,
                                  prod?.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-green-500 bg-white border border-green-300 rounded-full hover:bg-gray-100"
                              type="button"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>

                            <span className="font-semibold text-gray-700 px-2">
                              {prod?.price} EGP
                            </span>

                            <button
                              onClick={() => handleDelete(prod?.product?._id)}
                              className="text-red-600 hover:underline text-sm"
                            >
                              <i className="fa-solid fa-trash me-1"></i> Remove
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center my-4">
              <button
                onClick={() => {
                  handleClear();
                }}
                className="cursor-pointer  bg-green-500 rounded-md text-white py-2 px-4"
              >
                Clear all Cart
              </button>
            </div>
            <div className="flex justify-center my-4">
              <Link to="/checkout">
                <button className=" bg-green-500 rounded-md text-white py-2 px-6">
                  CheckOut
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-xl pb-3 text-green-500">
            Num Of Cart Items : {numOfCartItems}
          </h2>
          <h3 className="text-xl">Total Price : {totalPrice} EGP</h3>
        </div>
      )}
    </>
  );
};

export default Cart;
