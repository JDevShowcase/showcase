# Joseph Donoso · Portafolio

Mi espacio para compartir proyectos de desarrollo de software, gráficos 3D y optimización, junto con mi formación y experiencia como Ingeniero Civil Informático de la PUCV.

**[Explorar el portafolio →](https://jdevshowcase.github.io/showcase/)**

### Una mirada al sitio

- Interfaz en español e inglés, con tema claro y oscuro.
- Formación, experiencia académica y tecnologías utilizadas.
- Carrusel de proyectos con deslizamiento, imágenes y enlaces a sus repositorios.

Construido con **React · Vite · Tailwind CSS · Lucide**.

### Desarrollo local

```sh
npm ci
npm run dev
```

`npm run build` genera la versión de producción y `npm run lint` revisa el código.

### Agregar proyectos

Las tarjetas se administran desde [Projects_List.json](public/Projects/Projects_List.json). Duplica un proyecto con un `id` único y completa sus textos en español e inglés, tecnologías y enlaces.

Guarda las imágenes en `public/Projects/` y usa rutas sin el prefijo `public/`. Los enlaces sin destino pueden quedar en `null`; `links.article` habilita el acceso al artículo cuando esté publicado.

### Publicación

```sh
npm run deploy
```

Compila y publica el sitio en GitHub Pages.

---

[GitHub](https://github.com/JosephDonoso) · [LinkedIn](https://www.linkedin.com/in/joseph-donoso-b342a4324/)
