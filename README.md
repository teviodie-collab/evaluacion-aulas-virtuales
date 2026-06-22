# Plataforma de evaluación de aulas virtuales

Prototipo estático para GitHub Pages. Permite evaluar aulas virtuales con una grilla institucional ponderada de 10 dimensiones, calcular el puntaje global, generar prioridades de mejora, guardar evaluaciones en el navegador y exportar resultados.

## Qué incluye

- Grilla de 10 dimensiones con escala 0 a 4.
- Pesos institucionales que suman 100 puntos.
- Umbrales no negociables para accesibilidad y seguridad/privacidad/cumplimiento legal.
- Cálculo automático de estado: aprobada, condicionada o crítica.
- Campos de evidencia por dimensión.
- Informe breve y prioridades de mejora.
- Historial local con `localStorage`.
- Exportación a JSON y CSV.
- Impresión o guardado como PDF desde el navegador.

## Archivos

```text
index.html   # Estructura del sitio
styles.css   # Estilos visuales
app.js       # Lógica de evaluación, scoring, guardado y exportación
data.js      # Carreras, aulas y rúbrica editable
.nojekyll    # Evita procesamiento Jekyll en GitHub Pages
```

## Cómo subirlo a GitHub Pages

1. Crear un repositorio nuevo en GitHub, por ejemplo: `evaluacion-aulas-virtuales`.
2. Subir estos archivos a la raíz del repositorio.
3. Ir a **Settings > Pages**.
4. En **Build and deployment**, elegir:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guardar.
6. GitHub publicará el sitio en una dirección similar a:
   `https://TU-USUARIO.github.io/evaluacion-aulas-virtuales/`

## Cómo adaptar carreras y aulas

Editar `data.js`, sección `programs`:

```js
programs: {
  "abogacia": {
    label: "Carrera de Abogacía",
    courses: ["Introducción al Derecho", "Derecho Romano"]
  }
}
```

Podés cambiar nombres, agregar carreras y reemplazar aulas de ejemplo por las reales de la facultad.

## Cómo modificar la rúbrica

Editar `data.js`, sección `RUBRIC`. Cada dimensión tiene:

- `id`: identificador interno, sin espacios.
- `title`: nombre visible.
- `weight`: peso en el puntaje final.
- `gate`: `true` cuando es una dimensión de umbral mínimo.
- `description`: explicación breve.
- `indicators`: evidencias observables.
- `scale`: descriptores de 0 a 4.

La suma de los pesos debe ser 100.

## Limitación importante

Esta versión no tiene servidor ni base de datos centralizada. Los datos se guardan en el navegador de cada persona. Para evaluar todas las aulas de una facultad de forma institucional y consolidada, conviene hacer una segunda etapa con Firebase, Supabase, Moodle API o una base institucional.

## Segunda etapa recomendada

- Login institucional.
- Base central de evaluaciones.
- Roles: administración, evaluadores, docentes, autoridades.
- Integración con Moodle/Canvas.
- Carga de evidencias con archivos.
- Dashboard por carrera, año, asignatura y dimensión.
- Exportación institucional para informes de gestión y acreditación.
