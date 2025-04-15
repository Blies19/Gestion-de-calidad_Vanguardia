// src/lib/api.ts
const BASE_URL = "http://localhost:8081/auth";
const API_URL = "http://localhost:8081/api";

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

export const getUsuarios = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token. Por favor, inicia sesión nuevamente.');
        }
        const response = await fetch(`${API_URL}/usuarios`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener usuarios');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || "Error al obtener usuarios");
    }
};

export const createUsuario = async (userData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token. Por favor, inicia sesión nuevamente.');
        }
        const response = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear usuario');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || "Error al crear usuario");
    }
};

export const updateUsuario = async (id, userData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token. Por favor, inicia sesión nuevamente.');
        }
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar usuario');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || "Error al actualizar usuario");
    }
};