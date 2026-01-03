import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [imageType, setImageType] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/packages/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setDuration(res.data.duration);
        setLocation(res.data.location);
        setAvailableSlots(res.data.availableSlots);
        setImageUrl(res.data.image);
        setSuccess(""); 
        setError("");
      })
      .catch(() => setError("Failed to fetch package"));
  }, [id]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("location", location);
      formData.append("availableSlots", availableSlots);
      if (imageType === "url") {
        formData.append("imageUrl", imageUrl);
      } else if (imageFile) {
formData.append("imageFile", imageFile);
      }

      await axios.put(`http://localhost:8000/api/packages/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      setSuccess("Package updated successfully");
      setError("");
      setTimeout(() => navigate("/admindashboard/packages"), 1500);
    } catch {
      setError("Failed to update package");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Package</h2>

      {success && <div className="mb-4 rounded bg-green-100 text-green-800 px-4 py-2 text-center">{success}</div>}
      {error && <div className="mb-4 rounded bg-red-100 text-red-800 px-4 py-2 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-200 p-6 rounded-lg shadow">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Available Slots */}
        <div>
          <label className="block mb-1 font-medium">Available Slots</label>
          <input
            type="number"
            value={availableSlots}
            onChange={(e) => setAvailableSlots(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">Image</label>
          <div className="flex gap-6 mb-3">
            <label className="flex items-center gap-2">
              <input type="radio" name="imageType" value="url" checked={imageType === "url"} onChange={() => setImageType("url")} />
              Image URL
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="imageType" value="file" checked={imageType === "file"} onChange={() => setImageType("file")} />
              Upload Image
            </label>
          </div>

          {imageType === "url" && (
            <>
              <input type="text" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900" />
              {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-40 h-24 object-cover rounded" />}
            </>
          )}
          {imageType === "file" && (
            <>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full" />
              {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="mt-2 w-40 h-24 object-cover rounded" />}
            </>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700">Update Package</button>
      </form>
    </div>
  );
};

export default EditPackage;
