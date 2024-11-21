import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { RiCloseLine, RiMailAddFill, RiMenu4Fill } from "react-icons/ri";
import {
  IoInformation,
  IoInformationCircle,
  IoInformationCircleOutline,
  IoMailOutline,
} from "react-icons/io5";

import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@material-tailwind/react";

function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate(); // Ensure `useNavigate` is correctly imported and used.

  const handleLogout = () => {
    console.log("User logged out");
    logout(); // Perform your logout logic.
    navigate("/"); // Redirect to home or login page after logout.
  };

  return (
    <Navbar
      className="sticky top-0 z-50 bg-white shadow-sm"
      fullWidth
      shadow={true}
    >
      <div className="mx-auto flex items-center justify-between text-gray-800 lg:px-8 lg:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-start flex-col justify-center">
          <Typography as="span" variant="h3" className="font-black text-black">
            Go2
          </Typography>
          <Typography variant="small">URL Shortener</Typography>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Typography
            as="a"
            href="#about"
            variant="small"
            className="text-gray-700 hover:text-black transition-all uppercase font-normal flex justify-center items-center gap-1"
          >
            <IoInformationCircleOutline size={17} />
            About
          </Typography>
          <Typography
            as="a"
            href="#contactus"
            variant="small"
            className="text-gray-700 hover:text-black transition-all uppercase font-normal flex justify-center items-center gap-1"
          >
            <IoMailOutline size={17} />
            Contact Us
          </Typography>
          <Button
            size="md"
            onClick={() => navigate("/url/shorten")} // Ensure `navigate` is invoked here.
          >
            Shorten Link
          </Button>
          <Button size="md" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          className="lg:hidden text-gray-600 hover:text-black focus:outline-none focus:ring-2 ring-gray-300"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <RiCloseLine size={25} className="" />
          ) : (
            <RiMenu4Fill size={25} className="text-black" />
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={openNav}>
        <div className="flex flex-col gap-4 py-2 pt-8 lg:hidden">
          <Typography
            as="a"
            href="#about"
            variant="small"
            className="text-gray-700 hover:text-black transition-all uppercase font-normal flex items-center justify-start gap-1"
          >
            <IoInformationCircleOutline size={20} />
            About
          </Typography>
          <Typography
            as="a"
            href="#contactus"
            variant="small"
            className="text-gray-700 hover:text-black transition-all uppercase font-normal flex items-center justify-start gap-1"
          >
            <IoMailOutline size={17} />
            Contact Us
          </Typography>
          <div className="flex flex-col gap-4">
            <Button
              size="md"
              className="w-full"
              onClick={() => navigate("/url/shorten")} // Invoke `navigate` correctly here too.
            >
              Shorten Link
            </Button>
            <Button size="md" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
