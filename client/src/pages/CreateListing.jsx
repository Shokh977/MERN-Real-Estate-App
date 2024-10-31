import React, { useState } from "react";
import { motion } from "framer-motion";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { FiLoader } from "react-icons/fi";


const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    imageUrls: []
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length <= 6) {
      setUploading(true);
      const uploadPromises = Array.from(files).map((file) => storeImage(file));
      try {
        const urls = await Promise.all(uploadPromises);
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: [...prevData.imageUrls, ...urls]
        }));
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please select up to 6 images.");
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // Code to save formData to MongoDB
    console.log("Listing data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-10">
      <motion.div
        className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Create a Listing
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Listing Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md md:col-span-2"
            rows="4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="regularPrice"
            placeholder="Regular Price"
            value={formData.regularPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            value={formData.discountPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />

          <div className="flex flex-col">
            <label className="text-gray-800 mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-gray-800">Furnished</label>
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
              className="form-checkbox text-green-700"
            />
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-gray-800">Parking Available</label>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
              className="form-checkbox text-green-700"
            />
          </div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          <div className="flex items-center space-x-3">
            <label className="text-gray-800">Special Offer</label>
            <input
              type="checkbox"
              name="offer"
              checked={formData.offer}
              onChange={handleChange}
              className="form-checkbox text-green-700"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-gray-800">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-gray-600"
            />
            {uploading && (
              <p className="text-green-600 mt-2">Uploading image(s)...</p>
            )}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-2 py-2">
                {formData.imageUrls.length > 0 && formData.imageUrls.map(url => (
                <img src={url} alt="listing images"  className="w-40 h-40 object-cover rounded-lg"/>
            ))}
            </div>
            
            <button
              onClick={handleImageSubmit}
              className="disabled:opacity-70 text-green-700 border border-green-700 w-20 h-12 text-center rounded-md text-lg font-semibold"
              type="button"
            >
             {uploading? <FiLoader className='animate-spin mx-auto'/> : "Upload"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full md:col-span-2 px-6 py-3 mt-4 bg-green-700 text-white rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Submit Listing
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateListing;
