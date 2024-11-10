import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { MdEventAvailable, MdFlightTakeoff, MdHotel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [jwtCookie, setJwtCookie] = useState(null);
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const user = Cookies.get("user");
    setJwtCookie(jwt);
    setUserName(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("user");
    setJwtCookie(null);
    setUserName(null);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="bg-blue py-4 pb-48">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h2 className="text-red-100 font-bold text-3xl">TIKETA</h2>
          </Link>
          <div className="flex text-white font-semibold">
            <Link to={"/"} className="flex items-center mx-4" href="#">
              <MdEventAvailable className="mr-1" />
              Events
            </Link>
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
                  <FaUserCircle className="text-3xl mr-2" />{" "}
                  {userName && <span>{userName}</span>}{" "}
                </button>
                {dropdownVisible && (
                  <div
                    ref={dropdownRef}
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