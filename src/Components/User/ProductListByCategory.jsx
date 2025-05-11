import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { FaStar, FaRegStar, FaShoppingCart, FaSpinner } from 'react-icons/fa';

const ProductListByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/product/category/${categoryName}`);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  // Function to render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };
  

const handleAddToCart = async (product) => {
  try {
    const response = await axiosInstance.post(
      '/cart/addToCart',
      {
        ProductId: product._id,
        quantity: 1, // you can make this dynamic
        pricePerDay: product.price, // or price per unit
        totalCost: product.price,
        restaurantId: product.restaurantId, // ensure this exists
      },
      {
        withCredentials: true, // needed if using cookies for auth
      }
    );

    if (response.status === 200) {
      navigate('/cart'); // 👈 Navigate to the cart page
    }
  } catch (error) {
    console.error('Add to cart failed:', error);
    alert('Failed to add item to cart');
  }
};
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-20">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {categoryName}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our premium collection of {categoryName} products
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-4 mb-4">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-600">
            We couldn't find any products in this category. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
                {product.discountPercentage && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {product.rating && (
                    <div className="mt-3 flex items-center">
                      <div className="flex mr-2">
                        {renderRating(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.ratingCount || 0})
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </p>
                      {product.mrp && product.mrp > product.price && (
                        <p className="text-sm text-gray-500 line-through">
                          ₹{product.mrp.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
  onClick={() => handleAddToCart(product)}
  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
>
  <FaShoppingCart />
</button>

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

export default ProductListByCategory;