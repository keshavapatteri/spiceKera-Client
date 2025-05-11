// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircle2 } from 'lucide-react'; // optional icon from lucide-react

// export const PaymentSuccessPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
//       <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
//         <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-6">
//           Thank you for your booking. Your payment has been processed successfully.
//         </p>
//         <button
//           onClick={() => navigate('/')}
//           className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-md transition"
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { axiosInstance } from '../../Config/AxiosInstance';

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const clearCart = async () => {
      try {
        await axiosInstance.delete('/Cart/clearCart', { withCredentials: true });
        console.log('Cart cleared successfully');
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
    };

    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your booking. Your payment has been processed successfully.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-md transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
