'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const correo = formData.get('correo') as string;
    const contraseña = formData.get('contraseña') as string;

    // Mock de autenticación (simula una API)
    if (correo === 'admin@sgc.com' && contraseña === '123456') {
      localStorage.setItem('token', 'mock-token-123'); // Simula JWT
      router.push('/dashboard'); // Redirige al dashboard
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login SGC</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="correo">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="w-full px-3 py-2 border rounded"
            placeholder="admin@sgc.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="contraseña">
            Contraseña:
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            className="w-full px-3 py-2 border rounded"
            placeholder="123456"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Ingresar
        </button>

        <div className="mt-4 text-center">
          <a 
            href="/auth/signup" 
            className="text-blue-500 hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}