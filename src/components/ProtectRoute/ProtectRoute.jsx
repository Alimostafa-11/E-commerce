import React, { useEffect, useState } from "react";
import style from "./ProtectRoute.module.css";
import { Navigate } from "react-router-dom";

const ProtectRoute = (props) => {
  if (localStorage.getItem("usertoken") !== null)
  {
    // login
    return props.children

  }
  
  
  else {
    // nologin
    return <Navigate to='/login'/>
  }
    return <div></div>;
};

export default ProtectRoute;
