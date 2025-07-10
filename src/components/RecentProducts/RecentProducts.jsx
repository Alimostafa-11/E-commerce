import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../RecentProducts/RecentProducts.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WisListContext } from "../../Context/WishListContext";

const RecentProducts = () => {
  let { addToCart } = useContext(CartContext);
  let { addToWishList, getUserWishList } = useContext(WisListContext);
  let [allproducts, setallproducts] = useState(null);
  let [isWished, setisWished] = useState([]);

  async function addProdToCart(prodId) {
    let response = await addToCart(prodId);
    if (response.data.status === "success") {
      toast.success(response?.data?.message);
    } else {
      toast.error("error....");
    }
  }

  async function addToProdWishList(prodId) {
    const alreadyWished = isWished.includes(prodId);

    if (alreadyWished) {
      try {
        let response = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );
        if (response.data.status === "success") {
          toast.success("Removed from wishlist");
          setisWished((prod) => prod.filter((id) => id !== prodId));
        }
      } catch (err) {
        toast.error("Error removing from wishlist");
      }
    } else {
      let response = await addToWishList(prodId);
      if (response.data.status === "success") {
        toast.success("Added to wishlist");
        setisWished((prod) => [...prod, prodId]);
      } else {
        toast.error("Error adding to wishlist");
      }
    }
  }
  async function fetchWishlist() {
    try {
      const wishlistItems = await getUserWishList();
      const wishedIds = wishlistItems?.map((item) => item._id) || [];
      setisWished(wishedIds || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading wishlist");
    }
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setallproducts(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllProducts();
    fetchWishlist();
  }, []);
  return (
    <>
      {allproducts?.length > 0 ? (
        <div className="flex gap-y-3 flex-wrap">
          {allproducts?.map((prod) => {
            return (
              <div key={prod._id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
                <div className="product p-5">
                  <Link
                    to={`/Productdetails/${prod?.id}/${prod.category.name}`}
                  >
                    <img
                      src={prod.imageCover}
                      className="w-100"
                      alt={prod.title}
                    />
                    <span className="text-green-600">{prod.category.name}</span>
                    <h3 className="text-xl font-medium">
                      {prod.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span>{prod.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>
                        {prod.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="flex">
                    <button
                      onClick={() => {
                        addProdToCart(prod._id);
                      }}
                      className="w-full cursor-pointer bg-green-600 py-2 rounded-md my-2"
                    >
                      Add To Cart
                    </button>

                    <button>
                      <i
                        onClick={() => {
                          addToProdWishList(prod._id);
                        }}
                        className={`fa-solid fa-heart text-2xl transition-colors duration-300 cursor-pointer ${
                          isWished.includes(prod._id)
                            ? "text-red-600"
                            : "text-black-400"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RecentProducts;
