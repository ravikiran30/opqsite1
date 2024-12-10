

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useHandleAuthError = () => {
  const navigate = useNavigate();

  return (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirect to login page if the token is invalid or expired
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      navigate('/');
      
    } else {
      console.error('Error fetching data:', error);
      throw new Error('Failed to load data.');
    }
  };
};
