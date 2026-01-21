import React, { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";
import PackageDetailsModal from "../components/PackageDetailsModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("/api/packages");
        setPackages(res.data);
      } catch (error) {
        console.error("Failed to fetch packages", error);
      }
    };

    fetchPackages();
  }, []);

  const handleBook = (pkg) => {
    if (!isLoggedIn) {
      toast.error(
        <span>
          Please{" "}
          <a href="/login" className="underline font-semibold">
            login
          </a>{" "}
          to book this package
        </span>,
        { duration: 3000 }
      );
      return; 
    }

    navigate("/userdashboard/bookings/addbooking", {
      state: { selectedPackage: pkg },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Packages</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            pkg={pkg}
            onView={() => setSelectedPackage(pkg)}
            onBook={() => handleBook(pkg)}
          />
        ))}
      </div>

      {selectedPackage && (
        <PackageDetailsModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={() => handleBook(selectedPackage)}
        />
      )}
    </div>
  );
};

export default Packages;
