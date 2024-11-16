import React, { useState, useEffect } from "react";

const Slider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(true); // New state for animation
  const images = [
    "https://res.cloudinary.com/jamesndungu/image/upload/v1726302607/zavqakmbxremcxtxocwe_zzh2sv.jpg",
    "https://res.cloudinary.com/jamesndungu/image/upload/v1726302607/whn95dkscxeoibyjeouq_nl6ago.jpg",
    "https://res.cloudinary.com/jamesndungu/image/upload/v1726302606/cbtjokdmkbhrhoti4lju_e6p9kr.jpg",
    "https://res.cloudinary.com/jamesndungu/image/upload/v1726302606/mts5wyk7wmxkabqukwox_rwnnfw.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(false); // Trigger animation
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % images.length // Wrap around at the end
      );
    }, 5000); // 4 seconds in milliseconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images.length]); // Only run when images array changes

  useEffect(() => {
    setAnimate(true); // Reset animation
  }, [currentImageIndex]); // Reset animation when image changes

  const handlePrevClick = () => {
    setAnimate(false); // Trigger animation
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setAnimate(false); // Trigger animation
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="slider-wrapper relative overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Image Slider"
          className={`mx-auto h-96 w-full rounded-lg shadow-md transition duration-500 ease-in-out ${
            animate ? "slider-image" : ""
          }`}
        />
        <button
          type="button"
          className="absolute top-1/2 left-0 bg-gray-500 hover:bg-gray-700 opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full p-2 m-2 transition duration-500 ease-in-out transform -translate-y-1/2 hover:scale-110"
          onClick={handlePrevClick}
        >
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 12L15 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-0 bg-gray-500 hover:bg-gray-700 opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full p-2 m-2 transition duration-500 ease-in-out transform -translate-y-1/2 hover:scale-110"
          onClick={handleNextClick}
        >
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16L16 12L9 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
