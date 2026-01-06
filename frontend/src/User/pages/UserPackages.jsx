import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const res = await axios.get("http://localhost:8000/api/packages");
      setPackages(res.data);
    };
    fetchPackages();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={pkg.image || "https://via.placeholder.com/400x250"}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-gray-600 mt-1">Rs. {pkg.price}</p>

              <Link
                to={`userdashboard/packages/${pkg._id}`}
                className="inline-block mt-3 text-blue-700 font-medium hover:underline"
              >
                View details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPackages;
