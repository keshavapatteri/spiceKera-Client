import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { motion } from 'framer-motion';
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiClock, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-toastify';

export const ResturantLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantname, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [workingtime, setWorkingTime] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/restaurant/Restaurantlogin', { email, password }, { withCredentials: true });
      toast.success(res.data.message || 'Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/restaurant/Restaurantregister', {
        email,
        password,
        restaurantname,
        address,
        workingtime,
        phonenumber
      });
      toast.success(res.data.message || 'Registration successful. You can now log in.');
      setIsLogin(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="inline-block p-3 bg-white/20 rounded-full mb-4">
              <FiLogIn className="text-white text-2xl" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">{isLogin ? 'Restaurant Login' : 'Register Your Restaurant'}</h2>
            <p className="text-orange-100 mt-1">{isLogin ? 'Sign in to manage your restaurant' : 'Create a new restaurant account'}</p>
          </div>

          <div className="p-8">
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">

              {!isLogin && (
                <>
                  {/* Restaurant Name */}
                  <InputField icon={<FiUser />} placeholder="Restaurant Name" value={restaurantname} onChange={setRestaurantName} required />

                  {/* Address */}
                  <InputField icon={<FiMapPin />} placeholder="Address" value={address} onChange={setAddress} required />

                  {/* Working Time */}
                  <InputField icon={<FiClock />} placeholder="Working Hours (e.g., 9AM - 9PM)" value={workingtime} onChange={setWorkingTime} required />

                  {/* Phone Number */}
                  <InputField icon={<FiPhone />} placeholder="Phone Number" value={phonenumber} onChange={setPhoneNumber} required />
                </>
              )}

              {/* Email */}
              <InputField icon={<FiMail />} type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {isLogin ? 'Signing in...' : 'Signing up...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </form>

            {/* Toggle between login/signup */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setIsLogin(false)} className="text-orange-600 hover:text-orange-500 font-medium">
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setIsLogin(true)} className="text-orange-600 hover:text-orange-500 font-medium">
                      Login here
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Input Field Helper
const InputField = ({ icon, placeholder, value, onChange, type = 'text', required = false }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
      placeholder={placeholder}
      required={required}
    />
  </div>
);
