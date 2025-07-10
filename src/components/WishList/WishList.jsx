import React, { useEffect, useState, useContext } from "react";
import style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { WisListContext } from "../../Context/WishListContext";

const WishList = () => {
  const { products, deleteWishList } = useContext(WisListContext);
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
            <tbody>
              {displayedProducts?.map((prod) => (
                <tr key={prod?._id} className="bg-white border-b  ">
                  <td className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={prod?.imageCover}
                          className="w-70 m-auto md:w-50 max-w-full max-h-full"
                          alt="Product"
                        />
                      </div>

                      <span className="font-semibold text-center pb-5  text-gray-600">
                        {prod?.title}
                      </span>
                      <div className="flex items-center justify-between md:justify-end flex-wrap gap-2 mt-2 md:mt-0">
                        <td className="px-6 py-4 text-center text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleDelete(prod?._id)}
                            className=" text-red-600 hover:underline dark:text-red-500"
                          >
                            <i class="fa-solid fa-trash"></i> Remove
                          </button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-green-500">
                          {prod?.price} EGP
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => addProdToCart(prod?._id)}
                            className="bg-green-500  text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Add to Cart
                          </button>
                        </td>
                      </div>
                    </div>
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
