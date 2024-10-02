import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace '/path/to/your/events.json' with the actual path to your JSON data
    axios
      .get("http://localhost:3001/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Slider />
      <EventsSection events={events} />
      <Footer />
    </div>
  );
};

export default Home;
