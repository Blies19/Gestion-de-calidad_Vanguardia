// src/app/page.tsx
'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Bienvenido al Sistema de Gestión de Calidad</h1>
            <p>
                <Link href="/auth/login">Iniciar sesión</Link> |{' '}
                <Link href="/auth/register">Registrarse</Link> |{' '}
                <Link href="/dashboard">Ir al Dashboard</Link>
            </p>
        </div>
    );
}