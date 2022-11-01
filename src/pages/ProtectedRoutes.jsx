import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserContext from "./../hooks/useUserContext";

const ProtectedRoutes = () => {
  const userContext = useUserContext();
  const isAdmin = userContext.state.role === "admin";
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
