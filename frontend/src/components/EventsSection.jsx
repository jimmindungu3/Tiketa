import React, { useState, useEffect } from "react";
import axios from "axios";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace '/path/to/your/events.json' with the actual path to your JSON data
    axios
      .get("http://localhost:3000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-4">
      <h1 className="text-3xl font-bold text-red-100 text-center mb-12">
        Happening Soon
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-md overflow-hidden shadow-lg flex flex-col"
          >
            <img
              className="w-full h-64 object-cover rounded-md" /* Adjust height to 64 */
              src={event.image}
              alt={event.title}
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <p className="text-red-100 text-sm mb-2 font-semibold">
                  {event.date}
                </p>
                <p className="text-bluegray mb-4">{event.venue}</p>
              </div>
              <button className="bg-red-100 py-2 text-center text-white font-semibold rounded-md">
                BUY TICKET
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
