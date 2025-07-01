import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Button, Typography } from "@mui/material";
import styles from "./Register.module.scss";

const RegisterPage: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validate = (): boolean => {
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

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.authContainer}>
            <Typography variant="h4" className={styles.authTitle}>
                Create Account
            </Typography>
            
            {errors.submit && (
                <Typography color="error" className={styles.error}>
                    {errors.submit}
                </Typography>
            )}
            
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.formGroup}>
                    <Typography variant="subtitle1" className={styles.formLabel}>
                        Username
                    </Typography>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleInputChange}
                        className={styles.formInput}
                    />
                    {errors.username && (
                        <Typography color="error" className={styles.error}>
                            {errors.username}
                        </Typography>
                    )}
                </div>
                
                <div className={styles.formGroup}>
                    <Typography variant="subtitle1" className={styles.formLabel}>
                        Email (optional)
                    </Typography>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className={styles.formInput}
                    />
                    {errors.email && (
                        <Typography color="error" className={styles.error}>
                            {errors.email}
                        </Typography>
                    )}
                </div>
                
                <div className={styles.formGroup}>
                    <Typography variant="subtitle1" className={styles.formLabel}>
                        Password
                    </Typography>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        className={styles.formInput}
                    />
                    {errors.password && (
                        <Typography color="error" className={styles.error}>
                            {errors.password}
                        </Typography>
                    )}
                </div>
                
                <div className={styles.formGroup}>
                    <Typography variant="subtitle1" className={styles.formLabel}>
                        Confirm Password
                    </Typography>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.formInput}
                    />
                    {errors.confirmPassword && (
                        <Typography color="error" className={styles.error}>
                            {errors.confirmPassword}
                        </Typography>
                    )}
                </div>
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    className={styles.submitButton}
                >
                    Register
                </Button>
            </form>
            
            <Typography variant="body1" className={styles.authFooter}>
                Already have an account? <a href="/login" className={styles.authLink}>Sign in</a>
            </Typography>
        </div>
    );
};

export { RegisterPage };