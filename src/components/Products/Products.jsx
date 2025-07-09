import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";

const Products = () => {
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <RecentProducts />
    </>
  );
};

export default Products;
