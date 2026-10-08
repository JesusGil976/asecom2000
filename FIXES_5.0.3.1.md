# AcademiaVE v5.0.3.1

Corrección de empaquetado para el editor de certificados.

## Problema corregido
El hotfix v5.0.3 anterior fue empaquetado accidentalmente dentro de una carpeta raíz `academiave-v503-hotfix/`. Al extraerlo como los hotfix anteriores, los archivos podían quedar dentro de una subcarpeta y el frontend se actualizaba parcialmente mientras el backend seguía sin registrar `/api/admin/certificates/layout`.

## Instalación
1. Detén `npm start`.
2. Extrae **el contenido de este ZIP directamente en la raíz del proyecto** (donde están `package.json`, `src/` y `public/`) y permite sobrescribir.
3. Ejecuta `node scripts/verify-v5031.js`. Debe terminar con `Hotfix v5.0.3.1 correctamente aplicado.`
4. Ejecuta `npm start`.
5. Abre `/api/health`; debe mostrar `5.0.3.1`.
6. Haz Ctrl+F5 y entra en Administración > Certificados.

No hay cambios de base de datos ni dependencias nuevas.
