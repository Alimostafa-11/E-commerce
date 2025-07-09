import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";

const Footer = () => {
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="container m-auto">
        <h1>footer</h1>
      </div>
    </>
  );
};

export default Footer;
