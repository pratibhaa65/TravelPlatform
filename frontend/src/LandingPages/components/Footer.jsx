import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[minmax(200px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(200px,1fr)] gap-8 justify-between">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-blue-900 text-xl font-bold">DESHTRIP</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your trusted travel companion for discovering beautiful destinations,
            planning memorable journeys, and booking experiences with ease.
          </p>
        </div>

        {/* Follow Us */}
        <div className="space-y-4">
          <h4 className="text-blue-900 font-bold uppercase tracking-wide">
            Follow Us
          </h4>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Facebook", img: "/fb.jpg", link: "https://facebook.com" },
              { name: "Twitter", img: "/twitter.png", link: "https://twitter.com" },
              { name: "Instagram", img: "/insta.jpg", link: "https://instagram.com" },
              { name: "Telegram", img: "/telegram.png", link: "https://telegram.com" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-600 transition"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-9 h-9 mb-1 hover:scale-110 transition"
                />
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="text-blue-900 font-bold uppercase tracking-wide">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-blue-600 cursor-pointer">Why DESHTRIP?</li>
            <li className="hover:text-blue-600 cursor-pointer">Partner with Us</li>
            <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
            <li className="hover:text-blue-600 cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Meet Us */}
        <div className="space-y-4">
          <h4 className="text-blue-900 font-bold uppercase tracking-wide">
            Meet Us
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📞 +977-9800000001</li>
            <li>✉️ info@deshtrip.com</li>
            <li>📍 Kathmandu, Nepal</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center bg-gray-50 text-gray-600 text-sm">
        © 2025 DESHTRIP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
