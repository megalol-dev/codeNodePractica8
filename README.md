# 🎮 Catálogo de Videojuegos - Proyecto DAW

Aplicación web desarrollada con **Next.js** y **SQLite** que permite gestionar un catálogo de videojuegos con sistema de usuarios y reseñas.
Esto es una base sobre la que trabajar en una futura web sobre "los videojuegos mas influyentes de la historia"
---

## 🚀 Funcionalidades

### 🔹 Usuarios
- Registro de usuarios
- Login
- Visualización de sesión activa
- Logout

### 🔹 Roles
- **Admin**
  - Crear videojuegos
  - Editar videojuegos
  - Borrar videojuegos
  - Ver catálogo
  - Añadir 1 reseña por juego
- **Usuario**
  - Ver catálogo
  - Añadir 1 reseña por juego

### 🔹 Videojuegos
- Listado completo
- Información detallada
- Sistema CRUD completo (admin)

### 🔹 Reseñas
- Añadir reseñas con nota (1-10)
- 1 reseña por usuario por juego
- Visualización de reseñas con:
  - Usuario
  - Nota
  - Comentario
  - Fecha

---

## 🛠️ Tecnologías utilizadas

- Next.js (App Router)
- React
- SQLite
- Node.js
- JavaScript / TypeScript
- CSS personalizado embebido

---

## 📂 Estructura del proyecto

```
app/
├── api/
│ ├── login/
│ ├── register/
│ ├── proyectos/
│ └── resenas/
│
├── proyectos/
│ ├── admin/
│ ├── nuevo/
│ ├── editar/
│ └── [id]/resenas/
│
├── login/
├── register/
```

---

## ⚙️ Instalación

```bash
npm install
npm run dev
```

---

🌐 URLs principales

Catálogo: http://localhost:3000/proyectos

Login: http://localhost:3000/login

Registro: http://localhost:3000/register

Panel admin: http://localhost:3000/proyectos/admin

---
👤 Usuario administrador
- usuario: megalol84z
- password: squall84z

---
🚀 Mejoras futuras
- Mejorar UI/UX separando el CSS de todos los elementos
- Sistema de autenticación más seguro (cookies/JWT)
- Edición de reseñas tanto de los usuarios como del gestor
- Subida de imágenes de juegos desde el PC

---

👨‍💻 Autor
- Desarrollado por José Luis Escudero Polo (megalol-dev)
- Pueden usar mi proyecto para aprender y crear sus propios proyectos
