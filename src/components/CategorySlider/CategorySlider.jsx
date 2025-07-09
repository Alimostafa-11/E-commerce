import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

const CategorySlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let [allCategory, setallCategory] = useState(null);

  function getAllCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setallCategory(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <div className=" my-3">
        <h2 className="text-xl my-3 font-medium">Shop Popular Categories</h2>

        <Slider {...settings}>
          {allCategory?.map((category) => {
            return (
              <div>
                <img
                  className="h-[200px]"
                  src={category.image}
                  alt={category?.name}
                />
                <h3>{category?.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CategorySlider;
