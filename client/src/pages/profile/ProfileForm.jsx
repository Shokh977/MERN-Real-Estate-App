import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import { useUserStore } from './../../Store/useUserStore';
import { useAuthStore } from "../../Store/useAuthStore";

export default function ProfileForm() {
  const fileRef = useRef(null);
  const { user, loading , updateUser} = useAuthStore();

  console.log(user._id, 'id from update')
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

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user.avatar || formData.avatar,
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      await updateUser(user._id, formData);
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
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
            src={formData.avatar || user?.avatar || "https://via.placeholder.com/150"}
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
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70 transition duration-300"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-600 text-white text-lg font-semi-bold text-center p-3 rounded-lg hover:opacity-90 transition duration-300"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>
    </div>
  );
}
