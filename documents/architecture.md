# Arquitectura de Pawlytics Backend

El proyecto sigue la misma idea de arquitectura hexagonal usada en `HX-ODM-JS`: el nucleo de cada modulo vive en `Dominio`, los casos de uso en `Aplicacion` y los detalles externos en `Infraestructura`. La aplicacion tiene dos motores de persistencia: PostgreSQL con Sequelize para datos relacionales y MongoDB con Mongoose para informacion documental.

## Estructura general

```text
pawlytics_backend/
  index.js
  src/
    app.js
    server.js
    Infraestructura/
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

## Carpetas y responsabilidades

### `index.js`

Es el punto de entrada raiz del proyecto. Su unica responsabilidad es cargar `src/server.js`, igual que en `HX-ODM-JS`.

### `src/app.js`

Construye y configura la aplicacion Express. Aqui van los middlewares globales, el endpoint de salud, el registro de modulos y los manejadores globales de rutas no encontradas y errores.

No debe contener reglas de negocio ni consultas directas a bases de datos.

### `src/server.js`

Arranca el proceso HTTP. Aqui se cargan variables de entorno, se abre la conexion con MongoDB, se autentica/sincroniza PostgreSQL y finalmente se levanta el servidor Express.

Si en el futuro se agregan mas recursos externos, como colas o almacenamiento de archivos, su inicializacion debe coordinarse desde este archivo o desde servicios invocados por este archivo.

### `src/Infraestructura/database/mongo`

Contiene la configuracion de conexion a MongoDB.

Actualmente:
- `connection.js`: abre la conexion con Mongoose usando `MONGO_URI`.

Aqui deben ir solo archivos compartidos de infraestructura Mongo, por ejemplo configuracion de conexion, cierre controlado de la conexion o utilidades tecnicas globales. Los modelos Mongoose de cada modulo deben quedarse dentro de su propio modulo.

### `src/Infraestructura/database/postgres`

Contiene la configuracion global de PostgreSQL con Sequelize.

Actualmente:
- `sequelize.js`: crea la instancia Sequelize, autentica la conexion y sincroniza tablas.
- `models.js`: registra modelos Sequelize compartidos.
- `associations.js`: define relaciones entre modelos relacionales.

Aqui deben ir solo elementos globales de PostgreSQL. Los modelos concretos pertenecientes a un modulo deben vivir dentro de `src/lib/<modulo>/Infraestructura/persistence/postgres`.

### `src/lib`

Contiene los modulos funcionales del sistema. Cada carpeta representa una capacidad del dominio de Pawlytics y mantiene sus propias capas.

Modulos actuales:
- `users`: gestion de usuarios. Usa PostgreSQL.
- `roles`: gestion de roles. Usa PostgreSQL.
- `clinical-history`: gestion de historias clinicas. Usa MongoDB.

## Estructura de cada modulo

Cada modulo sigue este formato:

```text
src/lib/<modulo>/
  Dominio/
    Entidades/
    Ports/
  Aplicacion/
    dto/
    use-cases/
  Infraestructura/
    http/
      controllers/
      routes/
      validators/
      index.js
    persistence/
      postgres/ o mongoose/
```

### `Dominio/Entidades`

Aqui van las entidades del negocio. Representan los conceptos principales del modulo sin depender de Express, Sequelize, Mongoose ni de otra tecnologia externa.

Ejemplos:
- `User.js`
- `Role.js`
- `ClinicalHistory.js`

### `Dominio/Ports`

Aqui van las interfaces o contratos que necesita el dominio/aplicacion para persistir o consultar datos. En arquitectura hexagonal funcionan como puertos: describen que operaciones necesita el caso de uso, sin decidir si se ejecutan con SQL, Mongo u otra tecnologia.

Ejemplos:
- `UserRepository.js`
- `RoleRepository.js`
- `ClinicalHistoryRepository.js`

### `Aplicacion/use-cases`

Aqui van los casos de uso. Cada archivo representa una accion del sistema: crear, listar, consultar, actualizar o eliminar. Los casos de uso coordinan entidades y repositorios, pero no deben conocer detalles HTTP ni detalles concretos de base de datos.

Ejemplos:
- `CreateUserUseCase.js`
- `GetRolesUseCase.js`
- `CreateClinicalHistoryUseCase.js`

### `Aplicacion/dto`

Aqui van los objetos de transferencia de datos usados por los casos de uso. Sirven para normalizar la entrada que llega desde HTTP antes de enviarla a la logica de aplicacion.

### `Infraestructura/http`

Contiene la adaptacion HTTP del modulo.

Responsabilidades:
- `index.js`: registra el modulo en la app Express con su prefijo de ruta.
- `routes`: define endpoints del modulo.
- `controllers`: traduce request/response HTTP hacia casos de uso.
- `validators`: valida datos de entrada antes de ejecutar controladores.

Aqui si puede existir dependencia de Express, porque esta capa es un adaptador externo.

### `Infraestructura/persistence/postgres`

Contiene adaptadores concretos para PostgreSQL mediante Sequelize.

Aqui van:
- Modelos Sequelize.
- Repositorios que implementan los puertos del dominio usando tablas relacionales.
- Mapeos entre columnas de base de datos y objetos de dominio/respuesta.

Actualmente lo usan `users` y `roles`.

### `Infraestructura/persistence/mongoose`

Contiene adaptadores concretos para MongoDB mediante Mongoose.

Aqui van:
- Schemas/modelos Mongoose.
- Repositorios que implementan los puertos del dominio usando colecciones MongoDB.
- Mapeos entre documentos Mongo y objetos de dominio/respuesta.

Actualmente lo usa `clinical-history`, porque la historia clinica tiene datos flexibles y documentales.

## Regla para SQL y Mongo

PostgreSQL se usa para datos relacionales, estructurados y con relaciones claras, como usuarios y roles.

MongoDB se usa para documentos flexibles, como historias clinicas, observaciones, sintomas, alimentacion, comportamiento y otros datos que pueden variar entre mascotas.

Si se agrega un nuevo modulo, primero se debe decidir que tipo de persistencia necesita. Luego se crea el adaptador correspondiente dentro del modulo, sin mezclar modelos SQL y Mongo en la capa de aplicacion.
