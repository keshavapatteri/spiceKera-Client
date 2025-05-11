import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { axiosInstance } from '../../Config/AxiosInstance';

export const ResturantFooter = () => {
  const currentYear = new Date().getFullYear();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axiosInstance.get('/restaurant/restaurantProfile', {
            withCredentials: true,
          });
          console.log(response);
          
          setRestaurant(response.data);
        } catch (err) {
          setError('Error fetching profile');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);
  
   
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
          <h3 className="text-xl font-bold text-yellow-300">🍽️ {restaurant?.restaurantname || "Our Restaurant"}</h3>

            <p className="text-sm">
              Serving delicious meals since 2010. Our passion for food and exceptional service makes us your perfect dining destination.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <FaYelp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-300 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/menu" className="hover:text-yellow-300 transition-colors">Our Menu</a></li>
              <li><a href="/reservations" className="hover:text-yellow-300 transition-colors">Reservations</a></li>
              <li><a href="/gallery" className="hover:text-yellow-300 transition-colors">Photo Gallery</a></li>
              <li><a href="/events" className="hover:text-yellow-300 transition-colors">Events</a></li>
              <li><a href="/careers" className="hover:text-yellow-300 transition-colors">Careers</a></li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-300 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn className="mt-1 mr-2 text-yellow-300" />
                <span>{restaurant?.address|| "123 Food Street, Culinary City, CC 12345"}</span>
              </li>        
              


              <li className="flex items-center">
                <MdPhone className="mr-2 text-yellow-300" />
                <span>{restaurant?.phonenumber|| "(123) 456-7890"}</span>
              </li>           
              <li className="flex items-center">
                <MdEmail className="mr-2 text-yellow-300" />
                <span>{restaurant?.email|| "info@restaurantemail.com"}</span>            

              </li>
              <li className="flex items-center">
  <span className="mr-2 text-yellow-300 font-bold">🕒</span>
  <span>{restaurant?.workingtime || "Mon - Sun: 9:00 AM - 10:00 PM"}</span>
</li>
            </ul>
          </div>

          
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {currentYear} Restaurant Name. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-sm hover:text-yellow-300 transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-sm hover:text-yellow-300 transition-colors">Terms of Service</a>
              <a href="#sitemap" className="text-sm hover:text-yellow-300 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};