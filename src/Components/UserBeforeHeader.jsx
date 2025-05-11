
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, X, ShoppingCart, User, Utensils, Home, Phone, ListOrdered } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const UserBeforeHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
  
    const navItems = [
      { path: "/home", label: "Home", icon: <Home size={18} /> },
      { path: "/AllProduct", label: "Menu", icon: <Utensils size={18} /> },
      { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
      { path: "/Profile", label: "Profile", icon: <User size={18} /> },
      { path: "/Allorders", label: "Orders", icon: <ListOrdered size={18} /> },
      { path: "/Cartpageeee", label: "Cart", icon: <ShoppingCart size={18} /> },
    ];
  
    return (
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-white dark:bg-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <img 
                src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!sw800" 
                alt="SpiceKera Logo" 
                className="h-10 w-10 object-cover rounded-full"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              SpiceKera
              </span>
            </motion.div>
  
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  whileHover={{ y: -2 }}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.a>
              ))}
             
            </nav>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-red-500 focus:outline-none"
                aria-expanded="false"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    whileHover={{ x: 5 }}
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </motion.a>
                ))}
              
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };
