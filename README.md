# Entre Nosotros

Aplicación responsive para que una familia registre gastos compartidos, aportes y comprobantes con una distribución visible por persona.

## Estructura

- `index.html`: punto de entrada, navegación adaptable y contenedores de modales/notificaciones.
- `styles.css`: tokens de diseño, componentes y reglas responsive.
- `app.js`: vistas, cálculos, validación de formularios y persistencia local para la demo.
- `supabase/schema.sql`: modelo PostgreSQL inicial y políticas RLS para el backend.

## Abrir la demo

Abre `index.html` en un navegador moderno. No requiere instalación. La demo incluye datos familiares de ejemplo y guarda los cambios en `localStorage` del navegador. El botón del perfil permite alternar entre la vista de Gerson, administrador, y la vista sencilla de Maribel.

La vista de Maribel, Josué y Benjamín muestra el último gasto familiar, su parte, la deuda anterior y la deuda actual, más un historial con fecha, total, parte, estado y comprobante. No muestra las tarjetas de métricas antiguas, gráficos, reportes ni herramientas administrativas. Los gráficos y reportes quedan disponibles solo en la vista de Gerson.

Los datos locales son solo para demostración. No son una copia de seguridad compartida entre dispositivos ni sustituyen a Supabase.

## Integración Supabase

1. Crea un proyecto Supabase y ejecuta `supabase/schema.sql` desde el SQL Editor.
2. Crea la familia, sus perfiles y las categorías/beneficiarios iniciales desde un flujo de administración seguro.
3. Invita las cuentas de los cuatro hermanos mediante Supabase Auth y vincula cada UUID de Auth con una fila de `profiles`.
4. Configura `SUPABASE_URL` y la clave pública `anon` en el cliente. Nunca expongas `service_role`.
5. Sustituye el almacenamiento de demo por consultas autenticadas a `expenses`, `expense_allocations`, `payments`, `receipts` y `audit_log`.
6. Guarda comprobantes en Google Drive y almacena en `receipts.drive_url` un enlace compartible que la familia pueda abrir.

El esquema usa `expense_allocations` con una fila por hermano y gasto. Para guardar un gasto y sus participaciones de forma atómica, la integración debe insertar el gasto y las filas de asignación en una transacción (por ejemplo, una función RPC validada). En el reparto personalizado, la suma debe coincidir con `total_amount`; en el equitativo, calcula los céntimos restantes de forma determinista para que la suma sea exacta. Los aportes se conservan como movimientos independientes y el saldo se calcula como participaciones menos adelantos propios y pagos registrados.

Los miembros autenticados pueden consultar los datos familiares; solo administración puede crearlos o modificarlos. El esquema no añade políticas `DELETE` para los movimientos financieros: una anulación debe conservarse con estado y motivo.

## Alcance actual

La interfaz, navegación, cálculos de demo, filtros básicos, CSV de gastos y formularios funcionan en el navegador. La autenticación real, las consultas Supabase, los permisos validados por el servidor, las modificaciones/anulaciones auditadas y los archivos de Google Drive requieren conectar un proyecto y credenciales de Supabase. El enlace de Drive guardado en esta versión abre el recurso en una pestaña nueva; el proyecto no sube archivos directamente a Drive.
