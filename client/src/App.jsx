import React from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRouter from "./components/PrivateRouter";
import CreateListing from "./pages/CreateListing";
// import Dashboard from "./pages/profile/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<CreateListing />} />
        
      </Routes>
    </BrowserRouter>
  );
}
