import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const BuyTicket = ({ events }) => {
  const { title } = useParams(); // Get the slugified title from URL
  const [regularCount, setRegularCount] = useState(0);
  const [vipCount, setVipCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [phoneError, setPhoneError] = useState(""); // Phone number error state
  const [ticketError, setTicketError] = useState(""); // Ticket selection error state

  // Find the event by matching the slugified title
  const selectedEvent = events.find((event) => slugify(event.title) === title);
  const eventID = selectedEvent?._id;

  const handleRegularChange = (event) => {
    const count = parseInt(event.target.value) || 0;
    setRegularCount(count);
  };

  const handleVipChange = (event) => {
    const count = parseInt(event.target.value) || 0;
    setVipCount(count);
  };

  const handleBuyTicket = async (e) => {
    e.preventDefault();

    let hasError = false; // Flag to check if there is any error

    // Reset error messages
    setPhoneError("");
    setTicketError("");

    // Validate phone number
    if (!phoneNumber) {
      setPhoneError("Please provide your phone number.");
      hasError = true;
    }

    // Validate ticket selection
    if (regularCount === 0 && vipCount === 0) {
      setTicketError("Please select at least one ticket category.");
      hasError = true;
    }

    if (hasError) {
      return; // Stop if there are any errors
    }

    // Clear errors if everything is valid
    setPhoneError("");
    setTicketError("");

    axios
      .post(
        `${API_BASE_URL}/stk-push`,
        {
          phone: phoneNumber,
          regularCount,
          vipCount,
          eventID,
        },
        { withCredentials: true }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl mt-36 p-4">
        <div className="rounded-md shadow-lg overflow-hidden">
          {selectedEvent ? (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Event Image and Details */}
              <div className="p-6 max-w-lg mx-auto">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="h-64 w-full object-top rounded-md mb-6"
                />
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

              {/* Ticket Selection and Payment */}
              <div className="p-6 bg-gray-50 max-w-lg mx-auto">
                <div className="flex flex-col mb-6">
                  <p className="font-bold text-2xl mb-4 text-red-100">
                    Pick Your Tickets
                  </p>

                  {/* Regular Ticket */}
                  <label className="text-gray-900 font-semibold mb-2">
                    Regular: Ksh. {selectedEvent.regular}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={regularCount}
                    onChange={handleRegularChange}
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 mb-2"
                  />

                  {/* VIP Ticket */}
                  <label className="text-gray-900 font-semibold mb-2">
                    VIP: Ksh. {selectedEvent.vip}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vipCount}
                    onChange={handleVipChange}
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 mb-4"
                  />
                  {/* Ticket Error */}
                  {ticketError && (
                    <p className="text-red-600 text-md font-semibold animate-blink mb-4">
                      {ticketError}
                    </p>
                  )}

                  {/* Show total to pay */}
                  <p className="mt-2 font-bold text-xl text-safaricomgreen">
                    Total: Ksh.{" "}
                    {regularCount * parseInt(selectedEvent.regular) +
                      vipCount * parseInt(selectedEvent.vip)}
                  </p>
                </div>

                {/* M-Pesa Payment Section */}
                <div className="bg-safaricomgreen text-white p-6 rounded-md">
                  <h2 className="text-2xl font-bold mb-4">Lipa Na M-Pesa</h2>
                  <p className="mb-4">
                    To complete your purchase, please enter your Safaricom
                    number and confirm the payment.
                  </p>

                  {/* Phone Number */}
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      pattern="[0-9]*"
                      placeholder="e.g. 0712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 text-gray-950"
                    />
                    {/* Phone Error */}
                    {phoneError && (
                      <p className="text-md font-semibold text- animate-blink mt-2">
                        {phoneError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleBuyTicket}
                    className="mt-4 w-full py-2 px-6 rounded-md shadow-md font-bold text-lg bg-white text-red-100"
                  >
                    PAY
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 font-bold text-xl p-6">
              Event not found
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyTicket;
