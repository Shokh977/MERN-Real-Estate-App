import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouter() {
  // Access currentUser from the Redux store
  const currentUser = useSelector((state) => state.user.user.currentUser);
  
  // If currentUser exists, render the Outlet; otherwise, navigate to the sign-in page
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
