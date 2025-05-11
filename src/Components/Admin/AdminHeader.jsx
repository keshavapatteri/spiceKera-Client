import React from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';

const AdminHeader = () => {
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/admin/adminlogout');
      window.location.href = '/admin';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl py-3 px-6 fixed top-0 left-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Branding */}
        <Link to="/admindashboard" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center bg-amber-500 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tighter">
            <span className="text-amber-400">Spice</span> <span className="text-gray-300">Kera</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/admindashboard" label="Dashboard" />
          <NavLink to="/allProducts" label="Menu" />
          <NavLink to="/getalluser" label="Users" />
          <NavLink to="/allRestaurant" label="Branches" />
          <NavLink to="/allReview" label="Reviews" />
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-4 py-2 bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white rounded-md transition-all duration-200 group"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 p-2 rounded-lg hover:bg-gray-700 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors duration-200 group"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default AdminHeader;