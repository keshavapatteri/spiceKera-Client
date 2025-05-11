import { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiList, FiUser, FiLogOut, FiX, FiMenu } from 'react-icons/fi';

export const ResturantHeader = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/restaurantProfile', {
          withCredentials: true,
        });
        setRestaurant(response.data);
      } catch (err) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/restaurant/Restaurantlogout', {}, { withCredentials: true });
      navigate('/ResturantLogin');
    } catch (err) {
      setError('Error logging out');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-600">{error}</div>;
  }

  if (!restaurant) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No profile data available</div>;
  }

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand - Always visible name */}
          <div className="flex items-center space-x-2">
            <a 
              href='/dashboard' 
              className="text-2xl font-bold hover:text-yellow-300 transition-colors duration-300 flex items-center"
            >
              <span className="bg-white text-green-800 rounded-full p-2 mr-2 flex items-center justify-center">
                <span className="text-xl">🍽️</span>
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none">
                {restaurant.restaurantname}
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              <NavItem href="/dashboard" icon={<FiHome />} text="Home" />
              <NavItem href="/AddProduct" icon={<FiPlusSquare />} text="Add Product" />
              <NavItem href="/ResturantBygetall" icon={<FiList />} text="Products" />
              <NavItem href="/ResturantProfile" icon={<FiUser />} text="Profile" />
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-green-600 hover:text-yellow-300 transition-colors duration-300 group"
                >
                  <FiLogOut className="mr-2 group-hover:animate-pulse" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-2xl focus:outline-none p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 transition-all duration-300 ease-in-out">
            <ul className="flex flex-col space-y-2">
              <MobileNavItem href="/dashboard" icon={<FiHome />} text="Home" onClick={toggleMobileMenu} />
              <MobileNavItem href="/AddProduct" icon={<FiPlusSquare />} text="Add Product" onClick={toggleMobileMenu} />
              <MobileNavItem href="/ResturantBygetall" icon={<FiList />} text="Products" onClick={toggleMobileMenu} />
              <MobileNavItem href="/ResturantProfile" icon={<FiUser />} text="Profile" onClick={toggleMobileMenu} />
              <li>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-green-600 hover:text-yellow-300 transition-colors duration-300 group text-left"
                >
                  <FiLogOut className="mr-3 group-hover:animate-pulse" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

const NavItem = ({ href, icon, text }) => (
  <li>
    <a 
      href={href} 
      className="flex items-center px-4 py-2 rounded-lg hover:bg-green-600 hover:text-yellow-300 transition-colors duration-300 group"
    >
      <span className="mr-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      {text}
    </a>
  </li>
);

const MobileNavItem = ({ href, icon, text, onClick }) => (
  <li>
    <a 
      href={href} 
      onClick={onClick}
      className="flex items-center px-4 py-3 rounded-lg hover:bg-green-600 hover:text-yellow-300 transition-colors duration-300 group"
    >
      <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="text-lg">{text}</span>
    </a>
  </li>
);