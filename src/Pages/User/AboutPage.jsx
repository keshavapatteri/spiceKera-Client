import React from 'react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 ">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl p-8 md:p-12 mt-10 ">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 mt-25" >About Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="font-semibold text-indigo-600">Kamal Restaurant</span>, your go-to destination for discovering and ordering delicious meals from top restaurants around Chhindwara!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Kamal Restaurant, our mission is to connect people with their favorite food quickly and conveniently. Whether you’re craving biryani, pizza, or something sweet, we’ve got you covered with a wide selection of restaurants.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Fast delivery with real-time tracking</li>
              <li>Exclusive discounts & offers</li>
              <li>Top-rated restaurants & food items</li>
              <li>Easy-to-use and secure platform</li>
            </ul>
          </div>

          {/* Right image or branding section */}
          <div className="flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="About FoodDash"
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Thank you for being a part of the FoodDash family. We’re here to serve happiness – one bite at a time! 🍔🍕🍜
          </p>
        </div>
      </div>
    </div>
  );
};
