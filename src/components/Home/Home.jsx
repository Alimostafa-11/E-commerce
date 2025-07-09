import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import CategorySlider from "../CategorySlider/CategorySlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import MainSlider from "../MainSlider/MainSlider";

const Home = () => {
  let [allproducts, setallproducts] = useState(null);

  useEffect(() => {}, []);
  return (
    <>
      <MainSlider/>
      <CategorySlider />
      <RecentProducts />
    </>
  );
};

export default Home;
