import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters
};

const Events = ({ events, handlePage }) => {
  return events.length === 0 ? (
    <Loader />
  ) : (
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
