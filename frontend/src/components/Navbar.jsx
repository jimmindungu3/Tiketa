import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEventAvailable, MdFlightTakeoff, MdHotel } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

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

  const navigate = useNavigate();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const userName = Cookies.get("userName");
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
      Cookies.remove("userName");
      setUserName(null);
      await axios.post(
        `${API_BASE_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      setDropdownVisible(false);
      setIsMobileMenuOpen(false);
      navigate("/");
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

  const CreateEventButton = () => (
    <Link to={userName ? "/create-event" : "/login"}>
      <button className="mx-2 bg-red-100 py-2 px-4 rounded-md">
        Create Event
      </button>
    </Link>
  );

  const UserButton = ({ onClick, showFullName = false }) => (
    <button
      onClick={onClick}
      className="flex items-center bg-white/10 hover:bg-white/20 rounded-full py-2 px-2 ml-2 transition-colors"
    >
      <FaUserCircle className="text-2xl" />
      <span className="ml-2 text-sm font-medium">
        {userName ? (showFullName ? userName : getInitials(userName)) : ""}
      </span>
    </button>
  );

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
    <div className="bg-blue py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ToastContainer position="top-center" autoClose={3000} />
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
            <div className="flex items-center">
              {userName ? (
                <div className="relative flex items-center">
                  <CreateEventButton />
                  <div className="relative ml-2">
                    <UserButton onClick={toggleDropdown} />
                    {dropdownVisible && (
                      <div
                        ref={dropdownRef}
                        className="z-20 absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg"
                      >
                        <div className="px-4 py-2 border-b border-gray-200">
                          <div className="font-semibold">{userName}</div>
                        </div>
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
                </div>
              ) : (
                <div className="flex items-center">
                  <Link to={"/sign-up"}>
                    <button className="mx-2">Sign Up</button>
                  </Link>
                  <CreateEventButton />
                </div>
              )}
            </div>
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
                    <UserButton showFullName={true} />
                  </div>
                  <CreateEventButton />
                  <div className="block py-2 ml-2 mt-2 hover:bg-blue-700 hover:cursor-not-allowed rounded">
                    Edit Profile
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-left py-2 ml-2 hover:bg-blue-700 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 pt-4 flex flex-col space-y-2">
                  <CreateEventButton />
                  <Link to={"/sign-up"}>
                    <button className="text-left py-2 ml-2 hover:bg-blue-700 rounded">
                      Sign Up
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
