# Workshop: Conectar Frontend y Backend para una Lista de Tareas

## Objetivo

Los participantes aprenderán a conectar un formulario web (frontend) con una API Java (backend) para registrar tareas en una lista de "To-Do". Usarán HTML y Tailwind CSS para el frontend, Java (Spring Boot) para el backend, y PostgreSQL para almacenar datos. Al final, tendrán una mini aplicación funcional que podrán probar localmente.

## Audiencia

Principiantes en desarrollo web, con conocimientos básicos de HTML y curiosidad por Java.

## Duración

30 min

## Requisitos

- Computadora con:
  - **Java 17** y **Maven** instalados.
  - **PostgreSQL** instalado y corriendo (o Docker para simplicidad).
  - Editor de código (VS Code recomendado).
  - Navegador web (Chrome, Firefox, etc.).
- Descargar el código base del workshop (proporcionado en un ZIP).

## Agenda

### 1. Introducción (10 minutos)

- **Presentación** (diapositivas simples, descritas abajo):
  - ¿Qué es una lista de tareas y por qué conectar frontend y backend?
  - Tecnologías: HTML, Tailwind CSS, Java (Spring Boot), PostgreSQL.
  - Flujo: Formulario → API Java → Base de datos.
- Demo rápida: Mostrar un formulario que guarda una tarea (ej. "Comprar leche") y confirma el registro.

### 2. Configuración del entorno (10 minutos)

```
todo-workshop/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/todo/
│   │   │       ├── Application.java
│   │   │       ├── model/
│   │   │       │   └── Tarea.java
│   │   │       ├── repository/
│   │   │       │   └── TareaRepository.java
│   │   │       └── controller/
│   │   │           └── TareaController.java
│   │   ├── resources/
│   │   │   └── application.properties
│   │   └── public/
│   │       └── index.html
├── database.sql
├── README.md
```

- **Instalar herramientas**:
  - Verificar Java 17: `java -version`.
  - Verificar Maven: `mvn -version`.
  - Instalar PostgreSQL o usar Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`.
- **Configurar la base de datos**:
  - Conectar a PostgreSQL (con `psql` o pgAdmin).
  - Crear la base de datos y tabla:

    ```sql
    CREATE DATABASE todo_app;
    \c todo_app
    CREATE TABLE tareas (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

- **Preparar el proyecto**:
  - Descargar el ZIP del código base.
  - Estructura:
    - `src/main/java`: Código Java (modelo, repositorio, controlador).
    - `src/main/resources`: Configuración (`application.properties`).
    - `public`: Frontend (`index.html`).
  - Abrir en VS Code y ejecutar `mvn spring-boot:run` para verificar que el servidor inicia.

### 3. Desarrollo de la práctica (30 minutos)

#### a. Crear el formulario con HTML y Tailwind CSS

- **Archivo**: `public/index.html`
- **Código**:

  ```html
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Lista de Tareas</title>
      <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100">
      <div class="container mx-auto mt-10 max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-center">Añadir Tarea</h2>
          <form action="http://localhost:8082/api/tareas" method="POST" class="space-y-4">
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
                      class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Añadir Tarea</button>
          </form>
      </div>
  </body>
  </html>
  ```

- **Explicación**:
  - HTML crea un formulario para `titulo` y `descripcion`.
  - Tailwind CSS (via CDN) estiliza con un diseño limpio y responsive.
  - `action="http://localhost:8080/api/tareas"` envía datos al endpoint Java.
- **Tarea**: Copiar este código en `public/index.html` (incluido en el ZIP).

#### b. Crear el backend con Java (Spring Boot)

- **Estructura del proyecto**:
  - `pom.xml`: Dependencias para Spring Boot, JPA, PostgreSQL.
  - `src/main/java/com/example/todo/model/Tarea.java`: Entidad JPA.
  - `src/main/java/com/example/todo/repository/TareaRepository.java`: Repositorio JPA.
  - `src/main/java/com/example/todo/controller/TareaController.java`: Controlador REST.
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
         <artifactId>todo-workshop</artifactId>
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

  2. **Entidad (Tarea.java)**:

     ```java
     package com.example.todo.model;

     import jakarta.persistence.Entity;
     import jakarta.persistence.GeneratedValue;
     import jakarta.persistence.GenerationType;
     import jakarta.persistence.Id;

     @Entity
     public class Tarea {
         @Id
         @GeneratedValue(strategy = GenerationType.IDENTITY)
         private Long id;
         private String titulo;
         private String descripcion;

         public Tarea() {}
         public Tarea(String titulo, String descripcion) {
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

  3. **Repositorio (TareaRepository.java)**:

     ```java
     package com.example.todo.repository;

     import com.example.todo.model.Tarea;
     import org.springframework.data.jpa.repository.JpaRepository;

     public interface TareaRepository extends JpaRepository<Tarea, Long> {
     }
     ```

  4. **Controlador (TareaController.java)**:

     ```java
     package com.example.todo.controller;

     import com.example.todo.model.Tarea;
     import com.example.todo.repository.TareaRepository;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.web.bind.annotation.PostMapping;
     import org.springframework.web.bind.annotation.RequestParam;
     import org.springframework.web.bind.annotation.RestController;

     @RestController
     public class TareaController {
         @Autowired
         private TareaRepository repo;

         @PostMapping("/api/tareas")
         public String registrar(@RequestParam String titulo, @RequestParam String descripcion) {
             Tarea tarea = new Tarea(titulo, descripcion);
             repo.save(tarea);
             return "¡Tarea registrada!";
         }
     }
     ```

  5. **Configuración (application.properties)**:

     ```
     spring.datasource.url=jdbc:postgresql://localhost:5432/todo_app
     spring.datasource.username=postgres
     spring.datasource.password=postgres
     spring.jpa.hibernate.ddl-auto=update
     spring.web.resources.static-locations=classpath:/public/
     ```

- **Explicación**:
  - `pom.xml`: Configura Spring Boot con web, JPA, y PostgreSQL.
  - `Tarea.java`: Mapea la tabla `tareas`.
  - `TareaRepository.java`: Proporciona métodos CRUD.
  - `TareaController.java`: Crea un endpoint POST `/api/tareas`.
  - `application.properties`: Conecta a PostgreSQL y sirve archivos estáticos.

- **Tarea**: Ejecutar `mvn spring-boot:run` (archivos incluidos en el ZIP).

#### c. Probar la conexión frontend-backend

- **Pasos**:
  1. Iniciar PostgreSQL (o Docker).
  2. Iniciar el servidor: `mvn spring-boot:run`.
  3. Abrir `http://localhost:8080/index.html` en el navegador.
  4. Completar el formulario (ej. título: "Estudiar Java", descripción: "Leer Spring Boot docs").
  5. Enviar y verificar el mensaje "¡Tarea registrada!".
  6. Comprobar en PostgreSQL (con `psql` o pgAdmin):

     ```sql
     SELECT * FROM tareas;
     ```

- **Nota**: Si hay errores, verificar:
  - Servidor en `localhost:8080`.
  - PostgreSQL en puerto 5432 con credenciales `postgres`/`postgres`.
  - Archivo `index.html` en `public`.

### 4. Cierre y Q&A (10 minutos)

- **Resumen**:
  - Cómo el formulario HTML/Tailwind envía datos a una API Java.
  - Cómo Spring Boot guarda datos en PostgreSQL.
- **Siguientes pasos**:
  - Agregar un endpoint para listar tareas.
  - Añadir validaciones en el frontend (JavaScript).
  - Explorar frameworks como Next.js.
- **Preguntas**: Resolver dudas.
- **Recursos**:
  - Spring Boot: `https://spring.io/projects/spring-boot`.
  - Tailwind CSS: `https://tailwindcss.com/docs`.
  - PostgreSQL: `https://www.postgresql.org/docs/`.
  - ZIP del proyecto (proporcionado).

## Materiales

- **Archivos base** (ZIP):
  - `public/index.html`: Formulario.
  - `src/main/java/com/example/todo/model/Tarea.java`: Entidad.
  - `src/main/java/com/example/todo/repository/TareaRepository.java`: Repositorio.
  - `src/main/java/com/example/todo/controller/TareaController.java`: Controlador.
  - `src/main/resources/application.properties`: Configuración.
  - `pom.xml`: Dependencias.
  - `database.sql`: Script SQL.
- **Instrucciones**:
  - Instalar Java 17: `https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html`.
  - Instalar Maven: `https://maven.apache.org/download.cgi`.
  - Instalar PostgreSQL: `https://www.postgresql.org/download/` o Docker: `https://hub.docker.com/_/postgres`.
  - Pasos para ejecutar el proyecto.
- **Diapositivas**: Ver abajo.

## Notas para el facilitador

- **Preparación**:
  - Probar el proyecto localmente.
  - Distribuir el ZIP con antelación.
  - Recomendar instalar Java, Maven, y PostgreSQL antes.
- **Explicación**:
  - Mostrar el flujo: formulario → API → base de datos.
  - Usar analogías (ej. "el formulario es un mensaje que Java guarda en un cuaderno").
  - Demostrar el formulario y la tabla en PostgreSQL.
- **Soporte**:
  - Ayudar con errores (puertos 8080/5432, credenciales).
  - Tener el ZIP en un USB.
