import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import About from "./about";
import Partners from "./partners";
import Testimonials from "./testimonials";

const LandingPage = () => {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Home />
        <About />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
