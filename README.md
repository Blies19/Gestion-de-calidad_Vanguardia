# Gestion-de-calidad_Vanguardia
```
sgc-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── mx/imt/sgc/
│   │   │       ├── config/         # Configuraciones (seguridad, JPA, etc.)
│   │   │       ├── controller/     # Endpoints REST
│   │   │       ├── entity/         # Entidades JPA (Usuario, Proyecto, etc.)
│   │   │       ├── repository/     # Repositorios JPA
│   │   │       ├── service/        # Lógica de negocio
│   │   │       ├── dto/            # Objetos de transferencia de datos
│   │   │       └── SgcApplication.java  # Clase principal
│   │   └── resources/
│   │       ├── application.properties  # Configuración (DB, JWT, etc.)
│   │       └── static/             # Archivos estáticos (si los necesitas)
│   └── test/                       # Pruebas unitarias
├── pom.xml                        # Dependencias Maven
└── README.md                      # Documentación
```
```
/frontend
  ├── public/                      # Assets estáticos (imágenes, favicon)
  │   ├── images/                  # Imágenes globales
  │   └── docs/                    # PDFs/archivos descargables (opcional)
  │
  ├── src/
  │   ├── app/                     # Ruteo basado en app/ (Next.js 13+)
  │   │   ├── (auth)/              # Grupo de rutas de autenticación
  │   │   │   ├── login/           # Página de inicio de sesión
  │   │   │   │   ├── page.tsx
  │   │   │   │   └── form.tsx     # Componente del formulario reutilizable
  │   │   │   └── signup/          # Página de registro
  │   │   │       ├── page.tsx
  │   │   │       └── form.tsx
  │   │   │
  │   │   ├── (admin)/             # Rutas protegidas para administradores
  │   │   │   ├── dashboard/
  │   │   │   │   └── page.tsx
  │   │   │   └── layout.tsx       # Layout específico para admin
  │   │   │
  │   │   ├── (user)/              # Rutas protegidas para investigadores
  │   │   │   ├── documents/
  │   │   │   │   └── page.tsx
  │   │   │   └── layout.tsx
  │   │   │
  │   │   ├── api/                 # API routes (opcional, para proxies)
  │   │   │   └── auth/[...nextauth]/route.ts
  │   │   │
  │   │   ├── globals.css          # Estilos globales
  │   │   ├── layout.tsx           # Layout raíz
  │   │   └── page.tsx             # Página de inicio (landing)
  │   │
  │   ├── components/              # Componentes reutilizables
  │   │   ├── auth/
  │   │   │   ├── AuthGuard.tsx    # HOC para protección de rutas
  │   │   │   └── SocialButtons.tsx
  │   │   ├── ui/
  │   │   │   ├── button.tsx       # Componentes UI personalizados
  │   │   │   └── table.tsx
  │   │   └── documents/
  │   │       └── UploadModal.tsx
  │   │
  │   ├── contexts/                # Contextos de React
  │   │   └── AuthContext.tsx
  │   │
  │   ├── hooks/                   # Hooks personalizados
  │   │   ├── useAuth.ts
  │   │   └── useDocuments.ts
  │   │
  │   ├── lib/                     # Librerías/utils
  │   │   ├── api/
  │   │   │   └── client.ts        # Cliente HTTP (axios/fetch configurado)
  │   │   └── constants.ts         # Constantes globales
  │   │
  │   ├── styles/                  # Estilos modulares
  │   │   ├── variables.css
  │   │   └── animations.css
  │   │
  │   └── types/                   # Tipos TypeScript
  │       ├── document.ts
  │       └── user.ts
  │
  ├── .env.local                   # Variables de entorno (ej: NEXT_PUBLIC_API_URL)
  ├── next.config.mjs              # Config de Next.js
  ├── tailwind.config.mjs          # Config de Tailwind
  └── tsconfig.json                # Config TypeScript
```
# Flujo de autenticación JWT + carga de Usuario completo

```
[ Frontend (Next.js) ]
        |
        |   (envía email + password)
        v
[ POST /auth/login ]
        |
        | (backend valida usuario y contraseña correctos)
        v
[ Genera Token JWT ]
        |
        | (JWT contiene: email + rol)
        v
[ Frontend guarda JWT en LocalStorage ]
        |
        |   (envía JWT en Authorization: Bearer <token>)
        v
[ Cada request al Backend ]
        |
        v
[ JwtAuthenticationFilter ]
        |
        |-> extrae email y rol del token
        |-> busca en la base de datos el `Usuario` completo usando el email
        |-> si existe:
              - crea Authentication con el `Usuario` completo
              - guarda Authentication en el SecurityContext
        v
[ @AuthenticationPrincipal Usuario usuario ]
        |
        | (Ahora el controlador recibe el objeto completo de Usuario)
        v
[ Controladores seguros funcionando 🚀 ]
```
