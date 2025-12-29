import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">TravelApp</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/packages">Packages</a></li>
          <li><a href="/contacts">Contact Us</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
