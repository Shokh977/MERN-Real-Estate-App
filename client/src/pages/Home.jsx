import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white h-64">
        <h2 className="text-4xl font-bold">Find Your Dream Home</h2>
        <p className="mt-2">Explore listings to buy, sell, or rent houses</p>
        <input
          type="text"
          placeholder="Search for homes..."
          className="mt-4 p-2 rounded-lg w-3/4 max-w-md"
        />
      </div>

      {/* Featured Listings Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Featured Listings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Listing Cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://via.placeholder.com/300x200?text=Listing+${index + 1}`}
                alt={`Listing ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">Beautiful House {index + 1}</h4>
                <p className="text-gray-600">$500,000</p>
                <Link to={`/listing/${index + 1}`} className="text-blue-600 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} RealEstate Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
