import axios from "axios";
import { Children, createContext, useEffect } from "react";
import { useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
  let [numOfCartItems, setnumOfCartItems] = useState(0);
  let [cartId, setcartId] = useState(null);
  let [totalPrice, settotalPrice] = useState(0);
  let [products, setproducts] = useState(null);
  let headers = { token: localStorage.getItem("usertoken") };
  let token = localStorage.getItem("usertoken");

  function resetCart() {
    setcartId(null);
    setnumOfCartItems(0);
    settotalPrice(0);
    setproducts(null);
  }

  // function to add a product to the cart
  function addToCart(prodId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: prodId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        getUserCartItem();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function getUserCartItem() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers,
        }
      )
      .then((response) => {
        setnumOfCartItems(response?.data?.numOfCartItems);
        setcartId(response?.data?.cartId);
        settotalPrice(response?.data?.data?.totalCartPrice);
        setproducts(response?.data?.data?.products);

        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function updateCart(prodId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setnumOfCartItems(response?.data?.numOfCartItems);
        setcartId(response?.data?.cartId);
        settotalPrice(response?.data?.data?.totalCartPrice);
        setproducts(response?.data?.data?.products);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function deleteCart(prodId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,

        {
          headers,
        }
      )
      .then((response) => {
        setnumOfCartItems(response?.data?.numOfCartItems);
        setcartId(response?.data?.cartId);
        settotalPrice(response?.data?.data?.totalCartPrice);
        setproducts(response?.data?.data?.products);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  function clearCart() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers,
        }
      )
      .then((response) => {
        setproducts([]);
        setnumOfCartItems(0);
        settotalPrice(0);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  useEffect(() => {
    if (token) {
      getUserCartItem();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        deleteCart,
        updateCart,
        clearCart,
        resetCart,
        numOfCartItems,
        cartId,
        totalPrice,
        products,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
