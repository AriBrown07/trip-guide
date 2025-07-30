import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Button, Typography, Tabs, Tab, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/Auth/auth.service';
import axios, { AxiosError } from 'axios';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);

  useEffect(() => {
    let strength = 0;
    if (registerForm.password.length > 0) strength += 1;
    if (registerForm.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(registerForm.password)) strength += 1;
    if (/[0-9]/.test(registerForm.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(registerForm.password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [registerForm.password]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setLoginError('');
    setRegisterErrors({});
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (loginError) setLoginError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginSubmitting) return;

    setIsLoginSubmitting(true);
    setLoginError('');

    try {
      await authService.login(loginForm.username, loginForm.password);
      onClose();
      navigate('/');
    } catch (error) {
      setLoginError('Неверный логин или пароль');
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));

    if (registerErrors[name]) {
      setRegisterErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateRegistration = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (registerForm.username.length < 3) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
    }
    
    if (registerForm.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Пароль слишком слабый';
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (registerForm.email && !/^\S+@\S+\.\S+$/.test(registerForm.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }
    
    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegistration() || isRegisterSubmitting) return;
    
    setIsRegisterSubmitting(true);
    setRegisterErrors({});
    
    try {
      await authService.register({
        username: registerForm.username,
        password: registerForm.password,
        email: registerForm.email
      });
      
      // Switch to login tab and show success message
      setTabValue(0);
      setLoginError('');
      // You could add a success message here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.response?.status === 400) {
          const responseData = axiosError.response.data as any;
          
          if (responseData.errors) {
            const validationErrors: Record<string, string> = {};
            Object.entries(responseData.errors).forEach(([key, value]) => {
              validationErrors[key.toLowerCase()] = (value as string[]).join(' ');
            });
            setRegisterErrors(validationErrors);
          } else if (responseData.title) {
            setRegisterErrors({ submit: responseData.title });
          } else {
            setRegisterErrors({ submit: responseData || 'Ошибка валидации' });
          }
        } else {
          setRegisterErrors({ submit: axiosError.message });
        }
      } else {
        setRegisterErrors({ submit: 'Регистрация не удалась. Попробуйте еще раз.' });
      }
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Очень слабый';
      case 2:
        return 'Слабый';
      case 3:
        return 'Средний';
      case 4:
        return 'Сильный';
      case 5:
        return 'Очень сильный';
      default:
        return '';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ className: styles.modalPaper }}
      BackdropProps={{ className: styles.backdrop }}
    >
      <DialogTitle className={styles.modalTitle}>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className={styles.modalContent}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs">
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>
        </Box>

        {/* Login Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" className={styles.tabTitle}>
            Вход в систему
          </Typography>
          
          <form onSubmit={handleLogin} className={styles.authForm}>
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Логин
              </Typography>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginInputChange}
                className={styles.formInput}
                placeholder="Введите ваш логин"
                disabled={isLoginSubmitting}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Пароль
              </Typography>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                className={styles.formInput}
                placeholder="Введите ваш пароль"
                disabled={isLoginSubmitting}
                required
              />
            </div>
            
            {loginError && (
              <Typography color="error" className={styles.error}>
                {loginError}
              </Typography>
            )}
            
            <Button 
              type="submit" 
              variant="contained" 
              className={styles.submitButton}
              fullWidth
              disabled={isLoginSubmitting}
            >
              {isLoginSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" className={styles.tabTitle}>
            Создание аккаунта
          </Typography>
          
          {registerErrors.submit && (
            <Typography color="error" className={styles.error}>
              {registerErrors.submit}
            </Typography>
          )}
          
          <form onSubmit={handleRegister} className={styles.authForm}>
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Имя пользователя
              </Typography>
              <input
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterInputChange}
                className={styles.formInput}
                placeholder="Введите имя пользователя"
                disabled={isRegisterSubmitting}
                required
              />
              {registerErrors.username && (
                <Typography color="error" className={styles.error}>
                  {registerErrors.username}
                </Typography>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Email (опционально)
              </Typography>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterInputChange}
                className={styles.formInput}
                placeholder="Введите ваш email"
                disabled={isRegisterSubmitting}
              />
              {registerErrors.email && (
                <Typography color="error" className={styles.error}>
                  {registerErrors.email}
                </Typography>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Пароль
              </Typography>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterInputChange}
                className={styles.formInput}
                placeholder="Создайте пароль"
                disabled={isRegisterSubmitting}
                required
              />
              <div className={styles.passwordStrengthContainer}>
                <div 
                  className={styles.passwordStrength} 
                  data-strength={passwordStrength}
                />
                {registerForm.password && (
                  <Typography variant="caption" className={styles.passwordStrengthText}>
                    Надежность: {getPasswordStrengthText()}
                  </Typography>
                )}
              </div>
              {registerErrors.password && (
                <Typography color="error" className={styles.error}>
                  {registerErrors.password}
                </Typography>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <Typography variant="subtitle1" className={styles.formLabel}>
                Подтвердите пароль
              </Typography>
              <input
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterInputChange}
                className={styles.formInput}
                placeholder="Подтвердите ваш пароль"
                disabled={isRegisterSubmitting}
                required
              />
              {registerErrors.confirmPassword && (
                <Typography color="error" className={styles.error}>
                  {registerErrors.confirmPassword}
                </Typography>
              )}
            </div>
            
            <Button 
              type="submit" 
              variant="contained" 
              className={styles.submitButton}
              fullWidth
              disabled={isRegisterSubmitting}
            >
              {isRegisterSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;