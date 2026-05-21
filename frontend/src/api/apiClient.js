const API_BASE_URL = 'http://localhost:8000/api';

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

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

export default apiClient;