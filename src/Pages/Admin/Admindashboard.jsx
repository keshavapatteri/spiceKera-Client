import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';

const quickLinks = [
  { title: 'Menu Management', path: '/allProducts', icon: '🍔', bg: 'bg-blue-500 hover:bg-blue-600' },
  { title: 'Customer Accounts', path: '/getalluser', icon: '👤', bg: 'bg-green-500 hover:bg-green-600' },
  { title: 'Restaurants', path: '/allRestaurant', icon: '🏨', bg: 'bg-purple-500 hover:bg-purple-600' },
  { title: 'Customer Reviews', path: '/allReview', icon: '⭐', bg: 'bg-amber-500 hover:bg-amber-600' },
  { title: 'Add Categories', path: '/categories', icon: '🗂️', bg: 'bg-blue-500 hover:bg-blue-600' }
];

export const Admindashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Users', value: 0, icon: '👥', trend: '↑ 12%', color: 'bg-blue-100 text-blue-800' },
    { title: 'Total Restaurant', value: 0, icon: '🍽️', trend: '↓ 3%', color: 'bg-green-100 text-green-800' },
    { title: 'Total Product', value: 0, icon: '🍕', trend: '↑ 24%', color: 'bg-purple-100 text-purple-800' },
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productCount = await axiosInstance.get('/admin/ProductCount');
        const userCount = await axiosInstance.get('/admin/UserCount');
        const restaurantCount = await axiosInstance.get('/admin/RestaurantCount');

        setStats([
          { title: 'Total Users', value: userCount.data.totalCount, icon: '👥', trend: '↑ 12%', color: 'bg-blue-100 text-blue-800' },
          { title: 'Total Restaurant', value: restaurantCount.data.totalCount, icon: '🍽️', trend: '↓ 3%', color: 'bg-green-100 text-green-800' },
          { title: 'Total Product', value: productCount.data.totalCount, icon: '🍕', trend: '↑ 24%', color: 'bg-purple-100 text-purple-800' },
        ]);
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-20">
      {/* Top Navbar with food-themed design */}
   

      {/* Main Dashboard with food imagery */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Welcome Banner with food background */}
        <div className="relative mb-10 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-90"></div>
          <div className="relative z-10 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin!</h2>
            <p className="text-orange-100">Manage your restaurant operations efficiently</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Food banner" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Stats Cards with food icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 ${stat.color.replace('bg-', 'border-')} flex items-center`}>
              <div className="mr-4 p-3 rounded-full bg-opacity-20 bg-blue-500">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend} from last week</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Section with food-themed cards */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickLinks.map((link, index) => (
              <Link 
                to={link.path} 
                key={index}
                className={`${link.bg} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="text-3xl mb-3 z-10">{link.icon}</span>
                <h3 className="text-lg font-medium z-10">{link.title}</h3>
              </Link>
            ))}
          </div>
        </div>

       
      </main>
    </div>
  );
};