"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Forzar el tema oscuro al cargar la página
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 tracking-tight animate-fadeIn">
          Bienvenido al Sistema de Gestión de calidad
        </h2>
        <p className="text-gray-400 mb-8 text-lg md:text-xl text-center max-w-2xl animate-fadeIn animation-delay-200">
          Gestiona tus archivos de manera eficiente y segura.
        </p>
        {!isAuthenticated ? (
          <div className="space-x-4 animate-fadeIn animation-delay-400">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Registrarse
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Ir al DASHBOARD
            </Link>
          </div>
        ) : (
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md animate-fadeIn animation-delay-400"
          >
            Ir al DASHBOARD
          </Link>
        )}
      </main>
      <footer className="bg-blue-600 p-4 text-center shadow-inner">
        <p className="text-sm text-white">
          © 2025 SkywardServices. Todos los derechos reservados.{" "}
          <Link href="/about" className="underline hover:text-blue-300">
            Acerca de
          </Link>{" "}
          <Link href="/contact" className="underline hover:text-blue-300">
            Contacto
          </Link>
        </p>
      </footer>
    </div>
  );
}