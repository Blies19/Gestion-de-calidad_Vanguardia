# Gestion-de-calidad_Vanguardia
```
backend/
├── src/main/java/com/sgc/backend
│   ├── config/             # Configuración de seguridad, CORS, JWT, etc.
│   ├── controllers/        # Controladores REST
│   ├── services/           # Lógica de negocio
│   ├── repositories/       # Acceso a datos con JPA
│   ├── models/             # Entidades de la BD
│   ├── dtos/               # DTOs para transferencia de datos
│   ├── utils/              # Clases utilitarias
│   ├── exceptions/         # Manejo de errores globales
├── pom.xml                 # Dependencias de Maven
├── application.properties   # Configuración del sistema
```
```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables (Navbar, Sidebar, etc.)
│   ├── pages/               # Rutas principales
│   ├── services/            # Llamadas a API
│   ├── hooks/               # Custom hooks para React Query
│   ├── context/             # Manejo de autenticación y estado global
│   ├── styles/              # Estilos globales con Tailwind
├── package.json             # Dependencias del proyecto
├── tailwind.config.js       # Configuración de Tailwind
├── next.config.js           # Configuración de Next.js
```
