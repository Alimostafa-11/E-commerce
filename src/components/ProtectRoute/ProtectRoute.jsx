import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const ProtectRoute = ({ children }) => {
  const { userLogin, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (userLogin === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectRoute;
