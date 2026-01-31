# 🎨 BricoAcademy – Frontend

Frontend del proyecto **BricoAcademy**, una aplicación web para la gestión de **profesores y cursos**, desarrollada con **React** y **Material UI**, y conectada a una **API REST** propia.

Este frontend consume los endpoints del backend para realizar operaciones de **alta, listado, edición y borrado**.

---

## 🔗 Repositorio en GitHub

https://github.com/GMC-maker/bricoacademy_project.git

---

## ⚙️ Requisitos previos

- Node.js
- npm
- Visual Studio Code
- Navegador web moderno (Chrome recomendado)

---

## 📦 Instalación de dependencias

```bash
npm install react react-dom
npm install react-router-dom
npm install axios

npm install @mui/material
npm install @mui/icons-material
npm install @mui/x-date-pickers
npm install @emotion/react @emotion/styled

npm install dayjs
npm install vite
npm install @vitejs/plugin-react

or

npm install (dependency) --legacy-peer-deps
```

## 📚 Dependencias principales utilizadas

react: librería principal para la interfaz

react-dom: renderizado de la app en el navegador

react-router-dom: navegación entre vistas (rutas SPA)

axios: comunicación con la API backend

@mui/material: componentes de interfaz (Material UI)

@mui/icons-material: iconos de Material UI

@mui/x-date-pickers: selectores de fecha (DatePicker)

@emotion/react: estilos requeridos por Material UI

@emotion/styled: estilos requeridos por Material UI

dayjs: manejo de fechas

vite: entorno de desarrollo rápido

@vitejs/plugin-react: plugin de React para Vit

## 📁 Acceder a la carpeta frontend

```bash
cd bricoacademy-frontend
npm start
or
npm run dev
```

## 📁 Acceder a la carpeta backend

```bash
cd bricoacademy-backend
npm start
or
npm run dev
```

## El frontend se ejecutará normalmente en:

http://localhost:5173

## 🔌 Conexión con el backend

http://localhost:3000/api

⚠️ Es necesario que el backend esté en ejecución para que el frontend funcione correctamente.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.