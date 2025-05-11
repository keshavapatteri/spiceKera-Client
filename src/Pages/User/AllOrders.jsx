import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { FaCarSide, FaRupeeSign, FaCalendarAlt, FaReceipt, FaStar, FaUtensils, FaWindows } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { MdPayment, MdDeliveryDining } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);
const navigate =useNavigate ();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/payment/orders', {
          withCredentials: true,
          
          
        });
        console.log(response)
        setOrders(response.data.payments);
      } catch (err) {
        if (err.response.data.success===false) {
          navigate('/login')
        }
        
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  const handleSubmitReview = async (orderId) => {
    try {
      setLoadingReview(true);
      const payload = { orderId, reviewText, rating };
      await axiosInstance.post('/Review/createReview', payload, {
        withCredentials: true,
      });
      setSuccessMessage('✅ Review submitted successfully!');
      setReviewText('');
      setRating(5);
      setShowReviewForm(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      if(err.response.data.data===false){
        toast.error(err.response.data.message)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    

      }
      setError('❌ Failed to submit review');
    } finally {
      // setLoadingReview(false);
      // setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto ">
      <div className="text-center mb-8 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Orders</h2>
        <p className="text-gray-600 dark:text-gray-300">View your order history and leave reviews</p>
      </div>

      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg animate-fade-in-out">
          {successMessage}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <GiMeal className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-300">No orders found</p>
          <p className="text-gray-500">Your orders will appear here once you make a purchase</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaReceipt className="text-xl mr-2" />
                    <h3 className="font-bold">ORDER #{order._id.slice(-6).toUpperCase()}</h3>
                  </div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-5">
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : order.paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <MdPayment className="inline mr-1" />
                    Payment: {order.paymentStatus}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    <MdDeliveryDining className="inline mr-1" />
                    Status: {order.orderStatus}
                  </span>
                </div>

                {/* Order Summary */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Total Amount:</span>
                    <span className="font-bold text-lg flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {order.totalCost}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Order Date:</span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-gray-500" />
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Restaurant Info */}
                {order.restaurantId.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                      <FaUtensils className="mr-2 text-orange-500" />
                      Restaurant(s):
                    </h4>
                    <ul className="space-y-1">
                      {order.restaurantId.map((id, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          • {id}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ordered Items */}
                {order.data.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Items Ordered:</h4>
                    <div className="space-y-3">
                      {order.data.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{item.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{item.description}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-sm font-medium">
                                <FaRupeeSign className="inline mr-1" />
                                {item.price}
                              </span>
                              <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cart Info (if applicable) */}
                {order.cartId && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaCarSide className="text-xl text-gray-600 dark:text-gray-300" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{order.cartId.model}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Order Status: {order.orderStatus}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Review Section */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowReviewForm(showReviewForm === order._id ? null : order._id)}
                    className={`w-full py-2 rounded-md font-medium transition-colors ${
                      showReviewForm === order._id
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {showReviewForm === order._id ? 'Cancel Review' : 'Write a Review'}
                  </button>

                  {showReviewForm === order._id && (
                    <div className="mt-4 animate-fade-in">
                      <textarea
                        className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={4}
                        placeholder="Share your experience with this order..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-2xl cursor-pointer transition-colors ${
                                rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'
                              }`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSubmitReview(order._id)}
                        disabled={loadingReview || !reviewText.trim()}
                        className={`w-full py-2 rounded-md font-medium transition-colors ${
                          loadingReview || !reviewText.trim()
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                      >
                        {loadingReview ? (
                          <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          'Submit Review'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

