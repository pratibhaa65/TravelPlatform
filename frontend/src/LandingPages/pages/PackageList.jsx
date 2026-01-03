import axios from "axios";
import { useEffect, useState } from "react";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/packages")
      .then((res) => setPackages(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    await axios.delete(
      `http://localhost:8000/api/packages/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setPackages(packages.filter((pkg) => pkg._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Travel Packages
      </h2>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={pkg.image || "https://via.placeholder.com/400x250"}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">
                {pkg.title}
              </h3>

              <p className="text-gray-600 mb-2">
                Rs. {pkg.price}
              </p>

              <div className="flex justify-between items-center">
                <button className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-700">
                  View Details
                </button>

                {/* ADMIN DELETE (optional) */}
                {token && (
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
