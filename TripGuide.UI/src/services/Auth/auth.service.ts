import axios from 'axios';

const API_URL = 'https://api.host120720251742.of.by//api/auth';

export const authService = {
    register: async (data: { username: string; password: string; email: string }) => {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    },

    login: async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('userToken');
    },

    getCurrentUser: () => {
        const token = localStorage.getItem('userToken');
        if (!token) return null;
        
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(window.atob(base64));
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
};