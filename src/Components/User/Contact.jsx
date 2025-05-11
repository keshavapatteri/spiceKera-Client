import React from 'react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have any questions, feedback, or need support? Feel free to reach out using the form below.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea
              id="message"
              rows="5"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your message or query..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-sm text-gray-500 text-center">
          You can also reach us at: <span className="text-indigo-600">support@SpiceKera.com</span>
        </div>
      </div>
    </div>
  );
};
