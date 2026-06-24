# Plataforma de evaluación de aulas virtuales en Moodle

Facultad de Derecho · UNCUYO

Versión 4 del sitio estático para GitHub Pages. Esta versión amplía el instrumento a partir del Formulario Evaluación FCE y mantiene la estructura institucional para evaluar aulas virtuales en Moodle.

## Qué incluye

- Datos de identificación del aula virtual:
  - correo electrónico
  - nombre del aula virtual
  - carrera/oferta académica
  - cátedra u oferta de posgrado
  - código SIU
  - espacios curriculares según SIU
  - equipo docente según SIU
  - referentes evaluadores
  - modalidad
  - último acceso/revisión
- Instrumento por bloques:
  1. Presentación y visión general del curso
  2. Interacción y tutoría
  3. Recursos
  4. Actividades y evaluación
  5. Diseño instruccional y accesibilidad
  6. Internacionalización y nacionalización del currículum / COIL
  7. Observaciones generales y nivel de digitalización
- Listas de aspectos observables para marcar lo que NO está presente.
- Escala 1–6:
  - 1 Inicial
  - 2 Básico
  - 3 Organizado
  - 4 Personalizado
  - 5 Avanzado
  - 6 Innovador
- Cálculo automático de puntaje global sobre 100.
- Puntaje por bloque.
- Detección de prioridades de mejora.
- Aval orientativo según nivel de digitalización.
- Guardado local en el navegador.
- Exportación JSON.
- Exportación CSV del historial.
- Copia de informe breve.
- Impresión / guardar como PDF.

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

1. Crear un repositorio público en GitHub.
2. Subir estos archivos sueltos en la raíz del repositorio.
3. Ir a `Settings > Pages`.
4. Elegir `Deploy from a branch`.
5. Seleccionar rama `main` y carpeta `/root`.
6. Guardar y esperar el enlace público.

## Actualizar una versión anterior

1. Descargar y descomprimir el ZIP.
2. Entrar al repositorio existente.
3. Usar `Add file > Upload files`.
4. Subir estos archivos sueltos, no el ZIP.
5. Confirmar con `Commit changes`.
6. Esperar que GitHub Pages actualice.

## Importante

Esta versión no usa servidor ni base central. Las evaluaciones se guardan en el navegador de quien completa el instrumento. Para uso institucional con múltiples evaluadores se recomienda conectar una base central como Firebase, Supabase, Google Sheets o una base propia de la Facultad.
