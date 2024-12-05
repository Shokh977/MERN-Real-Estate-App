import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../Store/useAuthStore";
import axios from 'axios';


export default function Listings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const user = useAuthStore();
  console.log(listings, "list", user.user._id, "cur user");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/user/listing/${user.user._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError("Failed to fetch listings.");
          console.log("clicked");
          return;
        }
        setListings(data);
      } catch (error) {
        setError("An error occurred while fetching listings.");
      }
    };

    fetchListings();
  }, [user.user._id]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
  
      try {
        const res = await axios.delete(`/api/listing/delete/${id}`);
  
        if (!res.data.success) {
          alert("Failed to delete listing.");
          setListings((prevListings) => [...prevListings, id]);
        } else {
          alert("Listing deleted successfully.");
        }
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("An error occurred while deleting the listing.");
        setListings((prevListings) => [...prevListings, id]);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      {error && <p className="text-red-600">{error}</p>}
      {listings.length === 0 ? (
        <p className="text-gray-500">No listings created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls && listing.imageUrls[0]}
                  alt={listing.name}
                  className="w-full h-40 object-cover rounded"
                />
              </Link>
              <div className="mt-2">
                <p className="text-lg font-semibold truncate">{listing.name}</p>
                <div className="flex justify-between mt-2">
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="text-green-500">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
