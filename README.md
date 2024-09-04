# CodeServer

Este proyecto es un servidor backend desarrollado con Node.js y Express, enfocado en la gestión de usuarios y productos. Se implementaron funcionalidades en diferentes desafíos, cada uno desarrollado en ramas específicas.

## Desafíos y Funcionalidades

### Desafío 1 - Branch: `sprint1`
- **Descripción**: Se crearon dos clases constructoras (`UserManager` y `ProductManager`) para gestionar usuarios y productos.
- **Ejecución**: 
  - Ejecuta `node UserManager.js` o `node ProductManager.js` desde la consola.
  
### Desafío 2 - Branch: `sprint2`
- **Descripción**: Implementación de dos métodos de manejo de datos:
  - **En memoria**: Utiliza un array interno para almacenar datos.
  - **En archivos `.json`**: Persistencia utilizando File System (FS).
- **Ejecución**:
  - Métodos disponibles en las carpetas `memory` y `files`.
  - Usa `node` seguido del nombre del archivo para ejecutar.

### Desafío 3 - Branch: `sprint3`
- **Descripción**: Creación de un servidor Express.js para interactuar con `ProductManager` y `UserManager` mediante rutas GET.
- **Ejecución**:
  - Instalar dependencias: `npm install` y `npm i -D nodemon`.
  - Iniciar servidor en `localhost:8080`.
- **Endpoints**:
  - **Productos**:
    - Obtener todos los productos: `GET /api/products`.
    - Filtrar por categoría: `GET /api/products?category=nombre`.
    - Obtener por ID: `GET /api/products/:id`.
  - **Usuarios**:
    - Obtener todos los usuarios: `GET /api/users`.
    - Filtrar por rol: `GET /api/users?role=rol`.
    - Obtener por ID: `GET /api/users/:id`.

### Challenge 1 - Branch: `challenge1`
- **Descripción**: Añadidos routers en Express para manejar productos y usuarios, soportando métodos GET, POST, PUT y DELETE.
- **Ejecución**:
  - Pruebas con POSTMAN.
- **Endpoints**:
  - Usuarios: `localhost:8080/api/users`.
  - Productos: `localhost:8080/api/products`.
- **Middlewares**:
  - `errorHandler.js`, `pathHandler.js`, `validateProductsProps.js`, `validateUsersProps.js`.
- **Dependencias**: Uso de Morgan para el seguimiento de solicitudes en tiempo real.

### Desafío 4 - Branch: `sprint4`
- **Descripción**: Integración de Handlebars para vistas dinámicas y Socket.io para actualización en tiempo real.
- **Ejecución**:
  - **Handlebars**: Renderización de productos en la vista principal (`localhost:8080`).
  - **Socket.io**: Publicación de productos en tiempo real.

### Desafío 5 - Branch: `sprint5`
- **Descripción**: Desarrollo de `Cart Contact Manager` con persistencia en memoria, sistema de archivos y MongoDB.
- **Endpoints**:
  - **Carrito de Compras**: `POST /api/cart-contact`, `GET /api/cart-contact/:id`, `DELETE /api/cart-contact/:id`.

### Challenge 2 - Branch: `challenge2`
- **Descripción**: Implementación de paginación en productos utilizando Mongoose.
- **Ejecución**:
  - Paginación en la vista principal y categorías.
  - Carrito vinculado dinámicamente a usuarios.

### Desafío 6 - Branch: `sprint6`
- **Descripción**: Mejoras en la interfaz de usuario, incluyendo navegación, registro, login, y gestión de sesión.

### Desafío 7 - Branch: `sprint7`
- **Descripción**: Reestructuración de los protocolos de autenticación con Passport.js y JWT para mayor seguridad.

### Desafío 8 - Branch: `sprint8`
- **Descripción**: Uso de `Custom Router` para mejor organización del código, con respuestas predeterminadas y autenticación JWT.

### Challenge 3 - Branch: `challenge_3`
- **Descripción**: Implementación de verificación de usuarios vía email y persistencia en MongoDB.

### Desafío 10 - Branch: `sprint_10`
- **Descripción**: Creación de 1000 productos aleatorios utilizando Faker.js, con compresión del servidor.

### Desafío 11 - Branch: `sprint_11`
- **Descripción**: Implementación de un `Custom Logger` usando Winston para manejo detallado de logs.

### Desafío 12 - Branch `sprint_12`
- **Descripción**: Funcionalidades de recuperación de contraseña vía verificación de email.

### Desafío 13 - Branch `sprint_13`
- **Descripción**: Documentación de la API de productos utilizando Swagger.

### Desafío 14 - Branch `sprint14`
- **Descripción**: Testing avanzado del CRUD de productos con Supertest, y pruebas de rendimiento con Artillery.

### Desafío 15 - Branch `sprint_15`
- **Descripción**: Implementación de pasarela de pagos utilizando Stripe para el procesamiento de transacciones en el carrito.

## Cómo ejecutar el proyecto

1. Clona el repositorio: `git clone <url-repo>`
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor: `npm run dev`
4. Accede a las rutas desde el navegador o herramientas como Postman.

## Licencia
Este proyecto está bajo la Licencia MIT.
