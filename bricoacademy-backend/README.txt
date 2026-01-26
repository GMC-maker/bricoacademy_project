🛠️ BricoAcademy – Backend API

Backend del proyecto BricoAcademy, una aplicación web para la gestión de profesores y cursos, desarrollada como API REST con Node.js, Express y Sequelize, conectada a una base de datos MySQL.

---

## 🔗 Repositorio en GitHub

https://github.com/GMC-maker/bricoacademy_project.git

---

## Configuración y ejecución del proyecto

### Requisitos Previos
- Instalar Node.js
- Abrir en VS Code
- MySQL en Local
- npm
- extensión REST Client de Huachao Mao en VS Code
---

### Backend

1Entrar en la carpeta backend:
```bash
  cd bricoacademy-backend

### Instalar dependencias: 
- npm install express (servidor HTTP)
- npm install cors (para peticiones frontend)
- npm install sequelize: ORM para MySQL
- npm install mysql2: para la conexión a MySQL
- npm install dotenv : gestión de variables de entorno mediante .env
- npm install --save-dev nodemon: reinicio automático del servidor en desarrollo
- npm install sequelize-auto: generación inicial de modelos a partir de la base de datos

.env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bricoacademy
DB_USER= tuUser
DB_PASSWORD=tuPass

##iniciar el proyecto:
npm run dev
El backend se ejecutará en:
http://localhost:3000

Pruebas

La API REST ha sido probada utilizando Postman y la extensión REST Client de Visual Studio Code


