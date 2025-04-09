// src/lib/api.ts
const BASE_URL = "http://localhost:8081/auth";

export const register = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al registrar");
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || "Error en la solicitud de registro");
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || "Error en la solicitud de login");
    }
};