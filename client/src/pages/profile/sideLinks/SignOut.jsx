import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../Store/useAuthStore';

const SignOut = () => {
  const navigate = useNavigate();
  const {signout} = useAuthStore()

  const handleSignOut = () => {
    signout()
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Are you sure you want to leave?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We're here to help you find your perfect place! Stay with us and discover more listings.
        </p>
        <div className="flex justify-around mt-6">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Yes, Sign Out
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
          >
            No, Stay Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
