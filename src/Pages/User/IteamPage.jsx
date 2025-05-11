import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { toast } from 'react-toastify'; // ✅ import toast

export const IteamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/user/productByid/${id}`, {
          withCredentials: true,
        });

        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !product.restaurantId?._id) {
      toast.warning('Product or restaurant info is missing');
      return;
    }

    const quantity = 1;
    const totalCost = product.price * quantity;

    try {
      const response = await axiosInstance.post(
        '/Cart/addToCart',
        {
          ProductId: product._id,
          quantity,
          pricePerDay: product.price,
          totalCost,
          restaurantId: product.restaurantId._id,
        },
        { withCredentials: true }
      );
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      if (error.response.data.token===false){
        navigate('/login')
      }
      toast.error('Failed to add item to cart');
    }
  };

  if (loading)
    return <div className="text-center text-lg py-10 animate-pulse">Loading Product...</div>;

  if (!product)
    return <div className="text-center text-red-500 py-10">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
      >
        ← Back to Listings
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="relative h-72 md:h-auto">
          <img
            src={product.image || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded">
            ⭐ 4.3
          </div>
        </div>

        {/* Right Content Section */}
        <div className="p-6 md:p-10 space-y-4 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-gray-600 text-md mb-4">{product.description}</p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Restaurant:</strong> {product.restaurantId?.restaurantname || 'N/A'}</li>
              <li><strong>Restaurant ID:</strong> {product.restaurantId?._id || 'N/A'}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Delivery Time:</strong> 35-40 mins</li>
              <li>
                <strong>Price:</strong>
                <span className="text-green-600 font-semibold ml-1">₹{product.price}</span>
              </li>
              <li>
                <strong>MRP:</strong>
                <span className="text-red-500 line-through ml-1">₹{product.mrp}</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={handleAddToCart}
            >
              Order Now
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate('/AllProduct')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
