// sgc-frontend/lib/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"; // Ajusta si usas proxy

export async function post<T>(path: string, data: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en la solicitud");
  }

  return res.json();
}
