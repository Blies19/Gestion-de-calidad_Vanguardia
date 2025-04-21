"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

// Definir el tipo para los usuarios
interface User {
  id_usuario: string;
  nombre: string;
  apellido: string | null;
  email: string;
  rol: string;
  fecha_registro: string;
  activo: boolean;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    setIsAuthenticated(true);
    setUserEmail(email || "Usuario");

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error(err);
        } else {
          setError("Error desconocido al obtener usuarios");
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail("");
    router.push("/");
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SkywardServices - Dashboard</h1>
        <nav className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <div className="flex items-center space-x-2">
                <FaUser className="text-white bg-blue-500 p-1 rounded-full" />
                <span className="text-white hover:text-blue-300 transition-colors">
                  {userEmail}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Fecha de Registro</th>
              <th className="border p-2">Activo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario} className="border">
                <td className="border p-2">{user.id_usuario}</td>
                <td className="border p-2">{user.nombre}</td>
                <td className="border p-2">{user.apellido || "N/A"}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.rol}</td>
                <td className="border p-2">{new Date(user.fecha_registro).toLocaleString()}</td>
                <td className="border p-2">{user.activo ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}