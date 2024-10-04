import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BuyTicket = ({ events }) => {
  const { id } = useParams();
  const selectedEvent = events.find((event) => event.id === id);

  const [regularCount, setRegularCount] = useState(0);
  const [vipCount, setVipCount] = useState(0);

  // Assuming prices are part of the selectedEvent object
  const ticketPrices = {
    vip: selectedEvent?.vip || 1500, // Using event properties for prices
    regular: selectedEvent?.regular || 1000,
  };

  const handleRegularChange = (event) => {
    const count = parseInt(event.target.value, 10) || 0;
    setRegularCount(count);
  };

  const handleVipChange = (event) => {
    const count = parseInt(event.target.value, 10) || 0;
    setVipCount(count);
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-6xl my-12 p-4">
        <div className="rounded-md shadow-lg overflow-hidden">
          {selectedEvent ? (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Event Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedEvent.title}
                </h1>
                <p className="text-red-100 text-lg font-semibold mb-2">
                  {selectedEvent.date}
                </p>
                <p className="text-bluegray mb-4">{selectedEvent.venue}</p>
                <p className="text-gray-700 mb-6">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Event Image */}
              <div className="h-64 w-full object-cover p-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="h-full w-full object-cover rounded-t-md"
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 font-bold text-xl p-6">
              Event not found
            </p>
          )}

          {/* Ticket Selection and Payment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 p-6">
            <div className="flex flex-col">
              <p className="font-bold text-2xl mb-2 text-red-100">
                Pick Your Tickets
              </p>
              <label className="text-gray-900 font-semibold mb-2">
                Regular: Ksh. {ticketPrices.regular}
              </label>
              <input
                type="number"
                min="0"
                value={regularCount}
                onChange={handleRegularChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 mb-4"
              />

              <label className="text-gray-900 font-semibold mb-2">
                VIP: Ksh. {ticketPrices.vip}
              </label>
              <input
                type="number"
                min="0"
                value={vipCount}
                onChange={handleVipChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 mb-4"
              />
              <p className="mt-2 font-bold text-xl text-safaricomgreen">
                Total: Ksh
              </p>
            </div>

            {/* M-Pesa Payment */}
            <div className="bg-safaricomgreen text-white p-6 rounded-md">
              <h2 className="text-2xl font-bold mb-4">Lipa Na M-Pesa</h2>
              <p className="mb-4">
                To complete your purchase, please enter your Safaricom number
                and confirm the payment.
              </p>
              <div className="mb-6">
                <label className="block font-semibold mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0712345678"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <button className="mt-4 w-full py-2 px-6 rounded-md shadow-md font-bold text-lg bg-white text-red-100">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
