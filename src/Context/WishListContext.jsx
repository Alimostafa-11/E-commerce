import axios from "axios";
import { Children, createContext, useEffect } from "react";
import { useState } from "react";

export let WisListContext = createContext(0);

export default function WishListContextProvider(props) {
  let [numOfCartItems, setnumOfCartItems] = useState(0);

  let [totalPrice, settotalPrice] = useState(0);
  let [products, setproducts] = useState(null);
  let token = localStorage.getItem("userToken");

  // function to add a product to the cart
  function addToWishList(prodId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: prodId,
        },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        getUserWishList();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function getUserWishList() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,

        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        setproducts(response?.data?.data);

        return response?.data?.data;
      })
      .catch((error) => {
        return error;
      });
  }

  function deleteWishList(prodId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,

        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        getUserWishList();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  useEffect(() => {
    if (token) {
      getUserWishList();
    }
  }, [token]);

  return (
    <WisListContext.Provider
      value={{
        addToWishList,
        deleteWishList,
        getUserWishList,
        numOfCartItems,
        totalPrice,
        products,
      }}
    >
      {props.children}
    </WisListContext.Provider>
  );
}
