import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 ">

      <section style={{ background: "#fff", padding: "70px 0px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "50px",
          }}
        >
          <div>
            <h2 className="text-blue-900 font-bold">DESHTRIP</h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Your trusted travel companion for discovering beautiful destinations,
              planning memorable journeys, and booking experiences with ease and
              confidence.
            </p>


          </div>

          <div>
            <h4 className="text-blue-900 font-bold">FOLLOW US</h4>
            <div className="flex gap-4 mt-2">
              <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/fb.jpg" alt="Facebook" className="w-6 h-6" />
              </a>Facebook</p>
              <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
              </a>Twitter</p>
              <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/insta.jpg" alt="Instagram" className="w-6 h-6" />
              </a>Instagram</p>
              <p><a href="https://telegram.com" target="_blank" rel="noopener noreferrer">
                <img src="/telegram.png" alt="Telegram" className="w-6 h-6" />
              </a>Telegram</p>
            </div>
          </div>


          <div>
            <h4 className="text-blue-900 font-bold">CONTACT</h4>
            <p>Why DESHTRIP?</p>
            <p>Partner with us</p>
            <p>FAQ’s</p>
            <p>Blog</p>
          </div>

          <div>
            <h4 className="text-blue-900 font-bold">MEET US</h4>
            <p>+977-9800000001</p>
            <p>info@deshtrip.com</p>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>
      </section>

      <div className="text-center py-4 text-sm">
        <p>&copy; 2025 TravelApp. All rights reserved.</p>
      </div>
    </footer>
  );
};





export default Footer;
