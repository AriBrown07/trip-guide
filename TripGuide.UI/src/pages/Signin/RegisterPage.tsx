import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/Auth/auth.service';
import { Button, Typography } from "@mui/material";
import styles from "./Register.module.scss";
import axios, { AxiosError } from 'axios';

const RegisterPage: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let strength = 0;
        if (form.password.length > 0) strength += 1;
        if (form.password.length >= 8) strength += 1;
        if (/[A-Z]/.test(form.password)) strength += 1;
        if (/[0-9]/.test(form.password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;
        
        setPasswordStrength(strength);
    }, [form.password]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        
        if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (passwordStrength < 3) {
            newErrors.password = 'Password is too weak';
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
        
        if (!validate() || isSubmitting) return;
        
        setIsSubmitting(true);
        setErrors({}); // Очищаем предыдущие ошибки
        
        try {
            await authService.register({
                username: form.username,
                password: form.password,
                email: form.email
            });
            
            navigate('/login', { state: { registrationSuccess: true } });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                
                // Обработка ошибок валидации ASP.NET Core
                if (axiosError.response?.status === 400) {
                    const responseData = axiosError.response.data as any;
                    
                    if (responseData.errors) {
                        // Обработка ошибок ModelState
                        const validationErrors: Record<string, string> = {};
                        Object.entries(responseData.errors).forEach(([key, value]) => {
                            validationErrors[key.toLowerCase()] = (value as string[]).join(' ');
                        });
                        setErrors(validationErrors);
                    } else if (responseData.title) {
                        // Обработка стандартных Problem Details
                        setErrors({ submit: responseData.title });
                    } else {
                        setErrors({ submit: responseData || 'Validation failed' });
                    }
                } else {
                    setErrors({ submit: axiosError.message });
                }
            } else {
                setErrors({ submit: 'Registration failed. Please try again.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
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
                        placeholder="Enter your username"
                        disabled={isSubmitting}
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
                        placeholder="Enter your email"
                        disabled={isSubmitting}
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
                        placeholder="Create a password"
                        disabled={isSubmitting}
                    />
                    <div 
                        className={styles.passwordStrength} 
                        style={{ '--strength': passwordStrength } as React.CSSProperties}
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
                        placeholder="Confirm your password"
                        disabled={isSubmitting}
                    />
                    {errors.confirmpassword && (
                        <Typography color="error" className={styles.error}>
                            {errors.confirmpassword}
                        </Typography>
                    )}
                </div>
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    className={styles.submitButton}
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
            </form>
            
            <Typography variant="body1" className={styles.authFooter}>
                Already have an account?{' '}
                <a href="/login" className={styles.authLink}>
                    Sign in
                </a>
            </Typography>
        </div>
    );
};

export { RegisterPage };