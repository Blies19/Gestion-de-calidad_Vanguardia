// Archivo: src/app/documents/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Proyecto {
  idProyecto: string;
  nombre: string;
}

interface Carpeta {
  idCarpeta: string;
  nombre: string;
}

interface Documento {
  idDocumento: string;
  nombre: string;
  proyecto: Proyecto;
  fechaSubida: string;
}

export default function DocumentsPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [carpetas, setCarpetas] = useState<Carpeta[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [selectedCarpeta, setSelectedCarpeta] = useState<string>("");
  const [selectedProyecto, setSelectedProyecto] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth/login");

    fetch("http://localhost:8081/api/proyectos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProyectos)
      .catch(() => setError("Error cargando proyectos"));

    fetch("http://localhost:8081/api/carpetas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setCarpetas)
      .catch(() => setError("Error cargando carpetas"));
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedCarpeta || !selectedProyecto) {
      setError("Selecciona todos los campos e intenta de nuevo");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("carpetaId", selectedCarpeta);
    formData.append("proyectoId", selectedProyecto);

    try {
      const res = await fetch("http://localhost:8081/api/documentos/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir documento");
      const newDoc = await res.json();
      setDocumentos((prev) => [...prev, newDoc]);
    } catch {
      setError("Error al subir documento");
    }
  };

  const loadDocumentos = (carpetaId: string) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8081/api/documentos?carpetaId=${carpetaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setDocumentos)
      .catch(() => setError("Error al cargar documentos"));
  };

  return (
    <main className="p-6 bg-gray-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Gestión de Documentos</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleUpload}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6"
      >
        <div>
          <Label>Selecciona una carpeta</Label>
          <Select onValueChange={(v) => {
            setSelectedCarpeta(v);
            loadDocumentos(v);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Carpeta" />
            </SelectTrigger>
            <SelectContent>
              {carpetas.map((c) => (
                <SelectItem key={c.idCarpeta} value={c.idCarpeta}>{c.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Selecciona un proyecto</Label>
          <Select onValueChange={setSelectedProyecto}>
            <SelectTrigger>
              <SelectValue placeholder="Proyecto" />
            </SelectTrigger>
            <SelectContent>
              {proyectos.map((p) => (
                <SelectItem key={p.idProyecto} value={p.idProyecto}>{p.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Archivo</Label>
          <Input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
        </div>
        <Button type="submit">Subir documento</Button>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentos.map((doc) => (
          <Card key={doc.idDocumento} className="bg-gray-800">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{doc.nombre}</h2>
              <p className="text-sm text-gray-400">Proyecto: {doc.proyecto.nombre}</p>
              <p className="text-sm text-gray-500">Subido: {new Date(doc.fechaSubida).toLocaleString()}</p>
              <Button
                className="mt-4"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  fetch(`http://localhost:8081/api/documentos/download/${doc.idDocumento}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = doc.nombre;
                      a.click();
                    });
                }}
              >
                Descargar
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
