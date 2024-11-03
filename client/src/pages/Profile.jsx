import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
} from "../Redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user.currentUser);
  const loading = useSelector((state) => state.user.user.loading);
  const error = useSelector((state) => state.user.user.error);
  const navigate = useNavigate();

  const { avatar, username, email } = currentUser;

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadPer, setUploadPer] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [showListError, setShowListError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const [formData, setFormData] = useState({
    avatar,
    username,
    email,
    password: "",
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPer(Math.round(progress));
      },
      (error) => {
        setFileError(true);
        console.error("Error during file upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setUploadPer(100);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
        navigate("/sign-up"); // Redirect after successful deletion
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (!data.success) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListError(true);
        console.log("clicked");
        return;
      }
      setUserListings(data);
    } catch (error) {
      showListError(true);
    }
  };
  const handleListingDelete = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      log;
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white rounded-lg shadow-md my-7">
      <h1 className="text-3xl font-semibold text-center my-5">My Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
          id="image"
          type="file"
        />
        <div className="flex justify-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || avatar}
            alt="Profile Avatar"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-2 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <p className="text-sm text-center">
          {fileError ? (
            <span className="text-red-600">Error occurred</span>
          ) : uploadPer > 0 && uploadPer < 100 ? (
            <span className="text-blue-600">{`Uploading ${uploadPer}%`}</span>
          ) : uploadPer === 100 ? (
            <span className="text-green-600">Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70 transition duration-300">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-600 text-white text-lg font-semi-bold text-center p-3 rounded-lg hover:opacity-90 transition duration-300"
          to="/create-listing">
          Create Listing
        </Link>
      </form>
      <button
        onClick={handleShowListing}
        className="bg-green-600 my-3 w-full text-white text-lg font-semi-bold text-center p-3 rounded-lg hover:opacity-90 transition duration-300">
        Listings
      </button>
      <p className="text-green-500 mt-5 ">
        {showListError ? "Error showing listing" : ""}
      </p>

      <div className="flex justify-between mt-5">
        <span
          className="text-red-600 cursor-pointer hover:underline"
          onClick={handleDelete}>
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>

      {error && (
        <div className="bg-red-900 bg-opacity-50 p-3 m-2 rounded-lg text-white">
          <p>{error}</p>
        </div>
      )}
      <div className="my-8">
        <h1 className="text-xl font-bold text-green-500 text-center">
          Your listing
        </h1>
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div
              className="flex items-center justify-between mx-4 border px-4 m-4 gap-2"
              key={listing._id}>
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="w-40 h-40 object-contain rounded-lg "
                  src={listing.imageUrls[0]}
                  alt="listing cover image"
                />
              </Link>
              <Link tp={`/listing/${listing._id}`} className="flex-1">
                <p className="text-late-700 font-semibold  hover:underline truncate">
                  {listing.name}
                </p>
              </Link>
              <div className="flex flex-col">
                <button
                  className="uppercase text-red-700"
                  onClick={() => handleListingDelete(listing._id)}>
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="uppercase text-green-700">Edit</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
