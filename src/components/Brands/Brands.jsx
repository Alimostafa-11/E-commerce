import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Brands = () => {
  let [allbrands, setallbrands] = useState(null);

  function getAllBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((response) => {
        console.log(response);
        setallbrands(response.data.data); //
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <>
      {allbrands?.length > 0 ? (
        <div className="flex gap-y-3 flex-wrap">
          {allbrands?.map((brand) => {
            return (
              <div key={brand?._id} className="w-full md:w-1/3">
                <div className="product p-5">
                  <img
                    src={brand?.image}
                    className="h-[400px]  w-full"
                    alt={brand?.title}
                  />
                  <span className="text-green-400 text-xl mx-40">
                    {brand?.name}
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

export default Brands;
