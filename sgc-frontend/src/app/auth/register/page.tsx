"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    passwordHash: "",
    rol: "Investigador",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", formData);
      console.log("Usuario registrado:", response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="passwordHash"
          placeholder="Contraseña"
          value={formData.passwordHash}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Investigador">Investigador</option>
          <option value="Auditor">Auditor</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Registrar
        </button>
      </form>
    </div>
  );
}