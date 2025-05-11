import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYelp, FaTripadvisor } from "react-icons/fa";
import { MdOutlineDeliveryDining, MdOutlineRestaurant } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-gray-100 pt-12 pb-6 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Restaurant Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-700 font-bold text-xl mr-3">
                <span className="font-serif italic">KR</span>
              </div>
              <h2 className="text-xl font-bold">SpiceKera</h2>
            </div>
            <p className="text-sm text-gray-300 text-center md:text-left mb-4">
              Authentic cuisine with modern flair. Established in 2005, we bring you the finest dining experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition duration-300">
                <FaYelp size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition duration-300">
                <FaTripadvisor size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-400 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="/menu" className="text-sm hover:text-amber-400 transition duration-300 flex items-center">
                  <MdOutlineRestaurant className="mr-2" /> Menu
                </a>
              </li>
              <li>
                <a href="/reservations" className="text-sm hover:text-amber-400 transition duration-300 flex items-center">
                  <IoTimeOutline className="mr-2" /> Reservations
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-sm hover:text-amber-400 transition duration-300 flex items-center">
                  <MdOutlineDeliveryDining className="mr-2" /> Delivery
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-sm hover:text-amber-400 transition duration-300">
                  Photo Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-400 pb-2">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li className="flex justify-between">
                <span>Monday - Thursday:</span>
                <span className="text-amber-400">11am - 10pm</span>
              </li>
              <li className="flex justify-between">
                <span>Friday - Saturday:</span>
                <span className="text-amber-400">11am - 11pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-amber-400">10am - 9pm</span>
              </li>
              <li className="pt-2 text-xs text-gray-400">
                *Kitchen closes 30 minutes before closing
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-400 pb-2">Contact Us</h3>
            <address className="not-italic text-sm text-center md:text-left">
              <p className="mb-2">123 Gourmet Avenue</p>
              <p className="mb-2">Foodie District, NY 10001</p>
              <p className="mb-4">United States</p>
              <p className="mb-1">
                <a href="tel:+11234567890" className="hover:text-amber-400 transition duration-300">
                  ☎ +1 (123) 456-7890
                </a>
              </p>
              <p>
                <a href="mailto:info@SpiceKera.com" className="hover:text-amber-400 transition duration-300">
                  ✉ info@SpiceKera.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} SpiceKera. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs">
            <a href="/privacy" className="hover:text-amber-400 transition duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-amber-400 transition duration-300">Terms of Service</a>
            <a href="/sitemap" className="hover:text-amber-400 transition duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;