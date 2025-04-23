# Introducción a Conectar Frontend y Backend para una Lista de Tareas

---

## Diapositiva 1: Bienvenida

### ¡Bienvenidos al Workshop!

- **Tema**: Crear una lista de tareas conectando frontend y backend.
- **Objetivo**: Aprender a usar HTML, Tailwind CSS, Java (Spring Boot), y PostgreSQL.
- **Duración**: 1 hora.
- **Nivel**: Principiantes.

**¿Qué haremos?** Un formulario para añadir tareas (ej. "Hacer la compra") que se guardarán en una base de datos.

---

## Diapositiva 2: ¿Qué es una lista de tareas?

- **Definición**: Una aplicación para registrar tareas que necesitas hacer.
- **Ejemplo**:
  - Título: "Estudiar Java".
  - Descripción: "Leer documentación de Spring Boot".
- **Nuestra misión**: Crear un formulario que guarde tareas.

**Ejemplo visual**: \[Imagina un formulario con un campo para título y otro para descripción.\]

---

## Diapositiva 3: Tecnologías que usaremos

1. **HTML**: Estructura del formulario.
2. **Tailwind CSS**: Diseño moderno y responsive.
3. **Java (Spring Boot)**: API para procesar datos.
4. **PostgreSQL**: Base de datos para guardar tareas.

**Flujo**:

- Formulario (HTML/Tailwind) → API Java → PostgreSQL.

---

## Diapositiva 4: HTML - La estructura

- **¿Qué es?**: Lenguaje para crear páginas web.
- **Nuestra tarea**: Formulario con título, descripción, y botón.
- **Ejemplo**:

```html
<form action="/api/tareas" method="POST">
    <input type="text" name="titulo" required>
    <textarea name="descripcion"></textarea>
    <button type="submit">Añadir</button>
</form>
```

**Dato**: `action="/api/tareas"` envía datos al backend.

---

## Diapositiva 5: Tailwind CSS - El diseño

- **¿Qué es?**: Framework CSS para estilizar rápido.
- **Por qué usarlo**:
  - Clases como `bg-blue-600` añaden estilos fácilmente.
  - Responsive y moderno.
- **Ejemplo**: `<button class="bg-blue-600 text-white">Añadir</button>` crea un botón azul.

**Ejemplo visual**: Formulario simple vs. estilizado con Tailwind.

---

## Diapositiva 6: Java (Spring Boot) - La lógica

- **¿Qué es?**: Framework Java para crear APIs.
- **Nuestra tarea**:
  - Crear un endpoint `/api/tareas`.
  - Guardar tareas en PostgreSQL.
- **Ejemplo**:

```java
@PostMapping("/api/tareas")
public String registrar(@RequestParam String titulo, @RequestParam String descripcion) {
    Tarea tarea = new Tarea(titulo, descripcion);
    repo.save(tarea);
    return "¡Tarea registrada!";
}
```

**Dato**: `@PostMapping` recibe datos del formulario.

---

## Diapositiva 7: PostgreSQL - El almacenamiento

- **¿Qué es?**: Base de datos para guardar información.
- **Nuestra tabla**: `tareas` (id, título, descripción, fecha).
- **Ejemplo SQL**:

```sql
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT
);
```

**Ejemplo visual**: \[Tabla con tareas como "Comprar leche", "Estudiar Java".\]

---

## Diapositiva 8: ¿Cómo se conectan?

1. **HTML/Tailwind**: Formulario para ingresar tareas.
2. **Java (Spring Boot)**: API recibe y guarda datos.
3. **PostgreSQL**: Almacena las tareas.
4. **Resultado**: Mensaje "¡Tarea registrada!".

**Flujo visual**:

```
Formulario → API Java → PostgreSQL → Mensaje
```

---

## Diapositiva 9: Preparándonos

- **Necesitamos**:
  - Java 17, Maven, PostgreSQL (o Docker).
  - Editor (VS Code).
  - Archivos base (ZIP).
- **Pasos**:
  1. Configurar PostgreSQL.
  2. Crear el formulario.
  3. Configurar la API Java.
  4. Probar todo.
- **Consejo**: ¡Sigan los pasos y pregunten!

---

## Diapositiva 10: ¡A trabajar!

- **Manos a la obra**: 40 minutos para construir y probar.
- **Recursos**:
  - ZIP con archivos.
  - Docs: Spring Boot, Tailwind, PostgreSQL.
- **Meta**: Formulario funcionando y tareas guardadas.
- **¡Empecemos!**

---