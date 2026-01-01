import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import About from "./about";
import Partners from "./partners";


const LandingPage = () => {
  return (
    <div className="px-28 ">
      <Header />
      <main>
        <Home />
        <About />
        <Partners />
      </main>
      <Footer />
      </div>
  
  );
};


export default LandingPage;
