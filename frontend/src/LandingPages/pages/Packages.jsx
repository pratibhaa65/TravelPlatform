import React, { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";
import PackageDetailsModal from "../components/PackageDetailsModal";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    axios.get("/api/packages").then(res => setPackages(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Packages</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <PackageCard
            key={pkg._id}
            pkg={pkg}
            isLoggedIn={isLoggedIn}
            onView={() => setSelectedPackage(pkg)}
            onBook={() =>
              navigate("/userdashboard/bookings/addbooking", {
                state: { selectedPackage: pkg },
              })
            }
          />
        ))}
      </div>

      {selectedPackage && (
        <PackageDetailsModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={() =>
            isLoggedIn
              ? navigate("/userdashboard/bookings/addbooking", {
                  state: { selectedPackage },
                })
              : navigate("/login")
          }
        />
      )}
    </div>
  );
};

export default Packages;
