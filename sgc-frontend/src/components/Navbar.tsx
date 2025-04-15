// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link href="/" style={styles.logoLink}>
                    <span style={styles.logoText}>SkywardServices</span>
                </Link>
            </div>
            <div style={styles.links}>
                <Link href="/" style={styles.link}>Inicio</Link>
                {!token ? (
                    <>
                        <Link href="/auth/register" style={styles.link}>Registrarse</Link>
                        <Link href="/auth/login" style={styles.link}>Iniciar sesión</Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" style={styles.link}>Dashboard</Link>
                        <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
                    </>
                )}
                <button onClick={toggleTheme} style={styles.themeButton}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        backgroundColor: 'var(--navbar-bg)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow)',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    logoLink: {
        color: 'white',
        textDecoration: 'none',
    },
    logoText: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '600',
    },
    links: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '8px 12px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    logoutButton: {
        backgroundColor: 'var(--danger)',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    themeButton: {
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        padding: '8px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '20px',
    },
};