
import { useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Route';

// ✅ Import toast container
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
      
      {/* ✅ Place toast container here once */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
