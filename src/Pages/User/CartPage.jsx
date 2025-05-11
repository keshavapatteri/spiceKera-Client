import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/Cart/productuserid', {
        withCredentials: true,
      });

      setCartId(response.data);
      const cartItems = response.data.Product.map((item) => ({
        ...item.ProductId,
        quantity: item.quantity,
        cartItemId: item._id,
      }));


      setCartItems(cartItems);
    } catch (error) {
      console.error('Failed to fetch cart:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/Cart/update', {
        productId,
        quantity: newQuantity,

      });
      console.log('Cart updated:', response.data);
      fetchCart(); // Refresh cart from parent
    } catch (error) {
      console.error('Failed to update cart:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = (productId, item) => {
    const newQuantity = item.quantity + 1;
    updateCartItemQuantity(productId, newQuantity);
  };

  const decreaseQuantity = (productId, item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  useEffect(() => {
    fetchCart();

  }, []);

  const calculateTotal = () => {
    return cartItems?.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  };

  // ... (keep all your existing functions like updateQuantityOnServer, deleteCartItem, etc.)

  const applyCoupon = (code) => {
    setCouponCode(code);
    if (code === 'DISCOUNT5') {
      setDiscount(5);
      setToastMessage('Coupon applied: 5% discount!');
    } else if (code === 'DISCOUNT7') {
      setDiscount(7);
      setToastMessage('Coupon applied: 7% discount!');
    } else {
      setToastMessage('Invalid coupon code.');
    }
    setShowToast(true);
    setShowCouponDropdown(false);
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axiosInstance.delete('/Cart/remove', {
        data: { productId },
        withCredentials: true,
      });
  
      if (res.data?.cart?.Product?.length > 0) {
        const updatedItems = res.data.cart.Product.map((item) => ({
          ...item.ProductId,
          quantity: item.quantity,
          cartItemId: item._id,
        }));
  
        setCartItems((prev) => prev.filter((r) => r._id !== productId));
        toast.success("Item removed from cart successfully!");
      } else {
        setCartItems([]);
        toast.success("Cart is now empty!");
      }
  
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error("Failed to remove item from cart.");
      fetchCart(); // Optional rollback
    }
  };
  

  // ... (keep your existing useEffect hooks)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet</p>
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-center w-full max-w-xs"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const totalAmount = calculateTotal();
  const discountedTotal = totalAmount - (totalAmount * discount) / 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pb-36 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Your Shopping Cart</h1>

        {/* Cart Items - Responsive Grid */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 sm:mb-8">
          {cartItems?.map((item, idx) => (
            <div
              key={item._id || idx}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
            >
              {/* Product Image */}
              <div className="w-full sm:w-24 h-24 flex-shrink-0">
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="text-lg font-semibold text-green-600 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                  <div className="flex items-center border border-gray-200 rounded-full w-full sm:w-auto">
                    <button
                      onClick={() => decreaseQuantity(item._id, item)}


                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full w-10 text-center"
                    >
                      −
                    </button>
                    <span className="px-3 text-md font-medium flex-1 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item._id, item)}

                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full w-10 text-center"
                    >
                      +
                    </button>
                  </div>



                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>

                  {/* <button
        onClick={() => deleteCartItem(item._id)}
        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-center sm:justify-start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Remove
      </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section - Responsive Layout */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Apply Coupon Code</h3>

          <div className="relative">
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-1 mb-2 sm:mb-0 sm:mr-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 sm:hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex">
                <button
                  onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                  className="hidden sm:flex items-center px-4 bg-gray-100 text-gray-600 hover:bg-gray-200 border-t border-b border-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => applyCoupon(couponCode)}
                  className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg sm:rounded-l-none hover:bg-orange-600 transition font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            {showCouponDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => applyCoupon('DISCOUNT5')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    <span className="font-medium">SPICE26#</span> - 5% discount
                  </button>
                  <button
                    onClick={() => applyCoupon('DISCOUNT7')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    <span className="font-medium">KERA54#</span> - 7% discount
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Responsive Layout */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Order Summary</h3>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{totalAmount?.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({discount}%)</span>
                <span className="text-green-600 font-medium">-₹{(totalAmount * discount / 100).toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 my-2 sm:my-3"></div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-green-600">₹{discountedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button - Responsive */}
        <div className="text-center">
          <Link
            to={`/Address/${cartId._id}`}
            state={{ cartTotal: discountedTotal, cartId: cartId._id,cartItems:cartItems }}
            className="inline-block w-full sm:w-auto px-6 py-3 sm:py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium text-lg shadow-md"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {/* Toast Message - Responsive Positioning */}
      {showToast && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg flex items-center max-w-xs sm:max-w-sm mx-2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm sm:text-base">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};