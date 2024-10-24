import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { get } from '../services/Api';

export default function UserL() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const request = await get('/api/auth/me');
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

  return <Outlet />;  // Only use <Outlet /> here, no Router
}
