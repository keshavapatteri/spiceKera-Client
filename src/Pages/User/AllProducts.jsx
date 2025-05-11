
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaSearch, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const goToItemPage = (id) => {
    navigate(`/Iteam/${id}`);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/user/getAllProducts');
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );





  if (isLoading) {
    return (
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <div className="mb-6">
            <div className="h-10 w-full max-w-sm bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-60 w-full bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0 mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Top Picks in Chhindwara
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Curated selection of the finest local products
            </p>
          </div>
          
         
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchQuery ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}"`
                : 'There are currently no products available in this category'}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product._id}
              onClick={() => goToItemPage(product._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                
                {/* Discount Badge */}
                {product.mrp > product.price && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>

                {/* Vendor Info */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt className="mr-1.5 text-primary-500" />
                  <span>{product.restaurantId?.restaurantname || 'Local Merchant'}</span>
                </div>

                {/* Price and Rating */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                     
                      
                    </div>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mr-1" />
                      35-40 min
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};