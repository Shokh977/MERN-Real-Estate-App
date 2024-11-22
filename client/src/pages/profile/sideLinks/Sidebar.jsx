import React from "react";
import { useSelector } from "react-redux";

export default function Sidebar({ menu, setMenu }) {
  const currentUser = useSelector((state) => state.user.user.currentUser);

  const menuItems = [
    { name: "listings", label: "Listings" },
    { name: "createlistings", label: "Create Listings" },
    { name: "profile", label: "Profile" },
    { name: "signout", label: "Sign Out", className: "text-blue-600" },
    { name: "delete", label: "Delete Account", className: "text-red-600" },
  ];

  return (
    <div className="w-1/4 border-r bg-gray-100">
      <div className="p-8 flex flex-col items-center">
        <img
          className="w-20 h-20 object-cover rounded-full border border-green-500"
          src={currentUser.avatar}
          alt="User Avatar"
        />
        <p className="mt-4 text-gray-700 font-semibold">{currentUser.username}</p>
      </div>
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setMenu(item.name)}
            className={`p-4 text-center cursor-pointer hover:bg-gray-200 transition ${
              menu === item.name ? "bg-gray-300" : ""
            } ${item.className || ""}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
