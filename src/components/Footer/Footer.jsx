import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
const Footer = () => {
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="containe/r w-full m-auto">
        <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-200">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-900 sm:text-center dark:text-gray-900">
              <h2 className="text-2xl my-4">Get the FreshCart app</h2>
              <p className="mb-5">
                We will send you a link, open it on your phone to download the
                app
              </p>
              <form className="space-y-6" method="POST">
                <div className="flex">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      className="px-2 w-75 py-3 mt-1 block mx-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  <button className="w-full cursor-pointer text-white bg-green-600 py-2 rounded-md my-2">
                    Share App Link
                  </button>
                </div>
              </form>
            </span>
            <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-900 dark:text-gray-900 sm:mt-0">
              <h3 className="mx-6">Payment Pateners</h3>
              <h3 className="mx-9">Get deliveries with FreshCart</h3>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
