import React from "react";
import { MdEventAvailable } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { MdHotel } from "react-icons/md";


const Navbar = () => {
  return (
    <div className="bg-blue py-4 pb-48">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-red-100 font-bold text-3xl">TIKETA</h2>
          <div className="flex text-white font-semibold">
            <a className="flex items-center mx-4" href="#">
              <MdEventAvailable className="mr-1" />
              Events
            </a>
            <a className="flex items-center mx-4" href="#">
              <RiMovie2Line className="mr-1" />
              Movies
            </a>
            <a className="flex items-center mx-4" href="#">
              <MdFlightTakeoff className="mr-1" />
              Flights
            </a>
            <a className="flex items-center mx-4" href="#">
              <MdHotel className="mr-1" />
              Hotels
            </a>
          </div>
          <div className="text-white font-semibold">
            <button className="mx-2">Sign Up</button>
            <button className="mx-2 bg-red-100 py-2 px-4 rounded-md">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
