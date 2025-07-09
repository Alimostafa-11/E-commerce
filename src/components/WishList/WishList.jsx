import React, { useEffect, useState, useContext } from "react";
import style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { WisListContext } from "../../Context/WishListContext";

const WishList = () => {
  const { products, deleteWishList } =
    useContext(WisListContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  async function handleDelete(prodId) {
    let response = await deleteWishList(prodId);
    if (response.data.status === "success") {
      toast.success("Product Deleted");
      setDisplayedProducts((prod) =>
        prod.filter((item) => item._id !== prodId)
      );
    } else {
      toast.error("Error deleting product");
    }
  }

  async function addProdToCart(prodId) {
    let response = await addToCart(prodId);
    if (response.data.status === "success") {
      toast.success(response?.data?.message);

      handleDelete(prodId);
    } else {
      toast.error("Error adding to cart");
    }
  }

  useEffect(() => {
    if (products?.length > 0) {
      setDisplayedProducts(products);
    }
  }, [products]);

  return (
    <>
      {displayedProducts?.length > 0 ? (
        <div className="relative pt-10 overflow-x-auto shadow-md sm:rounded-lg">
          <h2 className="text-4xl pb-3 text-green-500">My Wish List</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product and title
                </th>
                <th scope="col" className="px-6 text-center py-3">
                  delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6  py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts?.map((prod) => (
                <tr
                  key={prod?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={prod?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={prod?.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod?.title}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white">
                    <button
                      onClick={() => handleDelete(prod?._id)}
                      className=" text-red-600 hover:underline dark:text-red-500"
                    >
                      Remove
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod?.price}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => addProdToCart(prod?._id)}
                      className="bg-green-500  text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-xl mt-6">Your wishlist is empty.</p>
      )}
    </>
  );
};

export default WishList;
