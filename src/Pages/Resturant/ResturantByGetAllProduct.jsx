import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { Link } from 'react-router-dom';

export const ResturantByGetAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/restaurant/restaurantProducts', {
          withCredentials: true,
        });
        setProducts(res.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6 text-center text-xl">Loading products...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Restaurant Products</h2>
      {products.length === 0 ? (
        <div className="text-center text-gray-600">No products found.</div>
      ) : (
        <ul className="space-y-6">
          {products.map((product) => (
            <li
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row"
            >
              <Link to={`/ResturantGetById/${product._id}`} className="sm:w-1/3 w-full">
                <img
                  src={product.image || 'https://via.placeholder.com/400x300'}
                  alt={product.title}
                  className="w-full h-48 sm:h-full object-cover"
                />
              </Link>
              <div className="p-4 sm:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Category: {product.category}</h3>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Title: {product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">Description: {product.description}</p>
                <p className="text-blue-500 font-bold text-lg mb-1">Price: ₹{product.price}</p>
                <p className="text-blue-500 font-bold text-lg">MRP: ₹{product.mrp}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
