import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRouter from "./components/PrivateRouter"; // Your custom PrivateRouter
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import { useAuthStore } from "./Store/useAuthStore";

export default function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          }
        />
        <Route
          path="/create-listing"
          element={
            <PrivateRouter>
              <CreateListing />
            </PrivateRouter>
          }
        />
        <Route
          path="/update-listing/:id"
          element={
            <PrivateRouter>
              <UpdateListing />
            </PrivateRouter>
          }
        />

        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
