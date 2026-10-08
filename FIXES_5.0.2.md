# AcademiaVE v5.0.2 — Aula y responsive móvil

## Aula

- Navegación **Clase anterior / Siguiente clase** debajo del contenido.
- En teléfonos, la navegación queda disponible en una barra inferior `sticky` con soporte para `safe-area-inset-bottom`.
- El temario pasa a ser plegable en pantallas estrechas para dar prioridad al contenido de la clase.
- El progreso se recalcula en la propia vista al marcar una clase como completada o pendiente.
- Al llegar a la última clase se ofrece volver al dashboard; la generación/descarga del certificado se mantiene en las acciones del aula.

## Header móvil

- En <= 820 px, las acciones móviles se agrupan en el extremo derecho.
- En <= 640 px se muestra a la izquierda únicamente la marca/logo, y a la derecha el CTA principal (`Crear cuenta` para visitantes o `Mi aprendizaje` para usuarios) seguido del botón de menú.
- El CTA principal ya no se duplica dentro del menú desplegable; el menú conserva las acciones secundarias.

## QA responsive

Pasada específica sobre los breakpoints objetivo 360, 390, 414, 768 y 1024 px a nivel de estructura/CSS:

- prevención de overflow horizontal global;
- cards y textos largos con wrapping seguro;
- formularios y controles sin `min-width` conflictivos;
- aula con temario colapsable y navegación inferior;
- administración convertida a navegación horizontal desplazable en tablet/teléfono;
- tablas mantienen scroll dentro de su contenedor, sin ampliar el viewport;
- modales y formularios usan ancho disponible en móvil;
- acciones principales pasan a ancho completo donde mejora la ergonomía táctil;
- compatibilidad con safe areas en dispositivos móviles.

## Validación automatizada

`npm run check` valida la sintaxis/estructura del proyecto. `tests/ui-responsive.test.js` añade regresiones para la cabecera móvil, la navegación de aula y los breakpoints responsive.
