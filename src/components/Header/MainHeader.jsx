import React from "react";
import { Link } from "react-router-dom";
export default function MainHeader() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-2xl font-bold">AMOL</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 font-bold hover:text-gray-900" to="/">
            Home
          </Link>
          <Link className="mr-5 hover:text-gray-900" to="/about">
            About
          </Link>
          <Link className="mr-5 hover:text-gray-900" to="/contact">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
