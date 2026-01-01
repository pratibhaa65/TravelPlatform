import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import About from "./about";
import Partners from "./partners";


const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Partners />
      </main>
      <Footer />
    </>
  );
};


export default LandingPage;
