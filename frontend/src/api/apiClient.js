const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = async (path, options = {}) => {
    const token = localStorage.getItem('payorbit_token');

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        }
    });

    const data = await response.json();

    if (response.status === 401) {
        localStorage.removeItem('payorbit_token');
        localStorage.removeItem('payorbit_admin');

        window.location.href = '/login';
        
        throw new Error(data.message || 'Session expired. Please login again');
    }

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

export default apiClient;