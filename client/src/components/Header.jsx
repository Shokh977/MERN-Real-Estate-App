import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  console.log(currentUser, 'user from nav')

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-semibold text-blue-900 tracking-wide flex items-center">
            <span className="text-green-600">Real</span>
            <span className="ml-1 text-gray-800">Estate</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form className="bg-gray-100 p-2 rounded-full flex items-center w-full max-w-md shadow-sm">
          <input
            type="text"
            placeholder="Search properties, locations..."
            className="bg-transparent focus:outline-none w-full px-4 text-gray-700"
          />
          <IoSearchOutline className="text-blue-700" size={25} />
        </form>

        <ul className="flex items-center gap-8">
          <Link to="/">
            <li className="text-gray-700 hover:text-blue-700 transition font-medium text-lg cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-gray-700 hover:text-blue-700 transition font-medium text-lg cursor-pointer">
              About
            </li>
          </Link>

          {/* Profile or Sign In */}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover shadow-md border-2 border-blue-700"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="bg-blue-700 text-white py-2 px-4 rounded-full shadow-md cursor-pointer hover:bg-blue-800 transition">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
