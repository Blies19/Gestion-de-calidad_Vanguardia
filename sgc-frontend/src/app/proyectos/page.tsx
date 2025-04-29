"use client";

import { useEffect, useState } from "react";

interface Proyecto {
  idProyecto: string;
  nombre: string;
  descripcion: string;
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/proyectos");
        if (!res.ok) throw new Error("Error al cargar proyectos");
        const data = await res.json();
        setProyectos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <ul className="space-y-2">
          {proyectos.map((proyecto) => (
            <li key={proyecto.idProyecto} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{proyecto.nombre}</h2>
              <p className="text-gray-600">{proyecto.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
