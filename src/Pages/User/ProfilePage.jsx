import React, { useEffect, useState } from 'react';

import { axiosInstance } from '../../Config/AxiosInstance';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaCheck } from 'react-icons/fa';
export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile', {
          withCredentials: true
        });
        console.log(res);

        setProfile(res.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);


  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto ">
      <div className="max-w-md mx-auto p-6 rounded-3xl shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 mt-10 border border-gray-100 dark:border-gray-700 ">

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4 ">
            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center ">
              <FaUser className="text-3xl text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-full">
              <FaCheck className="text-xs" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            User Profile
          </h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
            <div className="flex-shrink-0 p-3 mr-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
              <FaUser className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
              <p className="font-medium">{profile?.name || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
            <div className="flex-shrink-0 p-3 mr-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
              <FaEnvelope className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
              <p className="font-medium">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
            <div className="flex-shrink-0 p-3 mr-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
              <FaMapMarkerAlt className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
              <p className="font-medium">{profile?.address || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
            <div className="flex-shrink-0 p-3 mr-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
              <FaPhone className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contact Number</p>
              <p className="font-medium">{profile?.phonenumber || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
            <div className="flex-shrink-0 p-3 mr-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
              <FaCalendarAlt className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
              <p className="font-medium">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'Unknown date'}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      );
};

