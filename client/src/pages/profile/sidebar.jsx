import React from 'react';

const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col items-center py-8">
      <div className="mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User"
          className="rounded-full w-24 h-24"
        />
        <h3 className="mt-4 text-lg font-semibold">User Dashboard</h3>
      </div>
      <ul className="w-full text-center">
        <li
          onClick={() => onSectionChange('profile')}
          className="py-3 cursor-pointer hover:bg-gray-700"
        >
          Profile
        </li>
        <li
          onClick={() => onSectionChange('settings')}
          className="py-3 cursor-pointer hover:bg-gray-700"
        >
          Settings
        </li>
        <li
          onClick={() => onSectionChange('listings')}
          className="py-3 cursor-pointer hover:bg-gray-700"
        >
          Listings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
