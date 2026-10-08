# AcademiaVE v5.0.3 — Editor visual de certificados

## Cambio principal

El generador de certificados dejó de imponer una composición fija encima de cada plantilla. Ya no dibuja las bandas blancas que cubrían parte del diseño.

Administración → Certificados incorpora un editor visual basado en coordenadas porcentuales.

### Frente
- Nombre del alumno
- Curso
- Duración
- Fecha
- Código

### Reverso
- Contenido / clases
- Duración
- Código

Cada campo puede configurarse con:
- visible / oculto
- X e Y
- ancho y alto
- tamaño de texto
- color
- alineación
- estilo normal, negrita o cursiva

Los campos también se pueden arrastrar directamente sobre la vista previa.

## Plantillas

La plantilla puede incluir todos los elementos fijos: logotipo, firmas, sellos, encabezados, etiquetas como “Otorgado a:”, “Duración:”, “Fecha:” o “Contenido:”, bordes y decoración. AcademiaVE sólo superpone los valores variables.

Para minimizar recortes, se recomienda usar frente y reverso con relación A4 horizontal (aprox. 1.414:1). El PDF final sigue siendo A4 horizontal a dos páginas.

## Vista previa

El editor muestra datos ficticios para ajustar el diseño sin tener que completar un curso. **Ver PDF de prueba** guarda el layout actual y abre un PDF real generado por el backend con la plantilla configurada.

## Compatibilidad

No requiere migración de base de datos ni nuevas dependencias. El layout se guarda de forma segura en `site_settings` como configuración estructurada. Las instalaciones v5.0.2 pueden aplicar el hotfix conservando usuarios, cursos, pagos, CMS y certificados.
