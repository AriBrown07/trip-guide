import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: Record<string, string> = {};
        
        if (form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        
        if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        try {
            await authService.register({
                username: form.username,
                password: form.password,
                email: form.email
            });
            navigate('/login');
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            {errors.submit && <div className="error">{errors.submit}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                
                <div className="form-group">
                    <label>Email (optional)</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                    />
                    {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword}</span>
                    )}
                </div>
                
                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
            
            <div className="auth-footer">
                Already have an account? <a href="/login">Sign in</a>
            </div>
        </div>
    );
}