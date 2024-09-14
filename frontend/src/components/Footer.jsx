import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="px-4">
      <div className="mx-auto max-w-6xl h-2 my-8 bg-bluegray"></div>
      <div className="mx-auto my-6 max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-bluegray">
        <div>
          <h2 className="text-red-100 font-bold text-xl">TIKETA</h2>
          <div className="text-sm mt-2">
            &copy; {currentYear} TIKETA. All rights reserved.
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div className="text-red-100 font-semibold mb-2 text-lg">Links</div>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Help Center</a>
        </div>
        <div>
          <div className="text-red-100 font-semibold mb-2 text-lg">
            Our Socials
          </div>
          <div className="flex space-x-4">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaSquareXTwitter />
            </a>
            <a href="#">
              <FaInstagramSquare />
            </a>
            <a href="#">
              <FaTiktok />
            </a>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div className="text-red-100 font-semibold mb-2 text-lg">Contact</div>
          <div className="my-2 font-semibold">Physical Location</div>
          <div>Kephanie House off Thika-Garissa Road</div>
          <div>Tel: +254 717 055 495</div>
          <div>email: jimmindungu3@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
