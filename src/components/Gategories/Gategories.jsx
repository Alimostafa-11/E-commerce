import React, { useEffect, useState } from "react";
import style from "./Gategories.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Gategories = () => {
  let [allcategory, setallcategory] = useState(null);

  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        console.log(response);
        setallcategory(response.data.data); //
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {allcategory?.length > 0 ? (
        <div className="flex gap-y-3 flex-wrap">
          {allcategory?.map((category) => {
            return (
              <div key={category?._id} className="w-full md:w-1/3">
                <div className="product p-5">
                  <img
                    src={category?.image}
                    className="h-[400px]  w-full"
                    alt={category?.title}
                  />
                  <span className="text-green-400  text-xl mx-20">
                    {category?.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}{" "}
    </>
  );
};

export default Gategories;
