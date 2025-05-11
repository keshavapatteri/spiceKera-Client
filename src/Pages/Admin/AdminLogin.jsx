import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosInstance.post('/admin/adminlogin', {
        email,
        password,
      }, { withCredentials: true });

      setTimeout(() => {
        navigate('/admindashboard');
      }, 1000);
    } catch (err) {
      console.error('Login failed:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] p-6">
      {/* Decorative side panel */}
      <div className="hidden lg:flex w-1/3 h-[80vh] bg-gradient-to-br from-[#3a2c27] to-[#1a1614] rounded-l-2xl shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        <div className="relative z-10 p-12 flex flex-col justify-between h-full">
          <div>
            <div className="w-16 h-16 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
              <FiLogIn className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Enterprise Portal</h2>
            <p className="text-amber-100 opacity-80">Secure access for administrators</p>
          </div>
          <div className="text-amber-100 opacity-70">
            <p className="text-sm">"Security is not a product, but a process."</p>
            <p className="text-xs mt-1">— Bruce Schneier</p>
          </div>
        </div>
      </div>

      {/* Main login form */}
      <div className="w-full lg:w-2/3 bg-white rounded-r-2xl lg:rounded-l-none rounded-l-2xl shadow-xl p-12 max-w-2xl">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-amber-500 focus:outline-none bg-transparent transition-colors duration-300"
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-b border-gray-300 focus:border-amber-500 focus:outline-none bg-transparent transition-colors duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-amber-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-800 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg text-white font-medium bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Enterprise Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};