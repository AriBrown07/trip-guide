import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1>Вход в систему</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Логин</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введите ваш логин"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль"
                    />
                </div>
                <button type="submit" className={styles.loginButton}>
                    Войти
                </button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </form>
        </div>
    );
};

export { LoginPage };