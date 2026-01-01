import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
// import About from "./about";
// import Discover from "../pages/Discover";
// import About from "../pages/About";
// import Contact from "../pages/Contact";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Home />  
      </main>
      <Footer />
    </>
  );
};


export default LandingPage;
