import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user.user.currentUser);
console.log(listings, 'list', currentUser, 'cur user')

  useEffect(() => {
    const fetchListings = async () => {
        try {
            const res = await fetch(`/api/user/listing/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
              setShowListError(true);
              console.log("clicked");
              return;
            }
            setListings(data);
          } catch (error) {
            showListError(true);
          }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    // Add delete logic
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt={listing.name}
                className="w-full h-40 object-cover rounded"
              />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold truncate">{listing.name}</p>
              <div className="flex justify-between mt-2">
                <Link to={`/update-listing/${listing._id}`} className="text-green-500">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
