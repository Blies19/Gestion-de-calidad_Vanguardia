// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';

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
            <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ThemeProvider>
                    <Navbar />
                    <main style={{ flex: 1 }}>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}