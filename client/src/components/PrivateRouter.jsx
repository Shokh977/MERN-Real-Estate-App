import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouter() {
  const currentUser = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

// outlet is a child component inside of the PrivateRouter in app.js
{
  /* <Route element={<PrivateRouter />}>
<Route path="/profile" element={<Profile />} />
</Route> */
}

// so if the currentUser exists Outlet (profile component)is rendered otherwise
// user is navigated to the sign in page
