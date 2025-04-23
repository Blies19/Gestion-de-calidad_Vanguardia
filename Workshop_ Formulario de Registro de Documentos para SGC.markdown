# Workshop: Crear un Formulario de Registro de Documentos para un SGC con HTML, Bootstrap y PHP

## Objetivo

Los participantes aprenderán a crear un formulario web para registrar documentos en un Sistema de Gestión de Calidad, usando HTML, Bootstrap para el diseño, PHP para procesar los datos, y MySQL para almacenarlos. Al final, tendrán una mini aplicación funcional que podrán probar en sus equipos.

## Audiencia

Principiantes en desarrollo web, con conocimientos básicos de HTML y curiosidad por PHP y bases de datos.

## Duración

1 hora

## Requisitos

- Computadora con:
  - **XAMPP** (para servidor local con Apache, PHP, y MySQL).
  - Editor de código (VS Code recomendado).
  - Navegador web (Chrome, Firefox, etc.).
- Descargar el código base del workshop (proporcionado en un ZIP o clonado desde un repositorio).

## Agenda

### 1. Introducción (10 minutos)

- **Qué es un SGC**: Explicación breve de un Sistema de Gestión de Calidad y la importancia de gestionar documentos.
- **Tecnologías usadas**:
  - HTML: Estructura del formulario.
  - Bootstrap: Diseño responsive y estilizado.
  - PHP: Procesar el formulario y guardar datos.
  - MySQL: Almacenar los documentos.
- Demo rápida de la mini aplicación que construiremos (un formulario para registrar un documento con título y descripción).

### 2. Configuración del entorno (10 minutos)

- Instalar XAMPP y verificar que Apache y MySQL estén corriendo.
- Crear una base de datos en phpMyAdmin:

  ```sql
  CREATE DATABASE sgc_vanguardia;
  USE sgc_vanguardia;
  CREATE TABLE documentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- Crear una carpeta `sgc_workshop` en `htdocs` de XAMPP y copiar los archivos base (proporcionados).

### 3. Desarrollo de la práctica (30 minutos)

#### a. Crear el formulario con HTML y Bootstrap

- Archivo: `index.html`
- Código:

  ```html
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Registrar Documento - SGC</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
      <div class="container mt-5">
          <h2>Registrar Documento</h2>
          <form action="procesar.php" method="POST">
              <div class="mb-3">
                  <label for="titulo" class="form-label">Título</label>
                  <input type="text" class="form-control" id="titulo" name="titulo" required>
              </div>
              <div class="mb-3">
                  <label for="descripcion" class="form-label">Descripción</label>
                  <textarea class="form-control" id="descripcion" name="descripcion" rows="4"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Guardar</button>
          </form>
      </div>
  </body>
  </html>
  ```
- Explicación: Estructura HTML con Bootstrap para un formulario estilizado. El formulario envía datos a `procesar.php` vía POST.

#### b. Procesar el formulario con PHP

- Archivo: `procesar.php`
- Código:

  ```php
  <?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "sgc_vanguardia";
  
  // Crear conexión
  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // Verificar conexión
  if ($conn->connect_error) {
      die("Conexión fallida: " . $conn->connect_error);
  }
  
  // Obtener datos del formulario
  $titulo = $_POST['titulo'];
  $descripcion = $_POST['descripcion'];
  
  // Insertar en la base de datos
  $sql = "INSERT INTO documentos (titulo, descripcion) VALUES ('$titulo', '$descripcion')";
  if ($conn->query($sql) === TRUE) {
      echo "<div class='alert alert-success'>Documento registrado con éxito!</div>";
  } else {
      echo "<div class='alert alert-danger'>Error: " . $conn->error . "</div>";
  }
  
  $conn->close();
  ?>
  <a href="index.html" class="btn btn-secondary">Volver</a>
  ```
- Explicación: Conexión a MySQL, recepción de datos del formulario, e inserción en la tabla `documentos`. Muestra un mensaje de éxito o error.

#### c. Probar la aplicación

- Abrir `http://localhost/sgc_workshop/index.html` en el navegador.
- Completar el formulario y verificar que el documento se guarde en la base de datos (usando phpMyAdmin).
- Comprobar el mensaje de éxito en `procesar.php`.

### 4. Cierre y Q&A (10 minutos)

- **Resumen**:
  - Cómo se conectan HTML, Bootstrap, PHP, y MySQL en un SGC.
  - Importancia de validar datos (breve mención para futuros talleres).
- **Siguientes pasos**:
  - Agregar una tabla para listar documentos.
  - Implementar autenticación de usuarios.
- **Preguntas**: Resolver dudas de los participantes.
- **Recursos**:
  - Documentación de Bootstrap: `https://getbootstrap.com/docs/5.3/`.
  - Tutoriales de PHP: `https://www.php.net/manual/es/`.
  - Repositorio del workshop (puedes subirlo a GitHub).

## Materiales

- **Archivos base**:
  - `index.html`: Formulario.
  - `procesar.php`: Lógica del backend.
  - `database.sql`: Script para crear la base de datos.
- **Instrucciones**:
  - Descargar XAMPP: `https://www.apachefriends.org/es/index.html`.
  - Configurar el proyecto en `htdocs`.
- **Diapositivas** (opcional):
  - Introducción al SGC y tecnologías.
  - Pasos de la práctica con capturas de pantalla.

## Notas para el facilitador

- Asegúrate de que todos instalen XAMPP antes del workshop para ahorrar tiempo.
- Ten un respaldo del código en un USB o GitHub por si alguien tiene problemas.
- Explica cada paso lentamente, mostrando el resultado en tu pantalla.
- Para principiantes, enfatiza cómo el formulario "habla" con la base de datos a través de PHP.