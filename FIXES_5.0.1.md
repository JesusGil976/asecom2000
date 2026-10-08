# AcademiaVE v5.0.1 — Hotfix

## Correcciones

1. **Configuración de Pago Móvil y tasa Bs/USD**
   - Se corrigió la lista blanca de configuración administrativa: `payment_bank`, `payment_phone`, `payment_document` y `exchange_rate` ahora se persisten correctamente en `site_settings`.
   - El formulario confirma la tasa que quedó guardada y muestra errores de API en lugar de indicar éxito silenciosamente.
   - La tasa configurada se utiliza para pagos nuevos; los pagos ya creados conservan la tasa histórica almacenada en cada pago.

2. **Plantillas de certificado**
   - Se añadieron `certificate_front_url` y `certificate_back_url` a la lista blanca administrativa. La subida/edición de plantillas ahora persiste correctamente.

3. **Sidebar de Administración**
   - Se eliminó el overflow horizontal que cortaba el nombre de la academia.
   - Se ajustó el ancho de la columna, el tamaño del título y el wrapping para nombres largos.
   - El sidebar conserva únicamente scroll vertical cuando es necesario.

## Pruebas añadidas

- Persistencia de configuración de Pago Móvil y tasa.
- Persistencia de URLs de plantillas de certificado.
- Rechazo de tasa inválida.
- Caso de integración HTTP para guardar la tasa desde Administración y leerla desde `/api/payment-config` (se ejecuta cuando las dependencias npm están disponibles).
