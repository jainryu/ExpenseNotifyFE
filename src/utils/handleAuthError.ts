// utils/handleAuthError.ts
export const handleAuthError = (error: unknown, navigate: (path: string) => void) => {
    const isAuthError =
        error instanceof Error &&
        (error.message.includes('401') ||
            error.message.includes('403') ||
            error.message.includes('No token'));

    if (isAuthError) {
        localStorage.removeItem('token');
        alert('Session expired. Please log in again.');
        navigate('/login');
        return true;
    }

    return false;
};