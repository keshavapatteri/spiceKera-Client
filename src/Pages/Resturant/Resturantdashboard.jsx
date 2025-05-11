import React from 'react';

export const Resturantdashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      
      {/* --- Header with Animated Gradient & Subtle Floating Elements --- */}
      <div className="mb-10 text-center relative overflow-hidden rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        {/* Floating decorative dots (optional) */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-100/30 dark:bg-green-900/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
          Welcome to Restaurant Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
          Here’s a quick overview of today’s activity. Manage your restaurant seamlessly.
        </p>
      </div>

      {/* --- Feature Cards Grid (Enhanced) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">

        {/* **Card 1: Add Product** */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Subtle animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/0 dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon with pulse animation */}
            <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center group-hover:animate-pulse">
              <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Add Product</h3>
            
            <a 
              href="/AddProduct" 
              className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105"
            >
              Add New
            </a>
          </div>
        </div>

        {/* **Card 2: Get All Products** */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-white/0 dark:from-green-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Get All Products</h3>
            
            <a 
              href="/ResturantBygetall" 
              className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
            >
              View All
            </a>
          </div>
        </div>

        {/* **Card 3: Order History** */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-white/0 dark:from-amber-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-600 dark:text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Order History</h3>
            
            <a 
              href="/ResturantByOrders" 
              className="inline-block px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
            >
              View Orders
            </a>
          </div>
        </div>

       

      </div>
    </div>
  );
};