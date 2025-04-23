# Workshop: Conectar Frontend y Backend para Registrar Documentos en un SGC

## Objetivo

Los participantes aprenderán a conectar un formulario web (frontend) con una API Java (backend) para registrar documentos en un Sistema de Gestión de Calidad (SGC). Usarán HTML y Tailwind CSS para el frontend, Java (Spring Boot) para el backend, y PostgreSQL para almacenar datos. Al final, tendrán una mini aplicación funcional que podrán probar localmente.

## Audiencia

Principiantes en desarrollo web, con conocimientos básicos de HTML y curiosidad por Java.

## Duración

1 hora

## Requisitos

- Computadora con:
  - **Java 17** y **Maven** instalados.
  - **PostgreSQL** instalado y corriendo (o Docker para simplicidad).
  - Editor de código (VS Code o IntelliJ recomendado).
  - Navegador web (Chrome, Firefox, etc.).
- Descargar el código base del workshop (proporcionado en un ZIP o repositorio).

## Agenda

### 1. Introducción (10 minutos)

- **Presentación**: Usar las diapositivas (artefacto `1e33f6f8-8271-46c5-a471-7b4578c8e264`, adaptadas a Tailwind/PostgreSQL si es necesario) para explicar:
  - ¿Qué es un SGC y por qué gestionar documentos?
  - Tecnologías: HTML, Tailwind CSS, Java (Spring Boot), PostgreSQL.
  - Flujo: Formulario → API Java → Base de datos.
- Demo rápida: Mostrar un formulario que guarda un documento y confirma el registro.

### 2. Configuración del entorno (10 minutos)

- **Instalar herramientas**:
  - Verificar Java 17: `java -version`.
  - Verificar Maven: `mvn -version`.
  - Instalar PostgreSQL (o usar Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`).
- **Configurar la base de datos**:
  - Conectar a PostgreSQL (con `psql` o pgAdmin).
  - Crear la base de datos y tabla:

    ```sql
    CREATE DATABASE sgc_vanguardia;
    \c sgc_vanguardia
    CREATE TABLE documentos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

- **Preparar el proyecto**:
  - Descargar el ZIP del código base (o clonar el repositorio).
  - Estructura del proyecto:
    - `src/main/java`: Código Java (modelo, repositorio, controlador).
    - `src/main/resources`: Configuración (`application.properties`).
    - `public`: Frontend (`index.html`).
  - Abrir en VS Code/IntelliJ y ejecutar `mvn spring-boot:run` para verificar que el servidor inicia.

### 3. Desarrollo de la práctica (30 minutos)

#### a. Crear el formulario con HTML y Tailwind CSS

- **Archivo**: `public/index.html`
- **Código**:

  ```html
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Registrar Documento - SGC</title>
      <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100">
      <div class="container mx-auto mt-10 max-w-lg">
          <h2 class="text-2xl font-bold mb-6 text-center">Registrar Documento</h2>
          <form action="http://localhost:8080/api/documentos" method="POST" class="space-y-4">
              <div>
                  <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
                  <input type="text" id="titulo" name="titulo" required
                         class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                  <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea id="descripcion" name="descripcion" rows="4"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <button type="submit"
                      class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Guardar</button>
          </form>
      </div>
  </body>
  </html>
  ```

- **Explicación**:
  - HTML define un formulario con campos `titulo` y `descripcion`.
  - Tailwind CSS (via CDN) estiliza el formulario con un diseño limpio y responsive.
  - `action="http://localhost:8080/api/documentos"` envía los datos al endpoint Java.
- **Tarea**: Copiar este código en `public/index.html` (incluido en el ZIP).

#### b. Crear el backend con Java (Spring Boot)

- **Estructura del proyecto**:
  - `pom.xml`: Dependencias para Spring Boot, JPA, y PostgreSQL.
  - `src/main/java/com/example/sgc/model/Documento.java`: Entidad JPA.
  - `src/main/java/com/example/sgc/repository/DocumentoRepository.java`: Repositorio JPA.
  - `src/main/java/com/example/sgc/controller/DocumentoController.java`: Controlador REST.
  - `src/main/resources/application.properties`: Configuración de PostgreSQL.

- **Archivos clave**:

  1. **POM (pom.xml)**:

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <project xmlns="http://maven.apache.org/POM/4.0.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
         <modelVersion>4.0.0</modelVersion>
         <groupId>com.example</groupId>
         <artifactId>sgc-workshop</artifactId>
         <version>0.0.1-SNAPSHOT</version>
         <parent>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-parent</artifactId>
             <version>3.2.5</version>
         </parent>
         <dependencies>
             <dependency>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-starter-web</artifactId>
             </dependency>
             <dependency>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-starter-data-jpa</artifactId>
             </dependency>
             <dependency>
                 <groupId>org.postgresql</groupId>
                 <artifactId>postgresql</artifactId>
                 <scope>runtime</scope>
             </dependency>
         </dependencies>
         <build>
             <plugins>
                 <plugin>
                     <groupId>org.springframework.boot</groupId>
                     <artifactId>spring-boot-maven-plugin</artifactId>
                 </plugin>
             </plugins>
         </build>
     </project>
     ```

  2. **Entidad (Documento.java)**:

     ```java
     package com.example.sgc.model;

     import jakarta.persistence.Entity;
     import jakarta.persistence.GeneratedValue;
     import jakarta.persistence.GenerationType;
     import jakarta.persistence.Id;

     @Entity
     public class Documento {
         @Id
         @GeneratedValue(strategy = GenerationType.IDENTITY)
         private Long id;
         private String titulo;
         private String descripcion;

         public Documento() {}
         public Documento(String titulo, String descripcion) {
             this.titulo = titulo;
             this.descripcion = descripcion;
         }

         // Getters y setters
         public Long getId() { return id; }
         public void setId(Long id) { this.id = id; }
         public String getTitulo() { return titulo; }
         public void setTitulo(String titulo) { this.titulo = titulo; }
         public String getDescripcion() { return descripcion; }
         public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
     }
     ```

  3. **Repositorio (DocumentoRepository.java)**:

     ```java
     package com.example.sgc.repository;

     import com.example.sgc.model.Documento;
     import org.springframework.data.jpa.repository.JpaRepository;

     public interface DocumentoRepository extends JpaRepository<Documento, Long> {
     }
     ```

  4. **Controlador (DocumentoController.java)**:

     ```java
     package com.example.sgc.controller;

     import com.example.sgc.model.Documento;
     import com.example.sgc.repository.DocumentoRepository;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.web.bind.annotation.PostMapping;
     import org.springframework.web.bind.annotation.RequestParam;
     import org.springframework.web.bind.annotation.RestController;

     @RestController
     public class DocumentoController {
         @Autowired
         private DocumentoRepository repo;

         @PostMapping("/api/documentos")
         public String registrar(@RequestParam String titulo, @RequestParam String descripcion) {
             Documento doc = new Documento(titulo, descripcion);
             repo.save(doc);
             return "¡Documento registrado!";
         }
     }
     ```

  5. **Configuración (application.properties)**:

     ```
     spring.datasource.url=jdbc:postgresql://localhost:5432/sgc_vanguardia
     spring.datasource.username=postgres
     spring.datasource.password=postgres
     spring.jpa.hibernate.ddl-auto=update
     spring.web.resources.static-locations=classpath:/public/
     ```

- **Explicación**:
  - `pom.xml`: Incluye dependencias para Spring Boot, JPA, y PostgreSQL.
  - `Documento.java`: Mapea la tabla `documentos` con JPA.
  - `DocumentoRepository.java`: Proporciona métodos CRUD.
  - `DocumentoController.java`: Define un endpoint POST `/api/documentos` para guardar documentos.
  - `application.properties`: Configura la conexión a PostgreSQL y sirve archivos estáticos desde `public`.

- **Tarea**: Los archivos están en el ZIP. Ejecutar `mvn spring-boot:run`.

#### c. Probar la conexión frontend-backend

- **Pasos**:
  1. Iniciar PostgreSQL (o el contenedor Docker).
  2. Iniciar el servidor: `mvn spring-boot:run`.
  3. Abrir `http://localhost:8080/index.html` en el navegador.
  4. Completar el formulario (ej. título: "Manual de Investigación", descripción: "Protocolo de prueba").
  5. Enviar el formulario y verificar el mensaje "¡Documento registrado!".
  6. Comprobar en PostgreSQL (con `psql` o pgAdmin) que el documento se guardó:

     ```sql
     SELECT * FROM documentos;
     ```

- **Nota**: Si el formulario no funciona, verificar:
  - Servidor en `localhost:8080`.
  - PostgreSQL corriendo con credenciales correctas (`postgres`/`postgres`).
  - Puerto 5432 disponible.

### 4. Cierre y Q&A (10 minutos)

- **Resumen**:
  - Cómo el formulario (HTML/Tailwind) envía datos a la API Java.
  - Cómo Spring Boot procesa y guarda datos en PostgreSQL.
- **Siguientes pasos**:
  - Agregar un endpoint para listar documentos.
  - Implementar autenticación JWT (como en la documentación).
  - Migrar el frontend a Next.js (como en el proyecto real).
- **Preguntas**: Resolver dudas.
- **Recursos**:
  - Spring Boot: `https://spring.io/projects/spring-boot`.
  - Tailwind CSS: `https://tailwindcss.com/docs`.
  - PostgreSQL: `https://www.postgresql.org/docs/`.
  - Repositorio del workshop (proporcionado).

## Materiales

- **Archivos base** (ZIP o repositorio):
  - `public/index.html`: Formulario.
  - `src/main/java/com/example/sgc/model/Documento.java`: Entidad.
  - `src/main/java/com/example/sgc/repository/DocumentoRepository.java`: Repositorio.
  - `src/main/java/com/example/sgc/controller/DocumentoController.java`: Controlador.
  - `src/main/resources/application.properties`: Configuración.
  - `pom.xml`: Dependencias.
  - `database.sql`: Script SQL.
- **Instrucciones**:
  - Instalar Java 17: `https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html`.
  - Instalar Maven: `https://maven.apache.org/download.cgi`.
  - Instalar PostgreSQL: `https://www.postgresql.org/download/` o Docker: `https://hub.docker.com/_/postgres`.
  - Pasos para ejecutar el proyecto.
- **Diapositivas**: Usar la presentación (artefacto `1e33f6f8-8271-46c5-a471-7b4578c8e264`), adaptándola a Tailwind/PostgreSQL si es necesario.

## Notas para el facilitador

- **Preparación**:
  - Probar el proyecto localmente (Java, Maven, PostgreSQL, navegador).
  - Distribuir el ZIP/repositorio con antelación.
  - Recomendar instalar herramientas antes del workshop.
- **Explicación**:
  - Mostrar el flujo: formulario → API → base de datos.
  - Usar analogías (ej. "el formulario envía un mensaje que Java guarda en un archivo").
  - Demostrar el formulario y la tabla en PostgreSQL.
- **Soporte**:
  - Ayudar con errores (puerto 8080/5432 ocupado, credenciales de PostgreSQL).
  - Tener el ZIP en un USB como respaldo.