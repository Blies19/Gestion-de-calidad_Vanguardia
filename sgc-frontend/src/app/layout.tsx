import './globals.css';
import Navbar from "@/components/Navbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'SkywardServices',
  description: 'Sistema de Gestión de Calidad',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <Navbar /> {/* Aquí renderizamos la barra superior */}
        <main>{children}</main>
      </body>
    </html>
  );
}
