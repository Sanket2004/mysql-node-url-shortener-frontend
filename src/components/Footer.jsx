import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center flex-col justify-center sm:items-start">
            <Typography
              as="span"
              variant="h3"
              className="font-black text-black"
            >
              Go2
            </Typography>
            <Typography variant="small">URL Shortener</Typography>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex gap-2 items-center flex-col justify-center sm:items-end">
          <div className="flex gap-4">
            <Link
              to="/about"
              className="text-gray-600 hover:text-black transition-all text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-black transition-all text-sm"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="text-gray-600 hover:text-black transition-all text-sm"
            >
              Privacy Policy
            </Link>
          </div>
          <Typography
            variant="small"
            className="text-gray-400 font-normal text-xs"
          >
            All rights reserved. Copyright &copy; {new Date().getFullYear()}{" "}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
