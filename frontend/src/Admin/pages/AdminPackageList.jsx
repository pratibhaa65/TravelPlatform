import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/alert-dialog";

const AdminPackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageToDelete, setPackageToDelete] = useState(null);

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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/packages/${packageToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPackages((prev) =>
        prev.filter((pkg) => pkg._id !== packageToDelete)
      );
      setPackageToDelete(null);
    } catch (err) {
      alert("Failed to delete package");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading packages...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Manage Packages</h2>

        <button
          onClick={() => navigate("addpackage")}
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add New Package
        </button>
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
              <tr
                key={pkg._id}
                className="border-b bg-gray-100 hover:bg-white transition"
              >
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
                <td className="py-3 px-4 text-center">
                  {pkg.availableSlots}
                </td>
                <td className="py-3 px-4 text-center">{pkg.duration}</td>

                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() =>
                      navigate(`/admindashboard/packages/edit/${pkg._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setPackageToDelete(pkg._id)}
                    className="bg-red-900 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={!!packageToDelete}
        onOpenChange={() => setPackageToDelete(null)}
      >
        <AlertDialogContent className="bg-gray-50 max-w-sm w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h3 className="text-center">Delete Package</h3>
            </AlertDialogTitle>

            <AlertDialogDescription>
              <div className="text-center text-sm text-gray-600">
              Are you sure you want to delete this package?
              <p> This action cannot be undone.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-900 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPackageList;
