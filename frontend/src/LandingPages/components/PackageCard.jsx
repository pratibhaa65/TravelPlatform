import React from "react";

const PackageCard = ({ pkg, onView, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={pkg.image || "https://via.placeholder.com/400x250"}
        alt={pkg.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{pkg.title}</h3>
        <p className="text-gray-600 mt-1">Rs. {pkg.price}</p>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onView}
            className="text-blue-700 font-medium hover:underline"
          >
            View details →
          </button>

          <button
            onClick={onBook}
            className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
