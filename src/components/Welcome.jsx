import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Welcome = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, [])

  return (
    <h1 data-aos="zoom-in-up" className="fw-bold text-center text-white d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", fontSize: "70px" }}>Welcome to WordWizard!</h1>
  );
};

export default Welcome;
