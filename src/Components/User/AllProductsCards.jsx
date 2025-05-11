import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { FaStar, FaRegStar, FaSearch, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

export const AllProductsCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/user/getAllProducts');
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRating = (rating = 4.3) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating) ? 
        <FaStar key={i} className="text-yellow-400" /> : 
        <FaRegStar key={i} className="text-yellow-400" />
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 ">
        <div className="animate-pulse space-y-8 ">
          <div className="flex justify-between">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="h-12 w-full max-w-md bg-gray-200 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-20">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Products</h2>
          <p className="text-gray-600">Quality items from local merchants</p>
        </div>
        <button 
          onClick={() => navigate('/all-products')}
          className="flex items-center px-5 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
        >
          View All <FaArrowRight className="ml-2" />
        </button>
      </div>

      <div className="relative mb-8 max-w-md">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {searchQuery ? 'No matching products' : 'No products available'}
          </h3>
          <p className="text-gray-500 mt-1">
            {searchQuery ? `Try a different search term` : 'Check back later for new items'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 3).map((product) => (
            <div 
              key={product._id}
              onClick={() => navigate(`/iteam/${product._id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = '/placeholder-product.jpg'}
                />
                {product.mrp > product.price && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt className="mr-1.5 text-blue-500" />
                  <span>{product.restaurantId?.restaurantname || 'Local Store'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">₹{product.price}</span>
                    {product.mrp > product.price && (
                      <span className="text-gray-400 text-sm line-through ml-2">₹{product.mrp}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                      {renderRating(product.rating)}
                      <span className="text-yellow-800 text-sm ml-1">{product.rating?.toFixed(1) || '4.3'}</span>
                    </div>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaClock className="mr-1" />
                      30-45 min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

