import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";
import { FaPlaneDeparture, FaMapMarkerAlt, FaGlobe, FaUsers, FaStar, FaHeadset } from "react-icons/fa";

const stats = [
  {
    icon: <FaGlobe />,
    value: "5000+",
    label: "Destinations",
  },
  {
    icon: <FaUsers />,
    value: "3.3k+",
    label: "Happy Travelers",
  },
  {
    icon: <FaStar />,
    value: "1.8k+",
    label: "Reviews",
  },
  {
    icon: <FaHeadset />,
    value: "24/7",
    label: "Support",
  },
];


const Home = () => {
   const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/packages");
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center bg-white px-6 md:px-16"
      >
        <div style={{ marginTop: "10px" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Explore the world 🌍
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Travel to your <span className="text-green-500">dream destination</span> <br />
                across the globe
              </h1>

              <p className="mt-4 text-gray-600 max-w-md">
                We help travelers find the best experiences by offering countless
                travel options and unforgettable journeys.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
                <button className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-200 transition">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center w-full max-w-2xl h-[520px]">
              <div className="relative w-full h-full">

                <img
                  src="/pc4.jpg"
                  alt="Top Left"
                  className="absolute top-6 left-6 w-40 h-52 object-cover rounded-2xl shadow-xl -rotate-6 
      hover:scale-105 hover:z-50 transition-all duration-300 ease-out cursor-pointer"
                />

                <img
                  src="/pc2.jpg"
                  alt="Top Right"
                  className="absolute top-10 right-8 w-40 h-52 object-cover rounded-2xl shadow-lg rotate-6 opacity-90
      hover:opacity-100 hover:scale-105 hover:z-50 transition-all duration-300 ease-out cursor-pointer"
                />

                <img
                  src="/pc5.jpg"
                  alt="Hero"
                  className="absolute top-1/2 left-1/2 w-52 h-72 object-cover rounded-2xl shadow-2xl 
      -translate-x-1/2 -translate-y-1/2 z-30 border-4 border-white
      hover:scale-110 hover:z-50 transition-all duration-300 ease-out cursor-pointer"
                />

                <img
                  src="/pc6.jpg"
                  alt="Bottom Left"
                  className="absolute bottom-6 left-12 w-40 h-56 object-cover rounded-2xl shadow-lg rotate-3 z-20
      hover:scale-105 hover:z-50 transition-all duration-300 ease-out cursor-pointer"
                />

                <img
                  src="/pc7.jpg"
                  alt="Bottom Right"
                  className="absolute bottom-8 right-12 w-40 h-56 object-cover rounded-2xl shadow-lg -rotate-3 z-20
      hover:scale-105 hover:z-50 transition-all duration-300 ease-out cursor-pointer"
                />

                <div className="absolute top-4 left-1/3 bg-green-500 text-white p-3 rounded-full shadow-lg z-40 animate-bounce">
                  <FaPlaneDeparture />
                </div>

                <div className="absolute bottom-24 right-1/3 bg-blue-900 text-white p-3 rounded-full shadow-lg z-40">
                  <FaMapMarkerAlt />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="relative flex justify-center items-center h-[420px]">

              <div className="absolute left-8 top-0 w-64 h-96 rounded-full overflow-hidden shadow-xl">
                <img
                  src="/tour.jpg"
                  alt="Scenery"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute right-8 top-12 bottom-0 w-64 h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/tour2.jpg"
                  alt="Adventure"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>


            <div className="space-y-8">

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Why Choose <span className="text-green-500">DeshTrip?</span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-xl">
                  DeshTrip makes travel simple, affordable, and truly memorable by
                  focusing on what matters most—trust, comfort, and authentic
                  experiences. We offer carefully curated trips with transparent
                  pricing and strong local expertise, so there are no surprises along
                  the way.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-6 text-center
                         hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto flex items-center justify-center
                              bg-green-100 text-green-600 rounded-full text-2xl">
                      {stat.icon}
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h3>

                    <p className="mt-1 text-gray-500 text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
      id="package"
      className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)
        ) : (
          <p className="col-span-3 text-center">No packages available yet.</p>
        )}
      </div>
    </section>
    </>
  );
};

export default Home;
