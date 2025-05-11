import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Config/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

const ResturantGetById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/getProductbyId/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/product/deletefood/${id}`, {
          withCredentials: true,
        });
        toast.success('Product deleted successfully!');
        navigate('/ResturantBygetall');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error deleting product');
      }
    }
  };

  if (loading) return <div className="p-6 text-center text-xl text-gray-700">Loading product...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex flex-col items-center">
        <img
          src={product.image || 'https://via.placeholder.com/400x300'}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">{product.title}</h2>
          <p className="mt-2 text-lg text-gray-600">{product.category}</p>
          <p className="mt-4 text-gray-800">{product.description}</p>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-semibold text-green-600">₹{product.price}</p>
            <p className="text-lg text-gray-500 line-through">₹{product.mrp}</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">Product ID: {product._id}</p>
          <p className="mt-2 text-sm text-gray-500">Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
          <p className="mt-2 text-sm text-gray-500">Updated At: {new Date(product.updatedAt).toLocaleDateString()}</p>

          <button
            onClick={handleDelete}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete Product
          </button>
          <button
  onClick={() => navigate(`/edit-product/${product._id}`)}
  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  Edit Product
</button>

        </div>
      </div>
    </div>
  );
};

export default ResturantGetById;
