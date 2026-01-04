import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/packages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8000/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (err) {
      alert("Failed to delete package");
    }
  };

  if (loading) return <p className="text-center py-10">Loading packages...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Manage Packages</h2>
        <div className="flex gap-3">
          {/* <button
            onClick={() => navigate("cards")}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View as Cards
          </button> */}
          <button
            onClick={() => navigate("addpackage")}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add New Package
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-3 px-4 text-center">Image</th>
              <th className="py-3 px-4 text-center">Title</th>
              <th className="py-3 px-4 text-center">Location</th>              
              <th className="py-3 px-4 text-center">Price (Rs.)</th>
              <th className="py-3 px-4 text-center">Available Slots</th>
              <th className="py-3 px-4 text-center">Duration</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-6">
                  <img
                    src={pkg.image || "https://via.placeholder.com/100"}
                    alt={pkg.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4 text-center">{pkg.title}</td>
                <td className="py-3 px-4 text-center">{pkg.location}</td>
                <td className="py-3 px-4 text-center">{pkg.price}</td>
                <td className="py-3 px-4 text-center">{pkg.availableSlots}</td>
                <td className="py-3 px-4 text-center"> {pkg.duration} </td>
                <td className="py-3 px-4 flex gap-2 items-center justify-center">
                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 items-center"
                    onClick={() => navigate(`/admindashboard/packages/edit/${pkg._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="bg-red-900 text-white px-3 py-1 rounded hover:bg-red-500 items-center"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPackageList;
