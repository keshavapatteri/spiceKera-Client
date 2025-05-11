import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { 
  FiHome, 
  FiMail, 
  FiPhone, 
  FiClock,
  FiMapPin,
  FiEdit2,
  FiUser,
  FiShoppingBag
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ResturantProfile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/restaurantProfile', {
          withCredentials: true,
        });
        setRestaurant(response.data);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <h3 className="font-bold flex items-center gap-2">
            <FiUser className="text-xl" /> Error
          </h3>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 max-w-md">
          <h3 className="font-bold flex items-center gap-2">
            <FiShoppingBag className="text-xl" /> No Profile Found
          </h3>
          <p className="mt-2">We couldn't find any restaurant profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            Restaurant <span className="text-indigo-600">Profile</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage your restaurant information
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 px-6 py-8 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4">
              <FiHome className="text-indigo-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {restaurant.restaurantname}
            </h2>
            
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiMail className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg text-gray-900">{restaurant.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiPhone className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="text-lg text-gray-900">{restaurant.phonenumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiClock className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Working Hours</h3>
                  <p className="text-lg text-gray-900">{restaurant.workingtime}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiMapPin className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-lg text-gray-900">{restaurant.address}</p>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </motion.div>
  );
};