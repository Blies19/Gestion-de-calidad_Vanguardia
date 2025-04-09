// src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { login } from '../../../lib/api'; // Ajustamos la ruta relativa desde auth/login

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            localStorage.setItem('token', response.token); // Guarda el token
            alert('Login exitoso');
            setError('');
            // Redirigir al dashboard o página principal
            window.location.href = '/';
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}