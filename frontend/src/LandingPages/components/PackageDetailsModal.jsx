import React from "react";

const PackageDetailsModal = ({ pkg, onClose, onBook }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <img
          src={pkg.image || "https://via.placeholder.com/600x300"}
          alt={pkg.title}
          className="w-full h-60 object-cover rounded-lg"
        />

        <h2 className="text-2xl font-bold mt-4">{pkg.title}</h2>
        <p className="text-gray-600 mt-2">{pkg.description}</p>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Price:</strong> Rs. {pkg.price}
          </p>
          <p>
            <strong>Available Slots:</strong> {pkg.availableSlots}
          </p>

          {pkg.availableSlots <= 3 && pkg.availableSlots > 0 && (
            <p className="text-red-600 text-sm font-medium">
              ⚠ Only few slots left!
            </p>
          )}

          {pkg.availableSlots === 0 && (
            <p className="text-red-700 font-medium">
              ❌ No slots available
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={onBook}
            disabled={pkg.availableSlots === 0}
            className={`px-6 py-2 rounded text-white ${pkg.availableSlots === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-700"
              }`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsModal;
