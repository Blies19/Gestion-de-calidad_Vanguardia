'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:8081/auth/register', formData);
      setMensaje('Registro exitoso');
      setFormData({ nombre: '', correo: '', password: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        {mensaje && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{mensaje}</div>}
        {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}

        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <input
          name="correo"
          type="email"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
