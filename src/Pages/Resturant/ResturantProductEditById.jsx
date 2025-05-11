import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResturantProductEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    mrp: '',
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/getProductbyId/${id}`, { withCredentials: true });
        const { title, category, description, price, mrp } = res.data.data;
        setFormData(prev => ({ ...prev, title, category, description, price, mrp }));
      } catch (err) {
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    try {
      await axiosInstance.put(`/product/editfood/${id}`, form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product updated successfully!');
      navigate(`/ResturantGetById/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block font-medium mb-2 text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block font-medium mb-2 text-gray-700">Category</label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block font-medium mb-2 text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
            rows="4"
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block font-medium mb-2 text-gray-700">Price</label>
          <input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter product price"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="mrp" className="block font-medium mb-2 text-gray-700">MRP</label>
          <input
            id="mrp"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            type="number"
            placeholder="Enter product MRP"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="file" className="block font-medium mb-2 text-gray-700">Upload Image</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResturantProductEditById;
