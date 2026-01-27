# 🛠️ BricoAcademy – Backend API

Backend del proyecto **BricoAcademy**, una aplicación web para la gestión de profesores y cursos, desarrollada como **API REST** con **Node.js, Express y Sequelize**, conectada a una base de datos **MySQL**.

---

## 🔗 Repositorio en GitHub

https://github.com/GMC-maker/bricoacademy_project.git

---

## ⚙️ Requisitos previos

- Node.js
- npm
- MySQL en local (phpMyAdmin recomendado)
- Visual Studio Code
- Extensión **REST Client** (Huachao Mao) para VS Code

---

## Instalación y configuración

### 1. Acceder a la carpeta backend

cd bricoacademy-backend

## Instalación y configuración

- npm install (dependencia)

## Dependencias utilizadas

- **express**: servidor HTTP
- **cors**: gestión de peticiones desde frontend
- **sequelize**: ORM para MySQL
- **mysql2**: conexión con MySQL
- **dotenv**: gestión de variables de entorno
- **nodemon (dev)**: reinicio automático del servidor en desarrollo
- **sequelize-auto**: generación inicial de modelos a partir de la base de datos

## 📦 Instalación de dependencias

Las dependencias del proyecto pueden instalarse individualmente utilizando los siguientes comandos:

```bash
npm install express
npm install cors
npm install sequelize
npm install mysql2
npm install dotenv
npm install --save-dev nodemon
npm install sequelize-auto
```

## 🧩 Configuración del archivo `.env`

Crear un archivo **`.env`** en la raíz del backend con la siguiente estructura:

```bash
env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bricoacademy
DB_USER=tuUser
DB_PASSWORD=tuPass
```

### Backend

El backend se ejecutará en: http://localhost:3000

### Pruebas de la API

-REST Client en VS Code

###Base de Datos
El proyecto incluye un fichero SQL con:

-La estructura de la base de datos

-Un conjunto de datos iniciales
