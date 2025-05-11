import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const PaymentFailed = () => {
  const navigate = useNavigate();

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mb-5 animate-[shake_0.5s_ease-in-out]">
          <FaTimesCircle className="inline-block text-red-500 text-6xl" />
        </div>
        
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Payment Failed</h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          We couldn't process your payment. Please check your payment details and try again.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="font-medium text-gray-800 mb-2">Possible reasons:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Insufficient funds</li>
            <li>Incorrect card details</li>
            <li>Network issues</li>
            <li>Bank declined the transaction</li>
          </ul>
        </div>
        
        <div className="flex justify-center space-x-3 mb-5">
         
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors border border-gray-200"
          >
            Return Home
          </button>
        </div>
        
        <p className="text-gray-500 text-sm">
          Need help? <a href="/contact" className="text-blue-500 hover:underline">Contact our support team</a>.
        </p>
      </div>
    </div>
  );
};