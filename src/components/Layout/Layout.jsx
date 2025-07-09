import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  let [counter, setcounter] = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <Navbar />

      <div className="container pt-[100px] max-w-7xl mx-auto">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
