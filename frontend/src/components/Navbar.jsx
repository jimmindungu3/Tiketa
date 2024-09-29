import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { MdEventAvailable, MdFlightTakeoff, MdHotel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [jwtCookie, setJwtCookie] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    const cookie = Cookies.get("jwt");
    setJwtCookie(cookie); // Update state when the cookie is found
  }, []); // Runs only once after component mounts

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    Cookies.remove("jwt"); // Remove the JWT cookie
    setJwtCookie(null); // Update state to reflect the logout
    setDropdownVisible(false); // Hide the dropdown
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  return (
    <div className="bg-blue py-4 pb-48">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h2 className="text-red-100 font-bold text-3xl">TIKETA</h2>
          </Link>
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
          <div className="text-white font-semibold relative">
            {jwtCookie ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="mx-2 flex items-center"
                >
                  <FaUserCircle className="text-3xl" />
                </button>
                {dropdownVisible && (
                  <div
                    ref={dropdownRef} // Attach ref to the dropdown
                    className="z-20 absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg"
                  >
                    <div className="block px-4 py-2 hover:bg-gray-200 hover:cursor-not-allowed hover:rounded-md">
                      Edit Profile
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link to={"/sign-up"}>
                  <button className="mx-2">Sign Up</button>
                </Link>
                <Link to={"/login"}>
                  <button className="mx-2 bg-red-100 py-2 px-4 rounded-md">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
