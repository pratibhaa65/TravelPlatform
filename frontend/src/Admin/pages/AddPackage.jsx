import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddPackage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [imageType, setImageType] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in");
        return;
      }

      const payload = {
        title,
        description,
        price: Number(price),
        duration,
        location,
        availableSlots: Number(availableSlots),
        image: imageUrl || "",
      };

      const res = await axios.post(
        "http://localhost:8000/api/packages",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(" Package added successfully");
      setError("");

      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setLocation("");
      setAvailableSlots("");
      setImageUrl("");

    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Failed to add package");
    }
  };


  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-gray-200 p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-center">Add Package</h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Available Slots */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Available Slots
          </label>
          <input
            type="number"
            value={availableSlots}
            onChange={(e) => setAvailableSlots(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
          />
        </div>


        {/* Image Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>

          {/* Radio Buttons */}
          <div className="flex gap-6 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
              />
              Image URL
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={imageType === "file"}
                onChange={() => setImageType("file")}
              />
              Upload Image
            </label>
          </div>

          {/* URL Input */}
          {imageType === "url" && (
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
            />
          )}

          {/* File Input */}
          {imageType === "file" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full "
            />
          )}
        </div>

        {success && (
          <div className="mb-4 rounded bg-green-100 text-green-800 px-4 py-2">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded bg-red-100 text-red-800 px-4 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Package
        </button>
        <Link
          to="/admindashboard/packages"
            className="text-blue-900 py-2 transition text-center justify-center flex hover:bg-blue-50"

        >
          View Packages
        </Link>
      </form>
    </>
  );
};

export default AddPackage;
