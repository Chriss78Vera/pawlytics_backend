# Arquitectura de Pawlytics Backend

El proyecto sigue una organizacion inspirada en arquitectura hexagonal. Cada modulo separa el nucleo del negocio, los casos de uso y los detalles externos de infraestructura. La aplicacion usa PostgreSQL con Sequelize para datos relacionales y MongoDB con Mongoose para informacion documental.

Aunque la documentacion esta en espanol, los nombres tecnicos de carpetas y capas se mantienen en ingles para evitar mezcla de idiomas dentro del codigo.

## Estructura general

```text
pawlytics_backend/
  index.js
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
      catalogs/
  documents/
  postman/
```

## Carpetas y responsabilidades

### `index.js`

Es el punto de entrada raiz del proyecto. Su unica responsabilidad es cargar `src/server.js`.

### `src/app.js`

Construye y configura la aplicacion Express. Aqui van los middlewares globales, el endpoint de salud, el registro de modulos y los manejadores globales de rutas no encontradas y errores.

No debe contener reglas de negocio ni consultas directas a bases de datos.

### `src/server.js`

Arranca el proceso HTTP. Aqui se cargan variables de entorno, se abre la conexion con MongoDB, se autentica/sincroniza PostgreSQL y finalmente se levanta el servidor Express.

Si en el futuro se agregan mas recursos externos, como colas o almacenamiento de archivos, su inicializacion debe coordinarse desde este archivo o desde servicios invocados por este archivo.

### `src/infrastructure/database/mongo`

Contiene la configuracion global de conexion a MongoDB.

Actualmente:
- `connection.js`: abre la conexion con Mongoose usando `MONGO_URI`.

Aqui deben ir solo archivos compartidos de infraestructura Mongo, por ejemplo configuracion de conexion, cierre controlado de la conexion o utilidades tecnicas globales. Los modelos Mongoose de cada modulo deben quedarse dentro de su propio modulo.

### `src/infrastructure/database/postgres`

Contiene la configuracion global de PostgreSQL con Sequelize.

Actualmente:
- `sequelize.js`: crea la instancia Sequelize, autentica la conexion, sincroniza tablas y ejecuta semillas necesarias.
- `models.js`: registra modelos Sequelize compartidos.
- `associations.js`: define relaciones entre modelos relacionales.

Aqui deben ir solo elementos globales de PostgreSQL. Los modelos concretos pertenecientes a un modulo deben vivir dentro de `src/lib/<module>/infrastructure/persistence/postgres`.

### `src/lib`

Contiene los modulos funcionales del sistema. Cada carpeta representa una capacidad del dominio de Pawlytics y mantiene sus propias capas.

Modulos actuales:
- `users`: gestion de usuarios. Usa PostgreSQL.
- `user-data`: gestion de datos personales asociados a usuarios. Usa PostgreSQL.
- `roles`: gestion de roles. Usa PostgreSQL.
- `clinical-history`: gestion de historias clinicas. Usa MongoDB.
- `catalogs`: consulta de tipos de mascota y razas. Usa PostgreSQL.

## Estructura de cada modulo

Cada modulo sigue este formato:

```text
src/lib/<module>/
  domain/
    entities/
    ports/
  application/
    dto/
    use-cases/
  infrastructure/
    http/
      controllers/
      routes/
      validators/
      index.js
    persistence/
      postgres/ o mongoose/
```

### `domain/entities`

Aqui van las entidades del negocio. Representan los conceptos principales del modulo sin depender de Express, Sequelize, Mongoose ni de otra tecnologia externa.

Ejemplos:
- `User.js`
- `UserData.js`
- `Role.js`
- `ClinicalHistory.js`

El modulo `catalogs` no tiene una entidad `Catalog` porque por ahora solo agrupa consultas de datos maestros. Si en el futuro tipos y razas tienen reglas propias, se pueden agregar entidades especificas como `Type` y `Breed`.

### `domain/ports`

Aqui van las interfaces o contratos que necesita la capa de aplicacion para persistir o consultar datos. En arquitectura hexagonal funcionan como puertos: describen que operaciones necesita el caso de uso, sin decidir si se ejecutan con SQL, Mongo u otra tecnologia.

Ejemplos:
- `UserRepository.js`
- `UserDataRepository.js`
- `RoleRepository.js`
- `ClinicalHistoryRepository.js`
- `CatalogRepository.js`

### `application/use-cases`

Aqui van los casos de uso. Cada archivo representa una accion del sistema: crear, listar, consultar, actualizar o eliminar. Los casos de uso coordinan entidades y repositorios, pero no deben conocer detalles HTTP ni detalles concretos de base de datos.

Ejemplos:
- `CreateUserUseCase.js`
- `GetRolesUseCase.js`
- `CreateClinicalHistoryUseCase.js`
- `GetTypesUseCase.js`
- `GetBreedsByTypeUseCase.js`

### `application/dto`

Aqui van los objetos de transferencia de datos usados por los casos de uso. Sirven para normalizar la entrada que llega desde HTTP antes de enviarla a la logica de aplicacion.

Los modulos de solo lectura, como `catalogs`, no necesitan DTOs si no reciben datos para crear o actualizar.

### `infrastructure/http`

Contiene la adaptacion HTTP del modulo.

Responsabilidades:
- `index.js`: registra el modulo en la app Express con su prefijo de ruta.
- `routes`: define endpoints del modulo.
- `controllers`: traduce request/response HTTP hacia casos de uso.
- `validators`: valida datos de entrada antes de ejecutar controladores.

Aqui si puede existir dependencia de Express, porque esta capa es un adaptador externo.

### `infrastructure/persistence/postgres`

Contiene adaptadores concretos para PostgreSQL mediante Sequelize.

Aqui van:
- Modelos Sequelize.
- Repositorios que implementan los puertos del dominio usando tablas relacionales.
- Mapeos entre columnas de base de datos y objetos de dominio/respuesta.

Actualmente lo usan `users`, `roles` y `catalogs`.

## Modulo `user-data`

El modulo `user-data` administra la tabla `TB_DATOS_USUARIO`, que contiene datos personales del usuario.

Campos principales:
- `ID_DATOS`: identificador principal.
- `DUS_NOMBRE`: nombres.
- `DUS_APELLIDO`: apellidos.
- `DUS_DIRECCION`: direccion.
- `DUS_TELEFONO`: telefono.
- `DUS_CEDULA`: cedula o identificacion.
- `DUS_F_NACIMIENTO`: fecha de nacimiento.

Relacion con usuarios:
- `TB_USUARIO` tiene la columna `ID_DATOS`.
- `TB_USUARIO.ID_DATOS` referencia `TB_DATOS_USUARIO.ID_DATOS`.
- La relacion es 1 a 1: un usuario tiene un registro de datos de usuario y un registro de datos de usuario pertenece a un solo usuario.

En Sequelize:
- `UserDataPostgresModel.hasOne(UserPostgresModel, { foreignKey: "ID_DATOS", as: "user" })`
- `UserPostgresModel.belongsTo(UserDataPostgresModel, { foreignKey: "ID_DATOS", as: "userData" })`

Endpoints:

```http
POST   /api/user-data
GET    /api/user-data
GET    /api/user-data/:id
PUT    /api/user-data/:id
DELETE /api/user-data/:id
```

El CRUD de usuarios ahora espera `userDataId` al crear un usuario. La columna `ID_DATOS` se mantiene nullable en base de datos para no romper registros antiguos, pero la API valida que se envie en creacion.

### `infrastructure/persistence/mongoose`

Contiene adaptadores concretos para MongoDB mediante Mongoose.

Aqui van:
- Schemas/modelos Mongoose.
- Repositorios que implementan los puertos del dominio usando colecciones MongoDB.
- Mapeos entre documentos Mongo y objetos de dominio/respuesta.

Actualmente lo usa `clinical-history`, porque la historia clinica tiene datos flexibles y documentales.

## Modulo `catalogs`

El modulo `catalogs` expone datos maestros de tipos de mascota y razas. No tiene operaciones de escritura por API; sus datos se cargan desde codigo al iniciar la sincronizacion de PostgreSQL.

Tablas:
- `TB_TIPO`: tipos de mascota, por ejemplo `Perro`, `Gato`, `Conejo`.
- `TB_RAZA`: razas asociadas a un tipo.

Relacion:
- Un tipo puede tener muchas razas.
- Una raza pertenece a un tipo.

Modelos:
- `TypePostgresModel.js`: mapea `TB_TIPO`.
- `BreedPostgresModel.js`: mapea `TB_RAZA`.

Seed:
- `src/lib/catalogs/infrastructure/database/catalogData.js`: contiene los datos base.
- `src/lib/catalogs/infrastructure/database/seedCatalogs.js`: inserta o actualiza los catalogos de forma idempotente.

Ids:
- Los tipos usan prefijos como `DOG001`, `CAT001`, `RAB001`.
- Las razas combinan el prefijo del tipo, tres letras del nombre y un consecutivo por tipo. Ejemplo: `DOGMEZ001`.

## Regla para SQL y Mongo

PostgreSQL se usa para datos relacionales, estructurados y con relaciones claras, como usuarios, datos de usuario, roles, tipos y razas.

MongoDB se usa para documentos flexibles, como historias clinicas, observaciones, sintomas, alimentacion, comportamiento y otros datos que pueden variar entre mascotas.

Si se agrega un nuevo modulo, primero se debe decidir que tipo de persistencia necesita. Luego se crea el adaptador correspondiente dentro del modulo, sin mezclar modelos SQL y Mongo en la capa de aplicacion.
