import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const AddressPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartTotal ,cartId,cartItems} = location.state || {};

  // const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });
console.log("dfdfdf",cartItems);

  console.log('Cart Total:', cartId);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   const savedCartItems = localStorage.getItem('cartItems');
  //   if (savedCartItems) {
  //     setCartItems(JSON.parse(savedCartItems));
  //   }
  // }, []);

  const loadRazorpay = (orderData) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      const options = {
        key: 'rzp_test_Yh0fPwTheqXsx5',
        amount: cartTotal,
        currency: 'INR',
        name: 'Zomato',
        description: 'Zomato Payment',
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await axiosInstance.post(
              '/payment/verifyRazorpay',
              verificationPayload,
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              navigate('/PaymentSuccess');
            } else {
              navigate('/PaymentFailed');
              alert('Payment verification failed!');
            }
          } catch (err) {
            console.error(err);
            alert('Payment verification error!');
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = () => {
      alert('Failed to load Razorpay script. Please try again later.');
    };

    document.body.appendChild(script);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addressPayload = { formData, cartId: id };
      await axiosInstance.post('/Address/addAddress', addressPayload, {
        withCredentials: true,
      });

      const orderRes = await axiosInstance.post(
        '/payment/create',
        {
          amount: cartTotal,
          cartId: id,
          data: cartItems,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Order Data:', orderRes.data);

      loadRazorpay(orderRes.data.order);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto ">
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 mt-20 mb-32">
      <div className="md:w-1/2 h-72 md:h-screen relative flex items-center justify-center overflow-hidden">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2022/9/AB/PS/MO/42058983/boxes-parcel-packing-and-moving.jpg"
          alt="Shipping"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Hassle-Free Delivery</h2>
          <p className="text-sm text-gray-200">
            Experience quick and safe delivery of your goods right to your door, with real-time tracking.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 max-w-sm mx-auto mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Total Amount</h3>
            <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">₹{cartTotal}</p>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Enter Your Address</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {['street', 'city', 'state'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="ZIP"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+91 9876543210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
            >
              Submit & Pay
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

