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
import { Switch } from "@/components/ui/switch";

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
  const [refreshOnUpload, setRefreshOnUpload] = useState<boolean>(true);
  const router = useRouter();

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("http://localhost:8081/api/proyectos", { headers }),
      fetch("http://localhost:8081/api/carpetas", { headers }),
    ])
      .then(async ([proyectosRes, carpetasRes]) => {
        if (!proyectosRes.ok || !carpetasRes.ok) throw new Error();
        const proyectosData = await proyectosRes.json();
        const carpetasData = await carpetasRes.json();
        setProyectos(proyectosData);
        setCarpetas(carpetasData);
      })
      .catch(() => setError("Error cargando proyectos o carpetas"));
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedCarpeta || !selectedProyecto) {
      setError("Selecciona todos los campos e intenta de nuevo");
      return;
    }

    const headers = getAuthHeaders();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("carpetaId", selectedCarpeta);
    formData.append("proyectoId", selectedProyecto);

    try {
      const res = await fetch("http://localhost:8081/api/documentos/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) throw new Error();
      const newDoc = await res.json();
      if (refreshOnUpload) loadDocumentos(selectedCarpeta);
      else setDocumentos((prev) => [...prev, newDoc]);
    } catch {
      setError("Error al subir documento");
    }
  };

  const loadDocumentos = (carpetaId: string) => {
    const headers = getAuthHeaders();
    fetch(`http://localhost:8081/api/documentos?carpetaId=${carpetaId}`, { headers })
      .then((res) => {
        if (res.status === 403) {
          router.push("/auth/login");
          return null;
        }
        return res.json();
      })
      .then((data) => data && setDocumentos(data))
      .catch(() => setError("Error al cargar documentos"));
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Gestión de Documentos</h1>
      {error && <p className="text-red-400 font-medium mb-4">{error}</p>}

      <form
        onSubmit={handleUpload}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 shadow-md"
      >
        <div>
          <Label className="text-white">Selecciona una carpeta</Label>
          <Select onValueChange={(v) => { setSelectedCarpeta(v); loadDocumentos(v); }}>
            <SelectTrigger className="bg-gray-900 text-white border border-gray-600">
              <SelectValue placeholder="Carpeta" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {carpetas.map((c) => (
                <SelectItem key={c.idCarpeta} value={c.idCarpeta}>{c.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Selecciona un proyecto</Label>
          <Select onValueChange={(v) => setSelectedProyecto(v)}>
            <SelectTrigger className="bg-gray-900 text-white border border-gray-600">
              <SelectValue placeholder="Proyecto" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {proyectos.map((p) => (
                <SelectItem key={p.idProyecto} value={p.idProyecto}>{p.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Archivo</Label>
          <Input
            type="file"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="bg-gray-900 text-white border border-gray-600"
          />
        </div>

        <div className="flex items-center gap-3 col-span-full">
        <Switch checked={refreshOnUpload} onChange={(value) => setRefreshOnUpload(value)} />

          <Label className="text-white">Recargar documentos al subir</Label>
        </div>

        <div className="col-span-full">
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Subir documento
          </Button>
        </div>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentos.map((doc) => (
          <Card
            key={doc.idDocumento}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-1">{doc.nombre}</h2>
              <p className="text-sm text-gray-300 mb-1">Proyecto: {doc.proyecto.nombre}</p>
              <p className="text-sm text-gray-400 mb-3">
                Subido: {new Date(doc.fechaSubida).toLocaleString()}
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
