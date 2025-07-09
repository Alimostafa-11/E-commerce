import React, { useEffect, useState } from "react";
import style from "./Productdetails.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Productdetails = () => {
  let { id , category } = useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let [productDetails, setproductDetails] = useState(null);
  let [relatedProduct, setrelatedProduct] = useState(null);

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let related = data?.data.filter((prod) => {
          return prod?.category?.name === category;
        });
        setrelatedProduct(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setproductDetails(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllProducts();
    getProductDetails();
  }, [id ,category]);  //update
  return (
    <>
      {productDetails ? (
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/4">
            <Slider {...settings}>
              {productDetails?.images.map((src) => {
                return (
                  <img
                    className="w-full"
                    src={src}
                    alt={productDetails?.title}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="w-full md:w-3/4">
            <div className="content mx-3">
              <h3 className="text-3xl font-bold">{productDetails?.title}</h3>
              <p className="text-slate-600 my-2">
                {productDetails?.description}
              </p>
              <span className="text-green-500 text-xl">
                {productDetails?.category?.name}
              </span>
              <div className="flex justify-between my-2">
                <span>{productDetails?.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i>
                  {productDetails?.ratingsAverage}
                </span>
              </div>
              <button className="w-full bg-green-600 py-2 rounded-md my-2">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      <div className="my-10">
        <h3 className="text-2xl text-green-500 font-medium">Related Product</h3>
        <div className="flex flex-wrap ">
          {relatedProduct?.map((prod) => {
            return (
              <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
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
                  <button className="w-full bg-green-600 py-2 rounded-md my-2">
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Productdetails;
