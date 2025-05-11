import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { 
  FiClock, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiDollarSign,
  FiCalendar
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const statusConfig = {
  pending: {
    icon: <FiClock />,
    color: 'bg-amber-100 text-amber-800',
    label: 'Pending'
  },
  processing: {
    icon: <FiPackage />,
    color: 'bg-blue-100 text-blue-800',
    label: 'Processing'
  },
  ontheway: {
    icon: <FiTruck />,
    color: 'bg-orange-100 text-orange-800',
    label: 'On the Way'
  },
  delivered: {
    icon: <FiCheckCircle />,
    color: 'bg-green-100 text-green-800',
    label: 'Delivered'
  }
};

export const ResturantByOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/restaurant/restaurantOrders', {
          withCredentials: true,
        });
        setOrders(res.data.payments);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `/restaurant/updateOrderStatus`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus === activeTab);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
        <h3 className="font-bold flex items-center gap-2">
          <FiPackage className="text-xl" /> Loading Error
        </h3>
        <p className="mt-2">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and update customer orders</p>
          
          <div className="flex flex-wrap gap-2 mt-6 border-b border-gray-200">
            {['all', ...Object.keys(statusConfig)].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'bg-white border-t border-l border-r border-gray-200 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab === 'all' ? 'All Orders' : statusConfig[tab].label}
              </button>
            ))}
          </div>
        </header>

        {filteredOrders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {activeTab === 'all' 
                ? "You don't have any orders yet" 
                : `No ${statusConfig[activeTab]?.label.toLowerCase()} orders`}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map(order => (
              <motion.div
                key={order._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <FiShoppingBag className="text-indigo-500" />
                        Order #{order.orderId}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <FiCalendar className="text-gray-400" />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[order.orderStatus].color
                    }`}>
                      {statusConfig[order.orderStatus].icon}
                      <span className="ml-1">{statusConfig[order.orderStatus].label}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FiUser className="text-indigo-500" /> Customer
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500 w-20">Name:</span>
                          <span className="font-medium">{order.userId.name}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiMail className="text-gray-400" />
                          <span className="text-gray-500 w-20">Email:</span>
                          <span>{order.userId.email}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiPhone className="text-gray-400" />
                          <span className="text-gray-500 w-20">Phone:</span>
                          <span>{order.userId.phonenumber}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiMapPin className="text-gray-400" />
                          <span className="text-gray-500 w-20">Address:</span>
                          <span className="truncate">{order.userId.address}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FiDollarSign className="text-indigo-500" /> Summary
                      </h4>
                      <div className="space-y-3">
                      <div className="flex justify-between text-sm">
  <span className="text-gray-500">Subtotal:</span>
  <span className="font-medium">
    ₹{order.data?.reduce((sum, item) => sum + item.price * item.quantity, 0)}
  </span>
</div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Payment:</span>
                          <span className={`font-medium ${
                            order.paymentStatus === 'completed' 
                              ? 'text-green-600' 
                              : 'text-amber-600'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-2">Items ({order.data?.length || 0})</h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                          {order.data?.map(item => (
                            <div key={item._id} className="flex gap-3 text-sm">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-10 h-10 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-gray-500">₹{item.price} × {item.quantity}</p>
                              </div>
                              <div className="font-medium">
                                ₹{item.price * item.quantity}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-100 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-3">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusConfig).map(([statusKey, config]) => (
                      <button
                        key={statusKey}
                        onClick={() => handleStatusChange(order._id, statusKey)}
                        disabled={order.orderStatus === statusKey}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          order.orderStatus === statusKey
                            ? `${config.color} cursor-default`
                            : 'bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {config.icon}
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};