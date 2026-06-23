# Plataforma de evaluación de aulas virtuales en Moodle

Facultad de Derecho · UNCUYO

Sitio estático para GitHub Pages que permite evaluar aulas virtuales de Moodle mediante una grilla institucional por descriptores.

## Qué incluye

- Evaluación por 11 dimensiones y 38 descriptores.
- Escala: 1 Nada, 2 Poco, 3 Neutro, 4 Mucho, 5 Totalmente, NA No aplica.
- Cálculo automático de puntaje global sobre 100.
- Puntaje por dimensión.
- Observaciones/evidencias por dimensión.
- Priorización automática de mejoras.
- Guardado local en el navegador.
- Exportación JSON y CSV.
- Opción de imprimir o guardar PDF.

## Estructura

```text
index.html
styles.css
data.js
app.js
README.md
.nojekyll
```

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir estos archivos a la raíz del repositorio.
3. Ir a Settings > Pages.
4. En Source elegir `Deploy from a branch`.
5. Elegir rama `main` y carpeta `/root`.
6. Guardar.

## Editar carreras, cátedras o criterios

Editar `data.js`.

## Limitación

Esta versión no usa servidor. Las evaluaciones se guardan en `localStorage`, es decir, en el navegador de cada persona. Para uso institucional centralizado se recomienda conectar Firebase, Supabase, Google Sheets o una base de datos propia.
