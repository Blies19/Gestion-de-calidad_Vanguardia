"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email || "Usuario");
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail("");
  };

  if (isLoading) {
    return (
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center shadow-lg">
      <Link href="/" className="text-xl font-bold tracking-wide text-white hover:text-blue-300 transition-colors">
        SkywardServices
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="text-blue-200 hover:text-white">Home</Link>
        <Link href="/dashboard/usuarios" className="text-blue-200 hover:text-white">Users</Link>
        <Link href="/documents" className="text-blue-200 hover:text-white">Documents</Link>

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
              className="text-red-400 hover:text-red-300 transition duration-300"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
