# Registro de cambios

Este documento resume los cambios realizados en el proyecto, el motivo de cada cambio y una descripcion corta de su funcionalidad.

## Reorganizacion de arquitectura

Se reorganizo `pawlytics_backend` para seguir la estructura de `HX-ODM-JS`.

Cambios principales:
- Se agrego `index.js` en la raiz como punto de entrada del proyecto.
- Se agrego `src/server.js` para iniciar conexiones y levantar Express.
- `src/app.js` ahora construye la app y registra modulos, no rutas centralizadas.
- Los modulos pasaron de `src/modules` a `src/lib`.
- Cada modulo quedo separado en `Dominio`, `Aplicacion` e `Infraestructura`.
- Las conexiones globales quedaron en `src/Infraestructura/database`.
- Se eliminaron carpetas vacias o redundantes que ya no aportaban a la arquitectura.

Motivo:
Mantener la misma organizacion conceptual de `HX-ODM-JS`, pero adaptada a Pawlytics porque este backend usa PostgreSQL para usuarios/roles y MongoDB para historias clinicas.

Documentacion:
La explicacion completa de carpetas, responsabilidades y uso de SQL/Mongo esta en `documents/architecture.md`.

## CRUD de usuarios

Se agrego un CRUD para usuarios usando PostgreSQL y Sequelize, siguiendo la separacion por capas del proyecto: dominio, aplicacion, infraestructura e interfaces.

Funcionalidad:
- Crear usuarios con email, password y rol asociado.
- Listar todos los usuarios.
- Consultar un usuario por id.
- Actualizar datos de un usuario.
- Eliminar un usuario.
- Encriptar la password antes de guardarla o actualizarla.
- Actualizar solo la password y el rol del usuario. El email no se puede modificar.

Motivo:
Permitir la administracion basica de usuarios desde la API, reutilizar el modelo `TB_USUARIO` existente y evitar guardar contrasenas en texto plano.

## CRUD de roles

Se agrego un CRUD para roles usando PostgreSQL y Sequelize.

Funcionalidad:
- Crear roles.
- Listar roles.
- Consultar un rol por id.
- Actualizar el nombre de un rol.
- Eliminar un rol.

Motivo:
Permitir gestionar los roles que se asignan a los usuarios y reutilizar la tabla `TB_ROL` existente.

## CRUD de historias clinicas

Se agrego un CRUD para `clinical_history` usando MongoDB y Mongoose.

Funcionalidad:
- Crear una historia clinica para una mascota.
- Listar historias clinicas.
- Consultar una historia clinica por id.
- Consultar historias clinicas por mascota.
- Actualizar una historia clinica.
- Eliminar una historia clinica.

Motivo:
Guardar informacion clinica flexible de las mascotas, como sintomas, datos de salud, alimentacion, comportamiento, observaciones y estado del registro.

## Coleccion Postman

Se agrego la carpeta `postman` con una coleccion que contiene las rutas principales de la API y ejemplos de body.

Motivo:
Facilitar las pruebas manuales de los endpoints desde Postman.
