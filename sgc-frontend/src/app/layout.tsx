import './globals.css';

// Define el tipo de las props del componente RootLayout
type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'SkywardServices',
  description: 'Sistema de Gestión de Calidad',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}