// src/app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import { register } from '../../../lib/api';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        passwordHash: '',
        rol: 'Admin', // Valor inicial
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Registro exitoso');
            setError('');
            window.location.href = '/auth/login';
        } catch (err) {
            setError(err.message || 'Error al registrar');
        }
    };

    return (
        <div>
            <h1>Crear cuenta</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                />
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
                    name="passwordHash"
                    placeholder="Contraseña"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    required
                />
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="Admin">Admin</option>
                    <option value="Investigador">Investigador</option>
                    <option value="Auditor">Auditor</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}