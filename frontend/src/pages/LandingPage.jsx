import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Welcome to Travel Platform</h1>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
