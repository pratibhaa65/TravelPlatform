import React, { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      message:
        "Planning my trips has never been this easy. The destinations, pricing, and overall experience are simply amazing.",
      name: "Ramesh Adhikari",
      location: "Pokhara, Nepal",
      photo: "https://i.pravatar.cc/150?img=11",
    },
    {
      message:
        "Booking was smooth and secure. The DESHTRIP team supported us throughout our Kathmandu tour.",
      name: "Sita Karki",
      location: "Kathmandu, Nepal",
      photo: "https://i.pravatar.cc/150?img=47",
    },
    {
      message:
        "Our Chitwan jungle safari was perfectly planned. Highly recommended for hassle-free travel.",
      name: "Aayush Shrestha",
      location: "Lalitpur, Nepal",
      photo: "https://i.pravatar.cc/150?img=32",
    },
    {
      message:
        "Affordable packages and excellent service. Our Lumbini visit was peaceful and memorable.",
      name: "Bikash Yadav",
      location: "Birgunj, Nepal",
      photo: "https://i.pravatar.cc/150?img=22",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50 && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    isDragging.current = false;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center overflow-hidden">
 <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
         What our travelers say
        </h2>
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col items-center"
            >
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

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                currentIndex === index
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
