import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand with custom logo */}
          <div className="flex-shrink-0 flex items-center">
  <Link
    to="/"
    className="flex items-center space-x-2"
    aria-label="SpiceKera Homepage"
  >
    <img
      src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!sw800" // Replace with your actual path
      alt="SpiceKera Logo"
      className="w-10 h-10 rounded-full object-cover"
    />
    <span className="text-white text-xl font-bold tracking-tight font-sans hover:text-blue-200 transition-colors hidden sm:block">
      SpiceKera
    </span>
  </Link>
</div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
        
            <NavLink to="/Admin" label="Admin" />
            <NavLink to="/login" label="User Login" />
            <NavLink to="/ResturantLogin" label="Restaurant" />
            
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800 shadow-xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/Admin" label="Admin" />
            <MobileNavLink to="/login" label="User Login" />
            <MobileNavLink to="/ResturantLogin" label="Restaurant" />
            <div className="mt-4 px-3">
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md">
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable NavLink component for desktop
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-amber-300 transition-colors relative group"
  >
    {label}
    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-400 w-0 group-hover:w-4/5 transition-all duration-300"></span>
  </Link>
);

// Reusable NavLink component for mobile
const MobileNavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-amber-300 hover:bg-blue-700 transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    {label}
  </Link>
);

export default Header;