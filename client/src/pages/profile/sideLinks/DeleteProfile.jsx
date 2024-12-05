import React, { useState } from 'react';
import { useAuthStore } from '../../../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const DeleteProfile = () => {

  const { deleteProfile, loading, error } = useAuthStore();
  const navigate = useNavigate()

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      navigate("/");

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Are you sure you want to delete your profile?
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We are sorry to see you go! You can always come back, and we will help you find a new place.
      </p>
      <button
        onClick={handleDeleteProfile}
        disabled={loading}
        className={`w-full py-3 text-white font-semibold rounded-lg focus:outline-none 
          ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} 
          transition-colors duration-300`}
      >
        {loading ? 'Deleting...' : 'Yes, Delete My Profile'}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default DeleteProfile;
