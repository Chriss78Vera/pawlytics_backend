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
POST   /api/users/login
POST   /api/users
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

Al crear un usuario se debe enviar `userDataId`, porque `TB_USUARIO` mantiene una relacion 1 a 1 con `TB_DATOS_USUARIO`.

El login recibe `email` y `password` en texto plano y responde solo `roleId`, `userId` y `userDataId` cuando las credenciales son validas.

### Datos de usuario

```http
POST   /api/user-data
GET    /api/user-data
GET    /api/user-data/:id
PUT    /api/user-data/:id
DELETE /api/user-data/:id
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

### Mascotas

```http
POST   /api/mascotas
GET    /api/mascotas
GET    /api/mascotas/:id
GET    /api/mascotas/user-data/:userDataId
PUT    /api/mascotas/:id
DELETE /api/mascotas/:id
```

Las mascotas usan los catalogos existentes `TB_TIPO` y `TB_RAZA`, y se relacionan con `TB_DATOS_USUARIO` mediante `userDataId`.

### Detalle clinico relacional

```http
POST   /api/vacunas
GET    /api/vacunas
GET    /api/vacunas/:id
PUT    /api/vacunas/:id
DELETE /api/vacunas/:id

POST   /api/desparasitaciones
GET    /api/desparasitaciones
GET    /api/desparasitaciones/:id
PUT    /api/desparasitaciones/:id
DELETE /api/desparasitaciones/:id

POST   /api/cirugias
GET    /api/cirugias
GET    /api/cirugias/:id
PUT    /api/cirugias/:id
DELETE /api/cirugias/:id

POST   /api/enfermedades
GET    /api/enfermedades
GET    /api/enfermedades/:id
PUT    /api/enfermedades/:id
DELETE /api/enfermedades/:id

POST   /api/detalle-clinico
GET    /api/detalle-clinico
GET    /api/detalle-clinico/:id
GET    /api/detalle-clinico/pet/:petId
PUT    /api/detalle-clinico/:id
DELETE /api/detalle-clinico/:id
```

`TB_DETALLE_CLINICO` pertenece a una mascota y puede relacionarse con cirugia, enfermedad y desparasitacion. Las vacunas se relacionan mediante la tabla puente `TB_DETALLE_CLINICO_HAS_TB_VACUNAS`.

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
      user-data/
      roles/
      clinical-history/
      clinical-records/
      pets/
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
- `user-data`: gestion de datos personales de usuario con PostgreSQL.
- `roles`: gestion de roles con PostgreSQL.
- `clinical-history`: gestion de historias clinicas con MongoDB.
- `catalogs`: consulta de tipos de mascota y razas con PostgreSQL.
- `pets`: gestion de mascotas con PostgreSQL.
- `clinical-records`: detalle clinico relacional y sus tablas asociadas con PostgreSQL.

Los catalogos de `TB_TIPO` y `TB_RAZA` se cargan desde el codigo al iniciar el servidor. Los ids de tipo usan prefijos como `DOG001`; los ids de raza combinan el prefijo del tipo, una abreviatura del nombre y el consecutivo, por ejemplo `DOGMEZ001`.

La explicacion detallada de la arquitectura esta en `documents/architecture.md`.

## Coleccion Postman

La carpeta `postman` contiene una coleccion con las rutas principales de la API y ejemplos de body para probar los endpoints manualmente.

## Autores

Christopher Vera and Jordan Paillacho
