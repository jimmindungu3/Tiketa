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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const user = Cookies.get("user");
    setJwtCookie(jwt);
    setUserName(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle dropdown click outside if the mobile menu is not open
      if (!mobileMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      // For mobile menu, only close if clicking outside both the menu and the toggle button
      if (
        mobileMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownVisible, mobileMenuOpen]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("user");
    setJwtCookie(null);
    setUserName(null);
    setDropdownVisible(false);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close the user dropdown when toggling mobile menu
    setDropdownVisible(false);
  };

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-blue py-4 pb-48">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h2 className="text-red-100 font-bold text-3xl">TIKETA</h2>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex text-white font-semibold">
            <Link to={"/"} className="flex items-center mx-4">
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block text-white font-semibold relative">
            {jwtCookie ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="mx-2 flex items-center"
                >
                  <FaUserCircle className="text-3xl mr-2" />
                  {userName && <span>{userName}</span>}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute top-16 left-0 right-0 bg-blue md:hidden z-50 px-4 py-2 shadow-lg"
            >
              <div className="flex flex-col space-y-4 text-white font-semibold">
                <Link
                  to={"/"}
                  className="flex items-center px-4 py-2 hover:bg-blue-700 rounded"
                  onClick={handleMobileLinkClick}
                >
                  <MdEventAvailable className="mr-2" />
                  Events
                </Link>
                <a
                  className="flex items-center px-4 py-2 hover:bg-blue-700 rounded"
                  href="#"
                  onClick={handleMobileLinkClick}
                >
                  <RiMovie2Line className="mr-2" />
                  Movies
                </a>
                <a
                  className="flex items-center px-4 py-2 hover:bg-blue-700 rounded"
                  href="#"
                  onClick={handleMobileLinkClick}
                >
                  <MdFlightTakeoff className="mr-2" />
                  Flights
                </a>
                <a
                  className="flex items-center px-4 py-2 hover:bg-blue-700 rounded"
                  href="#"
                  onClick={handleMobileLinkClick}
                >
                  <MdHotel className="mr-2" />
                  Hotels
                </a>

                {/* Mobile Auth Section */}
                {jwtCookie ? (
                  <div className="border-t border-blue-700 pt-4">
                    <div className="px-4 py-2 flex items-center">
                      <FaUserCircle className="text-3xl mr-2" />
                      {userName && <span>{userName}</span>}
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-700 rounded cursor-not-allowed">
                      Edit Profile
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-blue-700 pt-4 flex flex-col space-y-2">
                    <Link
                      to={"/sign-up"}
                      onClick={handleMobileLinkClick}
                    >
                      <button className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded">
                        Sign Up
                      </button>
                    </Link>
                    <Link to={"/login"} onClick={handleMobileLinkClick}>
                      <button className="w-full text-left px-4 py-2 bg-red-100 rounded">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;