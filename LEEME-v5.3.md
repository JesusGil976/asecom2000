# AcademiaVE 5.3 — actualización y primeros vídeos

Esta entrega contiene la aplicación completa. Incluye vídeo propio privado, enlaces externos, borradores de clases, orden mediante botones, reanudación de reproducción, subtítulos y correo HTML de recuperación. No incluye tu base de datos, tus credenciales SMTP ni tus vídeos: conserva los de tu instalación.

## 1. Actualizar desde tu versión que ya funciona

1. Detén Node con Ctrl+C y espera a que termine. Guarda una copia completa de la carpeta actual, incluidos `.env`, `data` y `public/uploads`.
2. Extrae el ZIP nuevo en otra carpeta. Copia tu `.env` y conserva tu base de datos y todos los archivos subidos. **No ejecutes `npm run setup` al actualizar.**
3. Si usas rutas por defecto, copia `data` y el contenido de `public/uploads` de la instalación anterior a la nueva, conservando tus archivos. Si tu `.env` ya usa rutas persistentes absolutas, mantenlas.
4. Añade las variables de vídeo del apartado siguiente a tu `.env`. Mantén el correo que ya te funciona; su nueva presentación se aplica automáticamente.
5. En una terminal dentro de la carpeta nueva:

```bash
npm ci
npm run check:video
npm run migrate
npm test
npm start
```

La migración conserva usuarios, contraseñas, matrículas, pagos, materiales y certificados. Las clases existentes conservan su visibilidad y sus enlaces. Las nuevas empiezan en borrador.

## 2. Instalar FFmpeg en Windows

Descarga un paquete de Windows desde los enlaces de [FFmpeg](https://ffmpeg.org/download.html). Extrae la carpeta y localiza **ffmpeg.exe y ffprobe.exe** dentro de `bin`. No basta con copiar el ZIP descargado a la carpeta de la academia.

Puedes añadir `bin` al PATH y volver a abrir la terminal, o indicar las rutas completas en `.env`, usando barras `/`. Ejemplo: sustituye estas rutas por las tuyas reales.

```dotenv
FFMPEG_PATH=C:/ffmpeg/bin/ffmpeg.exe
FFPROBE_PATH=C:/ffmpeg/bin/ffprobe.exe
MAX_VIDEO_BYTES=1073741824
VIDEO_STORAGE_BYTES=21474836480
MAX_PROCESSED_VIDEO_BYTES=4294967296
MAX_VIDEO_DURATION_SECONDS=10800
VIDEO_PROCESSING_TIMEOUT_MS=14400000
VIDEO_HEIGHTS=720,480
VIDEO_CRF=28
```

Valores iniciales: archivo de entrada de hasta 1 GiB, vídeo de hasta 3 horas, cuota de vídeo de 20 GiB y dos calidades máximas. La cuota no reserva físicamente disco ni significa que el hosting incluya ese espacio.

Para consumir menos espacio, usa `VIDEO_HEIGHTS=720`, con una sola calidad. CRF 28 prioriza tamaño; un número menor, como 24, aumenta calidad y suele ocupar más. Revisa una clase real con texto antes de convertir todo el catálogo. Reinicia Node cuando cambies `.env`.

En Linux, instala FFmpeg con el gestor de paquetes de tu distribución. El Dockerfile de esta entrega ya instala FFmpeg. Verifica siempre con `npm run check:video`.

## 3. Subir y publicar una clase

1. Administración → Cursos y clases → Clases → Nueva clase.
2. Añade título y contenido; elige **Vídeo propio**.
3. Selecciona un MP4, MOV o WebM compatible y pulsa **Subir y preparar vídeo**. La clase se guarda como borrador.
4. Espera al estado **Listo**. Puedes salir del editor mientras el servidor procesa, pero Node debe permanecer encendido.
5. Selecciona el vídeo preparado y usa **Previsualizar vídeo**. Añade PDF y subtítulos `.vtt` si los necesitas.
6. Elige **Publicada** y **Sólo matriculados**, y guarda. Para una clase gratuita, selecciona **Vista previa pública**.

Si se interrumpe la subida, vuelve a editar la misma clase y selecciona el mismo archivo original. El navegador conserva el identificador de reanudación localmente y consulta cuánto recibió el servidor. **Pausar** detiene la transferencia; **Retirar** elimina una subida pendiente o un activo sin uso. Las subidas incompletas y fallidas sin uso caducan después de 24 horas; los vídeos listos sin asociar después de 7 días. El mantenimiento se ejecuta al iniciar y cada hora.

Para reemplazar un vídeo ya publicado, guarda primero la clase como borrador. El vídeo anterior sigue asociado hasta que selecciones el nuevo y guardes. No puedes retirar un vídeo todavía asociado ni uno que se esté convirtiendo.

Para YouTube/Vimeo, elige **Enlace externo** y pega su URL. Esta opción permanece disponible. Los enlaces externos dependen de los permisos del proveedor.

El alumno puede continuar desde el segundo guardado, cambiar velocidad y, en el reproductor HLS.js, elegir calidad. Safari y dispositivos Apple usan reproducción HLS nativa cuando está disponible; allí la calidad puede quedar en manos del navegador. El alumno sigue marcando las clases completadas: ver un vídeo no emite automáticamente un certificado.

## 4. Cargar tus cursos antes de publicar

Sí: puedes preparar cursos y vídeos en tu PC y trasladarlos una sola vez al servidor. Los archivos preparados ya estarán disponibles después de migrar; no hace falta subir otra vez los originales ni reconvertirlos.

Para trasladar la instalación necesitas **código + base de datos + archivos privados + imágenes/plantillas públicas + configuración del servidor**. Copiar únicamente el ZIP de código no traslada los cursos que creaste.

Los vídeos se guardan dentro de `DATA_DIR/uploads/private/videos`; no debes copiarlos a `public/uploads`. Las cuentas y su progreso ocupan poco en comparación con los vídeos. Los alumnos no tienen una función de subida de archivos en esta versión; el disco sigue siendo compartido por base de datos, vídeos, materiales y respaldos.

La conversión guarda las calidades de reproducción y elimina el original del servidor al completarse. Conserva tus originales fuera de la plataforma para reeditar o volver a convertir. Dos calidades pueden ocupar más que un original ya muy comprimido: no hay una reducción de tamaño garantizada para cualquier archivo.

## 5. Respaldo y traslado

Detén el servidor antes de hacer una copia coherente. Para una copia con manifiesto:

```bash
npm run backup -- --confirm-stopped
```

El comando muestra la carpeta creada bajo `data/backups` o tu DATA_DIR. Copia esa carpeta fuera del equipo. Guarda `.env` por separado y de forma privada.

En el servidor Linux nuevo, cambia FFMPEG_PATH a ffmpeg y FFPROBE_PATH a ffprobe; configura PUBLIC_URL con el dominio HTTPS definitivo y las rutas de destino y restaura con todos los procesos de la academia detenidos:

```bash
npm run restore -- /ruta/al/respaldo --confirm-stopped
npm run migrate
npm start
```

Los vídeos utilizan identificadores y rutas relativas al almacenamiento privado, por lo que soportan trasladar datos desde Windows a Linux. La restauración prepara carpetas completas, comprueba hashes e integridad SQLite, conserva copias anteriores y revierte cambios ante errores detectados. No es una transacción atómica entre todos los discos; `--confirm-stopped` es tu declaración de que los procesos están detenidos.

## 6. Correo y pruebas por cloudflared

No necesitas crear otra cuenta de correo. Conserva `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASSWORD` y `MAIL_FROM` que ya te funcionan. El correo de recuperación tiene diseño HTML, botón, enlace alternativo, versión en texto y vencimiento de 30 minutos. El nombre de la academia se toma de Configuración. Su diseño no garantiza que el proveedor lo coloque fuera de spam.

Para tu prueba actual con cloudflared, mantén `PUBLIC_URL` igual a la URL HTTPS que abres en los teléfonos. Si el túnel temporal cambia de dirección, cambia esa variable y reinicia Node. `TRUST_PROXY=1` sólo cuando haya exactamente ese proxy de confianza delante de Node. No elimines la comprobación de origen.

## 7. Antes de abrir al público

Configura dominio HTTPS estable, `NODE_ENV=production`, secreto de sesión fuerte, correo, datos bancarios, contenido comercial y textos de privacidad/términos. Comprueba con alumnos de prueba registro, recuperación, pago, aprobación, reproducción en teléfonos y certificado. Ensaya respaldo/restauración y mide almacenamiento, CPU y reproducciones concurrentes con tus clases reales.

La entrega se probó en Node 24, Linux y Chromium. No se probó tu PC Windows, un iPhone/Android físico ni un despliegue Docker/Nginx real. HLS y los permisos dificultan compartir el contenido mediante enlaces, pero no son DRM ni impiden toda descarga o grabación por un alumno autorizado.


## Validación de esta entrega

60 pruebas automatizadas aprobadas, también después de npm ci en una carpeta limpia. Comprobación estructural/sintáctica y compatibilidad aprobadas; npm audit no reportó vulnerabilidades conocidas en el árbol de dependencias Node consultado. 175 pantallas y 17 flujos generales de Chromium, más 8 flujos y 10 capturas del editor, reproducción y correo. Sin errores de consola ni desbordamiento global en esas pruebas. Los resultados y logs están dentro de qa.

Una muestra de 12 segundos pasó de 9.690.949 bytes de origen a 2.642.032 bytes para HLS 720p y 480p. Es una muestra medida, no una garantía para todas tus clases. No se realizó una prueba de carga de producción.
