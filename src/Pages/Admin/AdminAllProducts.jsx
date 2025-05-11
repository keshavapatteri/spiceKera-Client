import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';

export const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/getAllProducts');
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-l-8 border-red-500 p-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-red-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="text-lg font-bold text-red-800">Error Loading Products</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      {/* Header Section */}
     

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-100 max-w-2xl mx-auto ">
          <div className="mx-auto h-40 w-40 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <svg className="h-20 w-20 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-medium text-gray-900">No dishes found</h3>
          <p className="mt-3 text-gray-500 text-lg">
            {searchTerm ? 'No menu items match your search' : 'Your restaurant menu is currently empty'}
          </p>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition duration-200 text-lg font-medium shadow-md"
          >
            Create Your First Dish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
              {/* Product Image */}
              <div className="relative h-56 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
                <img
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-gray-100">
                  {product.category || 'Uncategorized'}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-gray-100">
                  ₹{product.price}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Added on {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => navigate(`/byIdproduct/${product._id}`)}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};