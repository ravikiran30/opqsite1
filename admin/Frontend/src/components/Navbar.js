import React from 'react'
import { useNavigate } from 'react-router-dom';
import img1 from '../images/opq-logo.png'
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  // Decode the token to get the username
  const token = localStorage.getItem('token');
  let username = '';

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.admin_name || ''; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handleLogout = () => {
    // Perform logout operations here
    localStorage.removeItem('token');
    
    window.location.href = '/';
    navigate('/', { replace: true });
  };
  return (
    <nav className="bg-[#ffffff] p-4 flex justify-between items-center shadow-lg">
      <div className="text-white font-bold text-xl">
        <a href='/dashboard'><img src={img1} alt="Logo" className="h-10 inline-block mr-2" /></a>
      </div>
      <div className="flex items-center">
        {/* Display the username */}
        {username && (
          <span className="text-zinc-950 mr-4">
            Welcome, <span className='text-2xl font-bold text-[#6A1276]'>{username}</span> 
          </span>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-400 text-zinc-950 px-4 py-2 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
