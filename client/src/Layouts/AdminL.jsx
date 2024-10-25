import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminL() {
    const user = useSelector((state) => state.Auth.user);
    const loading = useSelector((state) => state.Auth.loading); // Assuming you have a loading state in Auth
    const navigate = useNavigate();

    useEffect(() => {
        // If loading is true, do not navigate yet
        if (loading) return;

        // Check if user is logged in and is an admin
        if (!user || user.role !== "admin") {
            navigate('/login');
        }
    }, [user, loading, navigate]); // Added loading and navigate to the dependency array

    return (
        <>
            <Outlet />
        </>
    );
}
