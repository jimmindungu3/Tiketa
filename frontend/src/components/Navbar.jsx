import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdEventAvailable, MdFlightTakeoff, MdHotel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownVisible]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userName");
      setUserName(null)
      await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
      setDropdownVisible(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <div className="bg-blue py-4 pb-48"> 
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h2 className="text-red-100 font-bold text-3xl">TIKETA</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex text-white font-semibold">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Auth Section */}
          <div className="hidden md:block text-white font-semibold relative">
            {userName ? (
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute left-0 right-0 bg-blue mt-4 px-4 py-2 shadow-lg text-white font-semibold z-50"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks />
              {userName ? (
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center mb-4">
                    <FaUserCircle className="text-3xl mr-2" />
                    {userName && <span>{userName}</span>}
                  </div>
                  <div className="block py-2 hover:bg-blue-700 hover:cursor-not-allowed rounded">
                    Edit Profile
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 hover:bg-blue-700 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 pt-4 flex flex-col space-y-2">
                  <Link to={"/sign-up"}>
                    <button className="w-full py-2 hover:bg-blue-700 rounded">
                      Sign Up
                    </button>
                  </Link>
                  <Link to={"/login"}>
                    <button className="w-full bg-red-100 py-2 rounded">
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
  );
};

export default Navbar;
