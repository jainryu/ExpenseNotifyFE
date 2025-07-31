// hooks/useAuthErrorHandler.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthErrorHandler = (isError: boolean, error: unknown) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            if (
                error instanceof Error &&
                (error.message.includes('401') ||
                    error.message.includes('403') ||
                    error.message.includes('No token'))
            ) {
                localStorage.removeItem('token');
                alert('Session expired. Please log in again.');
                navigate('/login');
            }
        }
    }, [isError, error, navigate]);
};