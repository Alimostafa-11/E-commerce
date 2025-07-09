import React, { useEffect, useState } from "react";
import style from "./Spinner.module.css";
import { ColorRing } from "react-loader-spinner";
const Spinner = () => {
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </>
  );
};

export default Spinner;
