
import React, { useEffect, useState } from 'react';

import { axiosInstance } from '../../Config/AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



 
// Veg/Non-Veg options with icons
const foodTypes = [
  { value: 'Veg', label: 'Vegetarian', icon: '🟢' },
  { value: 'Non-Veg', label: 'Non-Vegetarian', icon: '🔴' },
];

export const ResturantAddProduct = () => {
  const [formData, setFormData] = useState({

    title: '',
    description: '',
    price: '',
    category: '',
    mrp: '',
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, description: type });
  };

  const handleCategorySelect = (category) => {

    
    setFormData({ ...formData, category });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);


    try {
      await axiosInstance.post('/Product/addfood', data, {
        withCredentials: true,
      });
      toast.success('Product added successfully!');
      navigate('/ResturantBygetall');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/admin/allCategories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Menu Item</h2>
            <p className="mt-2 text-sm text-gray-600">Fill in the details of your new product</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Margherita Pizza"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Veg/Non-Veg Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>
              <div className="flex space-x-4">
                {foodTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleTypeSelect(type.value)}
                    className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.description === type.value
                        ? type.value === 'Veg'
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl mr-2">{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
              <input
                type="hidden"
                name="description"
                value={formData.description}
                required
              />
              {!formData.description && (
                <p className="mt-1 text-sm text-red-600">Please select food type</p>
              )}
            </div>

            {/* Price Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  id="mrp"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Category Selection */}


     {/* Category Selection */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
  {categories.map((category) => (
    <div
      key={category._id}
      onClick={() => handleCategorySelect(category.name)}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-all flex flex-col items-center justify-center cursor-pointer ${
        formData.category === category._id ? 'border-2 border-indigo-500' : ''
      }`}
    >
      <img src={category.imageUrl} alt={category.name} className="h-16 w-16 mb-2" />
      <p className="text-center font-semibold">{category.name}</p>
    </div>
  ))}
</div>
<input
  type="hidden"
  name="category"
  value={formData.category}
  required
/>



            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
              {image && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {image.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.category || !formData.description}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  !formData.category || !formData.description
                    ? 'bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};