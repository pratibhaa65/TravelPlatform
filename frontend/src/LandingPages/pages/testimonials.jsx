import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    message:
      "Planning my trips has never been this easy. The destinations, pricing, and overall experience are simply amazing.",
    name: "Ramesh Adhikari",
    location: "Pokhara, Nepal",
    photo: "https://c8.alamy.com/zooms/9/abf223b338c74a21954c2c09afeebf8a/pdycc8.jpg",
  },
  {
    message:
      "Booking was smooth and secure. The DESHTRIP team supported us throughout our Kathmandu tour.",
    name: "Sita Karki",
    location: "Kathmandu, Nepal",
    photo: "https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg",
  },
  {
    message:
      "Our Chitwan jungle safari was perfectly planned. Highly recommended for hassle-free travel.",
    name: "Aayush Shrestha",
    location: "Lalitpur, Nepal",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQe_gpGOqmoNujHVHn7Jfo2dObCoTRPRgKA&s",
  },
  {
    message:
      "Affordable packages and excellent service. Our Lumbini visit was peaceful and memorable.",
    name: "Bikash Yadav",
    location: "Birgunj, Nepal",
    photo: "https://www.shutterstock.com/image-vector/male-avatar-icon-unknown-anonymous-260nw-2206319795.jpg",
  },
  {
    message:
      "The trekking package was well organized and budget-friendly. I loved how easy everything was to manage.",
    name: "Suresh Thapa",
    location: "Gorkha, Nepal",
    photo: "https://www.shutterstock.com/image-vector/male-avatar-icon-unknown-anonymous-260nw-2206319795.jpg",
  },
  {
    message:
      "From booking to return, everything was smooth. DeshTrip really understands travelers’ needs.",
    name: "Pooja Shrestha",
    location: "Bhaktapur, Nepal",
    photo: "https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg",
  },
  {
    message:
      "Our Mustang trip was unforgettable. The itinerary and hotel choices were perfect.",
    name: "Rajiv Bhandari",
    location: "Butwal, Nepal",
    photo: "https://www.shutterstock.com/image-vector/male-avatar-icon-unknown-anonymous-260nw-2206319795.jpg",
  },
  {
    message:
      "Best travel platform in Nepal. Clear pricing, no hidden charges, and great destinations.",
    name: "Manoj Chaudhary",
    location: "Nepalgunj, Nepal",
    photo: "https://www.shutterstock.com/image-vector/male-avatar-icon-unknown-anonymous-260nw-2206319795.jpg",
  },
  {
    message:
      "Our girls’ trip to Pokhara was perfectly planned. Hotels, transport, everything was spot on.",
    name: "Rekha Pandey",
    location: "Dhangadhi, Nepal",
    photo: "https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    stopAutoScroll();
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? prev : prev + 1
      );
    } else if (diff < -50) {
      setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
    }

    isDragging.current = false;
    startAutoScroll();
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center overflow-hidden">
        <h2 className="text-3xl font-bold text-gray-900 mb-16">
          What our travelers say
        </h2>

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((item, index) => (
            <div key={index} className="min-w-full flex flex-col items-center">
              <img
                src={item.photo}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 max-w-xl">
                “{item.message}”
              </p>

              <h4 className="font-semibold text-gray-900">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">
                {item.location}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${currentIndex === index
                  ? "bg-green-500"
                  : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
