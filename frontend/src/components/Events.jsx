import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters
};

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const Events = ({ events, handlePage }) => {
  return events.length === 0 ? (
    <Loader />
  ) : (
    <div className="max-w-6xl min-w-min mx-auto mt-12 p-4">
      <h1 className="text-3xl font-bold text-red-100 text-center mb-12">
        Happening Soon
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="rounded-md overflow-hidden shadow-lg flex flex-col h-full"
          >
            <img
              className="h-32 w-full object-cover md:h-64 t-rounded-lg"
              src={event.image}
              alt={event.title}
            />
            <div className="p-2 md:p-4 flex flex-col flex-grow justify-between">
              <div className="flex-grow">
                <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <p className="text-red-100 text-xs md:text-sm mb-2 font-semibold">
                  {formatDate(event.date)} at {formatTime(event.date)}
                </p>
                <p className="text-sm md:text-base text-bluegray mb-2 md:mb-4">
                  {event.venue}
                </p>
              </div>
              <button className="bg-red-100 py-2 text-sm md:text-base text-center text-white font-semibold rounded-md mt-auto">
                <Link to={`/buy-ticket/${slugify(event.title)}`}>
                  BUY TICKET
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center space-x-8 text-sm font-semibold ">
        <button
          onClick={() => handlePage(1)}
          className="py-2 px-4 bg-blue bg-opacity-96 text-gray-200 rounded-full"
        >
          1
        </button>
        <button
          onClick={() => handlePage(2)}
          className="py-2 px-4 bg-blue bg-opacity-96 text-gray-200 rounded-full"
        >
          2
        </button>
        <button
          onClick={() => handlePage(3)}
          className="py-2 px-4 bg-blue bg-opacity-96 text-gray-200 rounded-full"
        >
          3
        </button>
      </div>
    </div>
  );
};

export default Events;