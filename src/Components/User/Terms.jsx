import React from 'react';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Terms & Conditions</h1>

        <p className="text-gray-700 text-lg mb-4">
          By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
        </p>

        <div className="space-y-6 text-gray-600">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">1. Use of Service</h2>
            <p className="mt-2">
              Our platform provides an online food delivery experience. You must be at least 18 years old or use the service under supervision.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">2. Account Registration</h2>
            <p className="mt-2">
              Users are responsible for maintaining the confidentiality of their account credentials. All activities under your account are your responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">3. Orders & Payments</h2>
            <p className="mt-2">
              Prices may vary depending on location and availability. Once placed, orders cannot be canceled or refunded unless otherwise stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">4. Prohibited Activities</h2>
            <ul className="list-disc list-inside mt-2">
              <li>Misuse of the platform</li>
              <li>Attempting to hack or disrupt services</li>
              <li>Providing false information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">5. Limitation of Liability</h2>
            <p className="mt-2">
              We are not liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">6. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of those changes.
            </p>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500 text-center">
          Last updated: April 8, 2025
        </div>
      </div>
    </div>
  );
};

