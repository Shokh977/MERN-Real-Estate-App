import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
        <Link to="/" className="text-2xl font-semibold text-blue-900 tracking-wide flex items-center">
          <span className="text-green-500">Real</span>
          <span className="ml-1 text-gray-800">Estate</span>
        </Link>

        <button
          className="text-blue-900 text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
        <form
        onSubmit={handleSubmit}
        className=" hidden bg-gray-100 p-2 rounded-full md:flex items-center w-full max-w-md mx-auto my-2 md:my-0 md:shadow-sm">
        <input
          type="text"
          placeholder="Search properties, locations..."
          className="bg-transparent focus:outline-none w-full px-4 text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <IoSearchOutline className="text-blue-700" size={25} />
        </button>
      </form>
        <ul className="hidden md:flex items-center gap-8">
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

      {menuOpen && (
        <ul className="flex flex-col items-center gap-6 bg-white py-4 shadow-md md:hidden">
          <li>
          <form
        onSubmit={handleSubmit}
        className=" md:hidden bg-gray-100 p-2 rounded-full flex items-center w-full max-w-md mx-auto my-2 md:my-0 md:shadow-sm">
        <input
          type="text"
          placeholder="Search properties, locations..."
          className="bg-transparent focus:outline-none w-full px-4 text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <IoSearchOutline className="text-blue-700" size={25} />
        </button>
      </form>
          </li>
          <Link to="/">
            <li
              className="text-gray-700 hover:text-blue-700 transition font-medium text-lg cursor-pointer"
              onClick={() => setMenuOpen(false)}>
              Home
            </li>
          </Link>
          <Link to="/about">
            <li
              className="text-gray-700 hover:text-blue-700 transition font-medium text-lg cursor-pointer"
              onClick={() => setMenuOpen(false)}>
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover shadow-md border-2 border-blue-700"
                src={currentUser.avatar}
                alt="profile"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <li
                className="bg-blue-700 text-white py-2 px-4 rounded-full shadow-md cursor-pointer hover:bg-blue-800 transition"
                onClick={() => setMenuOpen(false)}>
                Sign In
              </li>
            )}
          </Link>
        </ul>
      )}

    </header>
  );
}
