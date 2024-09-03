# CodeServer

Este proyecto consiste en el desarrollo de un servidor de backend utilizando Node.js y Express, enfocado en la gestión de usuarios y productos. A lo largo del desarrollo, se implementaron diversas funcionalidades y metodologías en múltiples desafíos, cada uno en ramas específicas.

## Desafíos

### Desafío 1 - Branch: `sprint1`
- **Descripción**: Se crearon dos clases constructoras para manejar un array de usuarios y productos.
- **Ejecución**: 
  - Ejecutar en consola: `node UserManager.js` o `node ProductManager.js`.

### Desafío 2 - Branch: `sprint2`
- **Descripción**: Implementación de dos métodos de manejo de datos: uno en memoria y otro en archivos `.json` usando File System.
- **Ejecución**:
  - Método de memoria: en la carpeta `memory`.
  - Método fs: en la carpeta `files`.
  - Comandos: `node` seguido del nombre del archivo.

### Desafío 3 - Branch: `sprint3`
- **Descripción**: Implementación de un servidor utilizando Express.js para acceder a las clases `Product Manager` y `User Manager` mediante el método GET.
- **Ejecución**:
  - Instalar dependencias: `npm install` y `npm i -D nodemon`.
  - Servidor disponible en `localhost:8080`.
- **Endpoints**:
  - Obtener todos los productos: `localhost:8080/api/products`.
  - Filtrar productos por categoría: `localhost:8080/api/products?category=nombre`.
  - Obtener producto por ID: `localhost:8080/api/products/id`.
  - Obtener todos los usuarios: `localhost:8080/api/users`.
  - Filtrar usuarios por rol: `localhost:8080/api/users?role=rol`.
  - Obtener usuario por ID: `localhost:8080/api/users/id`.

### Challenge 1 - Branch: `challenge1`
- **Descripción**: Implementación de routers en Express para usuarios y productos, utilizando métodos GET, POST, PUT, y DELETE.
- **Pruebas**: Requiere POSTMAN.
- **Endpoints**:
  - Usuarios: `localhost:8080/api/users`.
  - Productos: `localhost:8080/api/products`.
- **Middlewares**:
  - `errorHandler.js`, `pathHandler.js`, `validateProductsProps.js`, `validateUsersProps.js`.
- **Dependencias**: Morgan para seguimiento de acciones en tiempo real.

### Desafío 4 - Branch: `sprint4`
- **Descripción**: Integración de Handlebars para webs dinámicas y Socket.io para renderización en tiempo real.
- **Ejecución**:
  - Handlebars: Renderización inversa de productos en `localhost:8080`.
  - TCP para publicación de productos en tiempo real.

### Desafío 5 - Branch: `sprint5`
- **Descripción**: Creación de `Cart Contact Manager` para la app con persistencia en Memoria, File System, y MongoDB.
- **Endpoints**:
  - `/api/cart-contact`.

### Challenge 2 - Branch: `challenge2`
- **Descripción**: Implementación de paginación en productos usando Mongoose.
- **Ejecución**:
  - Paginación de productos en inicio y categorías.
  - Carrito dinámico vinculado a usuario.

### Desafío 6 - Branch: `sprint6`
- **Descripción**: Mejoras en la barra de navegación, registro, login, y sesión de usuario.

### Desafío 7 - Branch: `sprint7`
- **Descripción**: Reestructuración de protocolos de registro y login con Passport, y JWT para autenticación.

### Desafío 8 - Branch: `sprint8`
- **Descripción**: Uso de `Custom Router` para mejor organización y escalabilidad, autenticación JWT, y respuestas predeterminadas.

### Challenge 3 - Branch: `challenge_3`
- **Descripción**: Implementación de sistemas de persistencia y verificación vía email en MongoDB.

### Desafío 10 - Branch: `sprint_10`
- **Descripción**: Creación de 1000 productos aleatorios usando Faker.js y compresión del servidor.

### Desafío 11 - Branch: `sprint_11`
- **Descripción**: Implementación de un `Custom Logger` con Winston para manejo de logs.

### Desafío 12 - Branch `sprint_12`
- **Descripción**: Funcionalidades para recuperación de contraseña mediante verificación por email.

### Desafío 13 - Branch `sprint_13`
- **Descripción**: Documentación de API con Swagger para productos.

### Desafío 14 - Branch `sprint14`
- **Descripción**: Testing avanzado del CRUD de productos con Supertest y pruebas de estrés con Artillery.

### Desafío 15 - Branch `sprint_15`
- **Descripción**: Implementación de la pasarela de pagos de Stripe para procesar pagos en el carrito.

## Licencia
Este proyecto está bajo la Licencia MIT.

