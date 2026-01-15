import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PackageDetailsModal from "../components/PackageDetailsModal";

const UserPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      const res = await axios.get("http://localhost:8000/api/packages");
      setPackages(res.data);
    };
    fetchPackages();
  }, []);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">Available Packages</h2>

      {/* PACKAGES GRID */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition ${
          selectedPackage ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition relative"
          >
            <img
              src={pkg.image || "https://via.placeholder.com/400x250"}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-gray-600 mt-1">Rs. {pkg.price}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="text-blue-700 font-medium hover:underline"
                >
                  View details →
                </button>

                <button
                  onClick={() =>
                    navigate("/userdashboard/bookings/addbooking", {
                      state: { selectedPackage: pkg },
                    })
                  }
                  className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <PackageDetailsModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={() =>
            navigate("/userdashboard/bookings/addbooking", {
              state: { selectedPackage },
            })
          }
        />
      )}
    </div>
  );
};

export default UserPackages;
