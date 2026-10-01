# Entre Nosotros

Aplicación responsive para registrar gastos compartidos, aportes y comprobantes familiares.

## Archivos

- `index.html`, `styles.css` y `app.js`: interfaz, vistas y cálculos.
- `firebase.js`: configuración del SDK web de Firebase y mapeo de nombres de usuario a correos de Authentication.
- `github-published/`: copia que se publica en GitHub Pages.

## Firebase

La aplicación carga Firebase Web SDK 12.19.0 como módulos ES desde `gstatic`, sin npm. Authentication usa correo y contraseña; el formulario pide nombre de usuario y contraseña. Al iniciar sesión, consulta `usuarios/{uid}` en Firestore y requiere los campos `nombre`, `usuario` y `rol`, con rol `admin` o `lector`.

Completa los cuatro correos de Authentication en `firebase.js` y en `github-published/firebase.js`. Usa los mismos correos que tienen las cuentas existentes. La configuración web de Firebase incluida ahí es pública; nunca agregues contraseñas ni claves de servicio al cliente.

El estado de Authentication se restaura al recargar. Después de leer `usuarios/{uid}`, la aplicación escucha en tiempo real las colecciones compartidas de Firestore:

- `gastos/{id}`: `date`, `createdAt`, `updatedAt`, `description`, `category`, `subcategory`, `beneficiary`, `amount`, `paidBy` y `paidByUsername`/`paidByUid`, `participants` y sus `participantUsernames`/`participantUids`, `distribution`, `allocations` (cuando corresponde), `receipt`, `notes`, `active`/`status`, y los UID/nombres de usuario que registraron y actualizaron el gasto.
- `pagos/{id}`: `personId`, `personUsername`, `personUid`, `amount`, `date`, `method`, `concept`, `note`, `receipt`, `createdAt`, `updatedAt`, y los UID/nombres de usuario que registraron y actualizaron el pago.
- `historial/{id}`: `type`, `text`, `date`, `time`, `createdAt`, `actorUid`, `actorUsername`, `actorName`, `entityId` y `action`.
- `configuracion/categorias` (documento): `items` con las categorías/subcategorías y metadatos de actualización.

Gastos, pagos e historial se guardan en Firestore mediante escrituras por lotes y se actualizan en las vistas con listeners `onSnapshot`. Las categorías también se sincronizan entre dispositivos. No se importan gastos, pagos ni historial de los antiguos datos locales de demostración; al iniciar la integración solo se puede conservar la definición local de categorías para inicializar `configuracion/categorias` si aún no existe.

La deuda pendiente se calcula como la participación acumulada de gastos activos menos los pagos registrados y los adelantos del propio participante; no se guarda un saldo manual. En el Resumen, administración puede abrir `Registrar pago` junto a cada saldo pendiente, rellenar el monto total con `Pagar deuda total`, o introducir un pago parcial. El formulario impide superar el pendiente calculado. Los pagos mantienen su documento e ID al editarse; al eliminarlos se borran con confirmación y se registra el evento en `historial`.

Las reglas deben permitir lectura autenticada de `gastos`, `pagos`, `historial` y `configuracion/categorias`, y escrituras solamente al UID cuyo documento `usuarios/{uid}` tenga `rol == "admin"`. Comprueba las reglas de cada ruta de Firestore antes de usar la aplicación. Los documentos se pueden revisar en Firebase Console → Firestore Database → Data, dentro de esas colecciones.

## Publicación

Publica el contenido de `github-published/` en GitHub Pages. La página y `firebase.js` deben servirse desde el mismo origen para que funcionen los módulos ES.
