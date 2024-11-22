import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
     
      <div className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center text-center text-white p-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-green-400">Us</span>
          </h1>
          <p className="mt-4 text-sm md:text-lg max-w-3xl">
            Dedicated to making your property dreams a reality, we bring passion,
            experience, and innovation to every step of your journey.
          </p>
          <Link
            to="/search"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white text-sm md:text-base font-bold py-2 px-4 rounded"
          >
            Explore Listings
          </Link>
        </div>
        <img
          src="/home.png"
          className="w-full h-full object-cover"
          alt="About Us"
        />
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 text-center my-8">
          Our Mission
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base max-w-4xl mx-auto">
          At <span className="text-green-400">Your Journey Home</span>, our mission is
          to simplify the process of buying, selling, and renting properties by
          providing intuitive tools, expert guidance, and personalized support.
          Whether you're a first-time buyer or a seasoned investor, we're here to
          make every step seamless and enjoyable.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md p-6 rounded-lg text-center"
              >
                <img
                  src={`/team${i + 1}.jpg`}
                  alt={`Team Member ${i + 1}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-slate-600">
                  Team Member {i + 1}
                </h3>
                <p className="text-gray-500 text-sm">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 text-center my-8">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-green-100 text-center rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Integrity</h3>
            <p className="text-sm text-gray-600 mt-2">
              We prioritize honesty and transparency in all our dealings.
            </p>
          </div>
          <div className="p-6 bg-green-100 text-center rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Innovation</h3>
            <p className="text-sm text-gray-600 mt-2">
              Leveraging technology to offer you the best experience.
            </p>
          </div>
          <div className="p-6 bg-green-100 text-center rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">Commitment</h3>
            <p className="text-sm text-gray-600 mt-2">
              Dedicated to exceeding expectations every step of the way.
            </p>
          </div>
        </div>
      </div>     
    </div>
  );
}
