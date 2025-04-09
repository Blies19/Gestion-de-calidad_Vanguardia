// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8081/api/usuarios', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Error al obtener usuarios');
                const data = await response.json();
                setUsuarios(data);
            } catch (err) {
                setError(err.message || 'Error al cargar usuarios');
            }
        };
        fetchUsuarios();
    }, []);

    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard</h1>
                {error && <div className="error">{error}</div>}
                <h2>Lista de Usuarios</h2>
                <ul>
                    {usuarios.map((usuario: any) => (
                        <li key={usuario.id}>
                            {usuario.nombre} {usuario.apellido} - {usuario.email} ({usuario.rol})
                        </li>
                    ))}
                </ul>
            </div>
        </ProtectedRoute>
    );
}
