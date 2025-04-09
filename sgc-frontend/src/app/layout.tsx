// src/app/layout.tsx
import './globals.css'; // Asegúrate de que esta línea esté presente
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sistema de Gestión de Calidad',
    description: 'Aplicación para gestión de calidad',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}