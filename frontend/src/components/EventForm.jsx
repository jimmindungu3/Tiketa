import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

const EventForm = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [regular, setRegular] = useState("");
  const [vip, setVip] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/events`,
        {
          image,
          title,
          date,
          description,
          venue,
          regular,
          vip,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
    }
  };

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  return (
    <div className="bg-blue text-white p-8 max-w-2xl mx-auto my-16 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Banner */}
        <div>
          <label htmlFor="image" className="block text-sm font-bold mb-2">
            Select Event Banner
          </label>
          <input
            required
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            className="block w-full text-gray-500 bg-white file:bg-gray-600 file:text-white file:px-4 file:py-2 file:mr-4 file:rounded-md file:border-none border border-transparent focus:border-red-200 rounded-lg focus:outline-none"
          />
        </div>

        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Event Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200  text-gray-950 focus:outline-none"
            placeholder="Enter event title"
          />
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-bold mb-2">
            Select Event Date
          </label>
          <input
            required
            type="datetime-local"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200  text-gray-950 focus:outline-none"
          />
        </div>

        {/* Event Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Event Description
          </label>
          <textarea
            required
            name="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200 text-gray-950 focus:outline-none"
            placeholder="Write a brief description"
          ></textarea>
        </div>

        {/* Event Venue */}
        <div>
          <label htmlFor="venue" className="block text-sm font-bold mb-2">
            Event Venue
          </label>
          <input
            required
            type="text"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200 text-gray-950 focus:outline-none"
            placeholder="Enter event venue"
          />
        </div>

        {/* Regular Ticket Price */}
        <div>
          <label htmlFor="regular" className="block text-sm font-bold mb-2">
            Regular Ticket Price (KES)
          </label>
          <input
            required
            type="number"
            name="regular"
            value={regular}
            onChange={(e) => setRegular(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200 text-gray-950 focus:outline-none"
            placeholder="Enter amount"
          />
        </div>

        {/* VIP Ticket Price */}
        <div>
          <label htmlFor="vip" className="block text-sm font-bold mb-2">
            VIP Ticket Price (KES)
          </label>
          <input
            required
            type="number"
            name="vip"
            value={vip}
            onChange={(e) => setVip(e.target.value)}
            className="w-full p-2 rounded-lg border border-transparent focus:border-red-200 text-gray-950 focus:outline-none"
            placeholder="Enter amount"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-red-100 hover:bg-red-200 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
