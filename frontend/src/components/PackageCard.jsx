import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
      <img
        src={pkg.image || "/default-package.jpg"} // fallback image
        alt={pkg.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{pkg.name}</h2>
      <p className="text-gray-600 mt-1">{pkg.description}</p>
      <p className="font-semibold mt-2">Price: ${pkg.price}</p>
      <Link
        to={`/packagelist`} // you can make this dynamic later
        className="mt-2 inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Browse
      </Link>
    </div>
  );
};

export default PackageCard;
