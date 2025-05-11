import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/admin/allCategories');
        setCategories(response.data); // Make sure your backend sends an array
      } catch (error) {
        console.error('Error fetching categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What's on your mind today?
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Explore our delicious categories
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex space-x-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-16 mt-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex space-x-8 pb-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={category.imageUrl}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-blue-100 transition-all duration-300"
                      alt={category.name}
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  <p className="mt-3 text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Gradient fade effect */}
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};
