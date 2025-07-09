import React, { useContext, useEffect, useState } from "react";
import style from "./CheckOut.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import {toast} from "react-hot-toast"

const CheckOut = () => {
  let [ispayonline, setispayonline] = useState(true);
  let { cartId, resetCart } = useContext(CartContext);
  let headers = { token: localStorage.getItem("usertoken") };

  function detectPayment(val) {
    if (ispayonline) {
      payOnline(val);
    } else {
      payCash(val);
    }
  }

  function payCash(val) {
    console.log(val);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: val,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          toast.success("checkout done");
          resetCart();
        } else {
          toast.error("checkout failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function payOnline(val) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/`,
        {
          shippingAddress: val,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          window.location.href = response.data.session.url;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: detectPayment,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
              alt="user icon"
            />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Checkout Now
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
              method="POST"
            >
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.details}
                    id="details"
                    name="details"
                    type="text"
                    autoComplete="details"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="phone"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setispayonline(false);
                  }}
                  type="submit"
                  className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Pay Cash
                </button>
                <button
                  onClick={() => {
                    setispayonline(true);
                  }}
                  type="submit"
                  className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-green-400 my-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Pay Online
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
