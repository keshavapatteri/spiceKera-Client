import React from 'react';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 text-lg mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our platform.
        </p>

        <div className="space-y-6 text-gray-600">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
            <ul className="list-disc list-inside mt-2">
              <li>Personal Information: Name, email, phone number, address, etc.</li>
              <li>Usage Data: Pages visited, time spent, and click behavior.</li>
              <li>Device Information: Browser, device type, IP address.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside mt-2">
              <li>To personalize your experience</li>
              <li>To process orders and payments</li>
              <li>To improve our service and customer support</li>
              <li>To send updates, promotions, or important notices</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">3. How We Protect Your Information</h2>
            <p className="mt-2">
              We implement a variety of security measures including encryption, secure servers, and limited access to protect your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">4. Sharing Your Information</h2>
            <p className="mt-2">
              We do not sell or share your personal data with third parties except when required by law or with trusted partners to provide essential services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">5. Your Choices</h2>
            <p className="mt-2">
              You can manage your privacy preferences, opt-out of communications, and request deletion of your account at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">6. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this privacy policy periodically. We encourage you to review it regularly.
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

