import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { axiosInstance } from "../../Config/AxiosInstance";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/review/getallReview");

        const sortedReviews = res.data
          .sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))
          .slice(0, 6);

        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="bg-white/70 dark:bg-gray-700/30 rounded-xl p-6 shadow-sm h-64 animate-pulse"
              >
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-5/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-3/4"></div>
                </div>
                <div className="mt-6 h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded-full ml-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Customer <span className="text-indigo-600 dark:text-indigo-400">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experiences
          </p>
        </motion.div>

        {reviews.length === 0 ? (
          <div className="bg-white/70 dark:bg-gray-700/30 rounded-2xl p-12 text-center shadow-sm max-w-3xl mx-auto">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-6">
              <FaQuoteLeft />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="bg-white/70 dark:bg-gray-700/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {item.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {item.userId?.name || "Anonymous"}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-indigo-50 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm ${i < (item.rating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mb-6">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-300 dark:text-gray-600 text-xl opacity-70" />
                  <p className="text-gray-700 dark:text-gray-300 pl-6">
                    {item.reviewText}
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span>{item.restaurantId?.restaurantname || "Local Restaurant"}</span>
                  <span>{new Date(item.reviewDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviews;