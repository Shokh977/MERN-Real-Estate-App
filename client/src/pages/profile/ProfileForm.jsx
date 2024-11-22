import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {app} from '../../firebase'
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
} from "../../Redux/user/userSlice";

export default function ProfileForm() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user.currentUser);
  const loading = useSelector((state) => state.user.user.loading);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    avatar: "https://via.placeholder.com/150",
    username: "",
    email: "",
    password: "",
  });
  
  const [file, setFile] = useState(undefined);
  const [uploadPer, setUploadPer] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [showListError, setShowListError] = useState(false);
  const [userListings, setUserListings] = useState([]);


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
      useDispatch(updateUserStart());
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
  return (
    <div>
      {" "}
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
    </div>
  );
}
