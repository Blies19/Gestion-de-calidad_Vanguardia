// src/app/page.tsx
'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenido al Sistema de Gestion de calidad</h1>
            <p style={styles.subtitle}>
                Gestiona tus archivos de manera eficiente y segura.
            </p>
            <div style={styles.links}>
                <Link href="/auth/login" style={styles.link}>Iniciar sesión</Link>
                <Link href="/auth/register" style={styles.link}>Registrarse</Link>
                <Link href="/dashboard" style={styles.link}>Ir al Dashboard</Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    title: {
        fontSize: '40px',
        fontWeight: '600',
        marginBottom: '20px',
        color: 'var(--primary)',
        fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
        fontSize: '18px',
        marginBottom: '40px',
        color: 'var(--text)',
        lineHeight: '1.6',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    link: {
        padding: '12px 24px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        transition: 'background-color 0.3s',
        fontWeight: '500',
    },
};