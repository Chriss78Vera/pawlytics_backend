# Pawlytics Backend

Backend del proyecto Pawlytics desarrollado con Node.js, Express, PostgreSQL y MongoDB. El proyecto usa una organizacion por modulos inspirada en arquitectura hexagonal: dominio, aplicacion e infraestructura.

## Tecnologias

- Node.js
- Express
- PostgreSQL con Sequelize
- MongoDB con Mongoose
- CORS, Morgan y Dotenv
- Postman para pruebas manuales

## Requisitos

- Node.js instalado
- PostgreSQL en ejecucion
- MongoDB en ejecucion o una URI de MongoDB Atlas
- npm

## Instalacion

Instala las dependencias del proyecto:

```bash
npm install
```

Crea un archivo `.env` en la raiz del proyecto con las variables necesarias:

```env
PORT=3000

MONGO_URI=

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DIALECT=
```

## Ejecucion

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

Para ejecutar el servidor en modo produccion:

```bash
npm start
```

Por defecto, la API queda disponible en:

```text
http://localhost:3000
```

Endpoint de verificacion:

```http
GET /api/health
```

## Endpoints principales

### Usuarios

```http
POST   /api/users
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Roles

```http
POST   /api/roles
GET    /api/roles
GET    /api/roles/:id
PUT    /api/roles/:id
DELETE /api/roles/:id
```

### Historias clinicas

```http
POST   /api/clinical-history
GET    /api/clinical-history
GET    /api/clinical-history/:id
GET    /api/clinical-history/pet/:petId
PUT    /api/clinical-history/:id
DELETE /api/clinical-history/:id
```

### Tipos de mascota

```http
GET /api/tipos
GET /api/tipos/:id
GET /api/tipos/:tipoId/razas
```

### Razas

```http
GET /api/razas
GET /api/razas/:id
GET /api/razas/tipo/:tipoId
```

## Estructura del proyecto

```text
pawlytics_backend/
  index.js
  package.json
  src/
    app.js
    server.js
    infrastructure/
      database/
        mongo/
        postgres/
    lib/
      users/
      roles/
      clinical-history/
  documents/
  postman/
```

## Arquitectura

Cada modulo funcional se encuentra en `src/lib` y mantiene sus propias capas:

- `domain`: entidades y puertos del negocio.
- `application`: casos de uso y DTOs.
- `infrastructure`: rutas HTTP, controladores, validadores y persistencia.

Los modulos actuales son:

- `users`: gestion de usuarios con PostgreSQL.
- `roles`: gestion de roles con PostgreSQL.
- `clinical-history`: gestion de historias clinicas con MongoDB.
- `catalogs`: consulta de tipos de mascota y razas con PostgreSQL.

Los catalogos de `TB_TIPO` y `TB_RAZA` se cargan desde el codigo al iniciar el servidor. Los ids de tipo usan prefijos como `DOG001`; los ids de raza combinan el prefijo del tipo, una abreviatura del nombre y el consecutivo, por ejemplo `DOGMEZ001`.

La explicacion detallada de la arquitectura esta en `documents/architecture.md`.

## Coleccion Postman

La carpeta `postman` contiene una coleccion con las rutas principales de la API y ejemplos de body para probar los endpoints manualmente.

## Autores

Christopher Vera and Jordan Paillacho
