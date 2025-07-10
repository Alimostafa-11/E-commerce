import React, { useEffect, useState } from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assets/assets/images/slider-image-2.jpeg";
import img2 from "../../assets/assets/images/slider-image-1.jpeg";
import img3 from "../../assets/assets/images/slider-image-3.jpeg";
import img4 from "../../assets/assets/images/grocery-banner.png";
import img5 from "../../assets/assets/images/grocery-banner-2.jpeg";

const MainSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-3/4 ">
          <Slider {...settings}>
            <img className="h-[400px]" src={img3} alt="" />
            <img className="h-[400px]" src={img4} alt="" />
            <img className="h-[400px]" src={img5} alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img className="w-full h-[200px]" src={img1} alt="" />
          <img className="w-full h-[200px]" src={img2} alt="" />
        </div>
      </div>
    </>
  );
};

export default MainSlider;
