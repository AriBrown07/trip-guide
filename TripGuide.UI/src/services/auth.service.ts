import axios from 'axios';

const API_URL = 'http://localhost:5972/api/auth';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token); 
    }
    return response.data;
};

// auth.service.ts
interface AuthService {
  register: (data: { username: string; password: string; email: string }) => Promise<void>;
}

export const authService: AuthService = {
  register: async (data) => { /* ... */ },
};

export const logout = () => {
    localStorage.removeItem('userToken'); 
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('userToken');
    if (!token) return null;
   
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

