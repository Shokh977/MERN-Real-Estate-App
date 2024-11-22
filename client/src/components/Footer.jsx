import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-green-500 py-12 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-bold">Ready to Start?</h2>
      <p className="text-sm md:text-base mt-4">
        Begin your property journey with us today!
      </p>
      <Link
        to="/search"
        className="mt-6 inline-block bg-white text-green-500 font-bold py-2 px-6 rounded hover:bg-gray-100 transition-all">
        Find Your Home
      </Link>
    </div>
  );
}
