import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYelp, FaTripadvisor } from "react-icons/fa";
import { MdOutlineDeliveryDining, MdOutlineSupportAgent } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export const UserFooter = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", name: "Facebook" },
    { icon: <FaInstagram />, url: "#", name: "Instagram" },
    { icon: <FaTwitter />, url: "#", name: "Twitter" },
    { icon: <FaYelp />, url: "#", name: "Yelp" },
    { icon: <FaTripadvisor />, url: "#", name: "TripAdvisor" }
  ];

  const quickLinks = [
    { path: "/about", label: "About Us" },
    { path: "/AllProduct", label: "Our Menu" },
    
    { path: "/contact", label: "Contact" },
  
  ];

  const legalLinks = [
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms & Conditions" },
  
  ];

  const features = [
    { icon: <MdOutlineDeliveryDining size={24} />, text: "Fast Delivery" },
    { icon: <IoFastFoodOutline size={24} />, text: "Fresh Ingredients" },
    { icon: <MdOutlineSupportAgent size={24} />, text: "24/7 Support" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 pt-12 pb-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-red-500 mb-3">{feature.icon}</div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100">{feature.text}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center mb-4">
              <img
                 src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!sw800" 
                 alt="SpiceKera Logo" 
                 className="h-10 w-10 object-cover rounded-full"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              SpiceKera
              </span>
            </div>
            <p className="text-center lg:text-left text-gray-600 dark:text-gray-400 mb-4">
              Authentic flavors crafted with passion since 2005.
            </p>
            <div className="flex space-x-4 text-lg">
              {socialLinks.slice(0, 3).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -3, color: "#ef4444" }}
                  className="hover:text-red-500 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={link.path} 
                    className="hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={link.path} 
                    className="hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              <p>123 Food Street</p>
              <p>New Delhi, 110001</p>
              <p className="mt-2">Phone: +91 98765 43210</p>
              <p>Email: info@SpiceKera.com</p>
            </address>
            <div className="flex justify-center lg:justify-start space-x-4 mt-4 text-lg">
              {socialLinks.slice(3).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -3, color: "#ef4444" }}
                  className="hover:text-red-500 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} <span className="font-medium text-red-500">SpiceKera</span>. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};