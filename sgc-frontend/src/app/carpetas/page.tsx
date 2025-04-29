"use client";

import { useEffect, useState } from "react";

interface Carpeta {
  idCarpeta: string;
  nombre: string;
}

export default function CarpetasPage() {
  const [carpetas, setCarpetas] = useState<Carpeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarpetas = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/carpetas");
        if (!res.ok) throw new Error("Error al cargar carpetas");
        const data = await res.json();
        setCarpetas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarpetas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carpetas</h1>
      {loading ? (
        <p>Cargando carpetas...</p>
      ) : (
        <ul className="space-y-2">
          {carpetas.map((carpeta) => (
            <li key={carpeta.idCarpeta} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{carpeta.nombre}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
