# Entre Nosotros

Aplicación responsive para registrar gastos compartidos, aportes y comprobantes familiares.

## Archivos

- `index.html`, `styles.css` y `app.js`: interfaz, vistas y cálculos.
- `firebase.js`: configuración del SDK web de Firebase y mapeo de nombres de usuario a correos de Authentication.

## Firebase

La aplicación carga Firebase Web SDK 12.19.0 como módulos ES desde `gstatic`, sin npm. Authentication usa correo y contraseña; el formulario pide nombre de usuario y contraseña. Al iniciar sesión, consulta `usuarios/{uid}` en Firestore y requiere los campos `nombre`, `usuario` y `rol`, con rol `admin` o `lector`.

Completa los cuatro correos de Authentication en este archivo: `firebase.js`. Usa los mismos correos que tienen las cuentas existentes. La configuración web de Firebase incluida ahí es pública; nunca agregues contraseñas ni claves de servicio al cliente.

El estado de Authentication se restaura al recargar. Las reglas de Firestore deben permitir que cada usuario autenticado lea su propio documento de `usuarios`. Los gastos, aportes, categorías e historial siguen guardándose localmente en este alcance; no se han migrado a Firestore.

Publica estos archivos en GitHub Pages. La página y `firebase.js` deben servirse desde el mismo origen para que funcionen los módulos ES.
