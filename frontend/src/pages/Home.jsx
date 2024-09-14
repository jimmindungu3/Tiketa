import React from "react";
import Navbar from "../components/Navbar";
import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Home;
