# Portafolio de Joseph Donoso

Portafolio bilingüe con React, Vite y Tailwind CSS.

## Desarrollo

Instalar: `npm ci`. Iniciar: `npm run dev`.
Validar: `npm run build` y `npm run lint`.

## Proyectos editables

Editar `public/Projects/Projects_List.json`. Duplicar un objeto dentro de `projects` para agregar una tarjeta, usando un `id` único.

- `title`: nombre del proyecto.
- `category` y `description`: objetos con textos `es` y `en`.
- `features`: objeto con listas de funcionalidades `es` y `en`.
- `skills`: lista de tecnologías; también alimenta el stack del perfil.
- `links.demo` y `links.github`: URLs completas o `null` para omitir enlaces.
- `image`: ruta relativa a `public` (por ejemplo `Projects/Venta_UPLA/main.png`), o `null` para omitir la imagen.
- `gallery`: lista de rutas adicionales, reservada para una futura galería; actualmente no se muestra.

Mantener ambos idiomas y JSON válido, sin comas finales. Guardar imágenes dentro de `public/Projects/`, sin incluir `public/` en las rutas del JSON.

## Publicación

`npm run deploy` compila y publica en GitHub Pages. La base configurada es `/showcase/`.
