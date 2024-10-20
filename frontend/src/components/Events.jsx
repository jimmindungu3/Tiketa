import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters
};

const Events = ({ events, loading }) => {
  // Ensure the return based on the loading state
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl min-w-min mx-auto mt-12 p-4">
      <h1 className="text-3xl font-bold text-red-100 text-center mb-12">
        Happening Soon
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {events.map((event) => (
          <div
            key={event._id}
            className="rounded-md overflow-hidden shadow-lg flex flex-col h-full"
          >
            <img
              className="w-full h-64 object-cover rounded-md"
              src={event.image}
              alt={event.title}
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <p className="text-red-100 text-sm mb-2 font-semibold">
                  {event.date}
                </p>
                <p className="text-bluegray mb-4">{event.venue}</p>
              </div>
              <button className="bg-red-100 py-2 text-center text-white font-semibold rounded-md mt-auto">
                <Link to={`/buy-ticket/${slugify(event.title)}`}>
                  BUY TICKET
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
