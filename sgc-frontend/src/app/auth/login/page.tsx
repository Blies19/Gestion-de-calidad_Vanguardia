"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error en el login:", err);
      } else {
        setError("Error al iniciar sesión");
        console.error("Error en el login:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mb-6">
          <label
            className="block text-gray-300 mb-2 font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 mb-2 font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}