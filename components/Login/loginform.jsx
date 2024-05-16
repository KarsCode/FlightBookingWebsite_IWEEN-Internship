import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import API_URL from '../../config';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(API_URL)
    
    try {
      // Make API request
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
      });

      if (!response.ok) {
        
        throw new Error('Invalid response from server');
        
      }

      const data = await response.json();

      if (data.ApiStatus.StatusCode === 200) {
        // Route to search page
        localStorage.setItem('TransactionStatus', data.ApiStatus.TransactionStatus);
        setRedirect(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred, please try again.');
      console.error('Login error:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/search" />;
  }

  return (
    <div className="flex flex-col items-center gap-2 p-5 font-medium">
      <div className='text-6xl font-bold ceviche-one-regular sm:text-7xl'>Welcome</div>
      <div className='font-semibold'>B2B Login</div>
      <form onSubmit={handleSubmit} className="w-full max-w-xs sm:w-[350px] sm:flex sm:flex-col sm:gap-5">
        <div className="mt-4">
          <label htmlFor="UserId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            id="UserId"
            name="UserId"
            placeholder="User ID"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm sm:h-8 sm:flex sm:items-center sm:p-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm sm:h-8 sm:flex sm:items-center sm:p-2"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash style={{ color: '#06539A' }}/> : <FaEye style={{ color: '#06539A' }}/>}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#06539A]"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-[#06539A] font-semibold">
        {error && <p className="text-red-500 bg-gray-200">{error}</p>}
        <a href="#">Forgot Password?</a>
      </div>
      <div className="text-[#E0621A] font-semibold">
        <a href="#">Other Sign In Options</a>
      </div>
    </div>
  );
};

export default LoginForm;
