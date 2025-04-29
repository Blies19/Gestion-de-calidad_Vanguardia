"use client";

import React, { useState, useEffect } from "react";
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

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Gestión de Usuarios</h2>

      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-800">
            <tr>
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
              <tr key={user.id_usuario} className="hover:bg-gray-700">
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
      </div>
    </div>
  );
}
