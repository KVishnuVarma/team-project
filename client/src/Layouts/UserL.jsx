import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice'; // Import your action to set the user
import { get } from '../services/Api'; // API service to make GET requests

export default function UserL() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const request = await get('/api/auth/me'); // API route to get current user data
        const response = request.data;
        if (response) {
          dispatch(SetUser(response.user));  // Store user data in Redux
        }
      } catch (error) {
        console.log(error);
        navigate('/login'); // Redirect to login if fetching user data fails
      }
    };

    if (!user) {
      fetchUserData(); // Fetch user data if not available in Redux
    }
  }, [user, dispatch, navigate]);

  return <Outlet />;
}
