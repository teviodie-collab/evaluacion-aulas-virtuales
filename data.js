/*
  Plataforma de evaluación de aulas virtuales en Moodle
  Facultad de Derecho · UNCUYO

  Esta versión incorpora la grilla por descriptores del instrumento institucional:
  escala 1 Nada, 2 Poco, 3 Neutro, 4 Mucho, 5 Totalmente, NA No aplica.
*/

window.APP_CONFIG = {
  institutionName: "Facultad de Derecho de la UNCUYO",
  siteName: "Plataforma de evaluación de aulas virtuales en Moodle de la Facultad de Derecho de la UNCUYO",
  storageKey: "evaluaciones-aulas-virtuales-derecho-uncuyo-v3",
  thresholds: {
    approved: 70,
    conditional: 55,
    dimensionCritical: 50,
    accessibilityMinimum: 50
  },
  scale: [
    { value: "1", label: "Nada", help: "No se observa cumplimiento del descriptor." },
    { value: "2", label: "Poco", help: "Cumplimiento incipiente, parcial o débil." },
    { value: "3", label: "Neutro", help: "Cumplimiento medio, aceptable pero no consolidado." },
    { value: "4", label: "Mucho", help: "Cumplimiento alto y consistente." },
    { value: "5", label: "Totalmente", help: "Cumplimiento pleno, claro y verificable." },
    { value: "NA", label: "NA", help: "No aplica al aula evaluada; no suma ni resta." }
  ],
  programs: {
    abogacia: {
      label: "Abogacía",
      courseLabel: "Cátedra",
      placeholder: "-- Seleccionar cátedra --",
      courses: [
        "Introducción a la Filosofía",
        "Problemática del Conocimiento",
        "Introducción al Derecho",
        "Derecho Romano",
        "Historia de las Instituciones Argentinas y Latinoamericanas",
        "Derecho Político",
        "Derecho Civil",
        "Inglés I",
        "Derecho Penal Parte General I",
        "Derecho Constitucional",
        "Principios de la Economía",
        "Derecho de las Obligaciones I",
        "Inglés II",
        "Práctica Profesional Supervisada I",
        "Derecho Penal Parte General II",
        "Finanzas Públicas y Derecho Tributario",
        "Derecho de las Obligaciones II",
        "Derecho del Consumidor y Defensa de la Competencia",
        "Inglés III",
        "Práctica Profesional Supervisada II",
        "Derecho Penal Parte Especial I",
        "Derecho Comercial y Societario I",
        "Contratos Civiles y Comerciales I",
        "Sociología del Derecho",
        "Práctica Profesional Supervisada III",
        "Derecho Penal Parte Especial II",
        "Derecho Comercial y Societario II",
        "Contratos Civiles y Comerciales II",
        "Filosofía del Derecho",
        "Mediación I",
        "Práctica Profesional Supervisada IV",
        "Derechos Reales I",
        "Títulos Valores",
        "Derecho del Trabajo y la Seguridad Social",
        "Derecho Procesal Civil y Comercial. Parte General",
        "Mediación II",
        "Práctica Profesional Supervisada V",
        "Derechos Reales II",
        "Derecho Procesal Civil y Comercial. Parte Especial",
        "Derecho Concursal",
        "Derecho de las Familias",
        "Derechos Humanos",
        "Metodología de la Investigación I",
        "Práctica Profesional Supervisada VI",
        "Derecho Sucesorio",
        "Derecho Administrativo I",
        "Derecho Procesal Penal I",
        "Derecho Internacional Público y de la Integración",
        "Mediación III",
        "Práctica Profesional Supervisada VII",
        "Derecho Administrativo II",
        "Derecho Procesal Penal II",
        "Derecho de los Recursos Naturales, Aguas y Protección del Medio Ambiente",
        "Derecho Internacional Privado",
        "Metodología de la Investigación II",
        "Práctica Profesional Supervisada VIII",
        "--- Espacios Curriculares Optativos ---",
        "Derecho Público Provincial y Municipal",
        "Derecho de la Salud y Responsabilidad Médica",
        "Criminología",
        "Derecho del Transporte",
        "Derecho Electoral",
        "Derecho del Deporte",
        "Inteligencia Criminal y Crimen Organizado",
        "Derecho Aeronáutico",
        "Derecho Aduanero",
        "Derecho Procesal Constitucional",
        "Derecho Informático",
        "Análisis Económico del Derecho",
        "Derecho Bancario, Bursátil y Seguros",
        "Propiedad Horizontal y Conjuntos Inmobiliarios",
        "Derecho Penal Económico",
        "Procedimientos y Procesos Administrativos Especiales",
        "Empresa Familiar",
        "Integración Regional",
        "Derecho de los Negocios Internacionales",
        "Derecho Notarial y Registral"
      ]
    },
    tecnicatura: {
      label: "Tecnicatura Universitaria en Administración de Edificios de Propiedad Horizontal y Conjuntos Inmobiliarios",
      courseLabel: "Cátedra",
      placeholder: "-- Seleccionar cátedra --",
      courses: [
        "Introducción a la Comunicación",
        "Ética Profesional",
        "Inglés I",
        "Manejo de Utilitarios PC",
        "Introducciones Contables I",
        "Fundamentos del Derecho I",
        "Higiene y Seguridad",
        "Práctica Profesional I",
        "Problemática de la Comunicación",
        "Psicología Social",
        "Inglés II",
        "Introducciones Contables II",
        "Fundamentos del Derecho II",
        "Estructura Edilicia",
        "Práctica Profesional II",
        "Mediación, Negociación y Resolución de Conflictos",
        "Comercio Vinculado a la Administración Edilicia",
        "Liquidación de Sueldos y Seguridad Social",
        "Obligaciones, Familia y Sucesiones",
        "Derechos Reales y Registral",
        "Propiedad Horizontal",
        "Comportamiento Organizacional",
        "Práctica Profesional III",
        "Rendición de Cuentas y Régimen Impositivo",
        "Ordenamiento Territorial, Ingeniería y Arquitectura",
        "Diseño y Proyectos Inmobiliarios",
        "Contratos",
        "Derecho Laboral",
        "Conjuntos Inmobiliarios",
        "Práctica Profesional IV",
        "Proyecto Final"
      ]
    },
    posgrado: {
      label: "Oferta de posgrado",
      courseLabel: "Oferta de posgrado",
      placeholder: "-- Seleccionar oferta de posgrado --",
      courses: [
        "Doctorado en Derecho",
        "Maestría en Derecho de las Familias",
        "Maestría en Magistratura y Gestión Judicial",
        "Maestría en Derecho del Trabajo",
        "Maestría en Derecho Penal",
        "Maestría en Derecho Administrativo",
        "Diplomatura de Posgrado en Derechos de las Personas con Discapacidad",
        "Diplomatura de Posgrado en Docencia del Derecho",
        "Diplomatura de posgrado en Mediación y gestión participativa de conflictos",
        "Formación Básica en Mediación homologada por el Ministerio de Justicia y Derechos Humanos de la Nación"
      ]
    }
  }
};

window.RUBRIC = [
  {
    id: "objetivos",
    number: "1",
    title: "Objetivos, competencias y coherencia didáctica",
    description: "Revisa si el aula explicita la propuesta pedagógica, los objetivos/competencias y la organización temporal, y si existe alineación entre esos elementos.",
    items: [
      { code: "1.1", text: "En el inicio del aula virtual se comparte un programa, guía didáctica u hoja de ruta con la propuesta pedagógica." },
      { code: "1.2", text: "Los objetivos de aprendizaje o competencias se expresan con claridad y están escritos desde la perspectiva de los estudiantes." },
      { code: "1.3", text: "Se indica el tiempo estimado de aprendizaje y/u organización temporal, incluyendo la modalidad de cursado presencial y/o virtual." },
      { code: "1.4", text: "Existe coherencia o alineación entre objetivos/competencias, actividades, evaluación y recursos digitales utilizados." }
    ]
  },
  {
    id: "evaluacion",
    number: "2",
    title: "Evaluación",
    description: "Analiza la relación entre propuesta curricular, criterios, instrumentos de evaluación y formas de retroalimentación.",
    items: [
      { code: "2.1", text: "Hay coherencia entre el formato curricular, la propuesta de evaluación y el desarrollo de contenidos/actividades a lo largo del cursado." },
      { code: "2.2", text: "Se establecen claramente los criterios de evaluación de las actividades propuestas y las formas de retroalimentación." },
      { code: "2.3", text: "Se proponen diferentes instrumentos de evaluación, por ejemplo cuestionarios, portafolios, producciones u otros." }
    ]
  },
  {
    id: "tecnologias",
    number: "3",
    title: "Tecnologías digitales",
    description: "Revisa la pertinencia de las herramientas digitales para sostener objetivos, participación, comunicación y colaboración.",
    items: [
      { code: "3.1", text: "Las tecnologías digitales utilizadas en el curso son pertinentes y funcionales a los objetivos de aprendizaje o competencias." },
      { code: "3.2", text: "Las tecnologías digitales utilizadas apoyan la participación de los estudiantes y el aprendizaje activo." },
      { code: "3.3", text: "Se utilizan recursos digitales que favorecen la comunicación." },
      { code: "3.4", text: "Se utilizan recursos digitales que favorecen el trabajo colaborativo." }
    ]
  },
  {
    id: "usabilidad",
    number: "4",
    title: "Usabilidad",
    description: "Evalúa si el aula resulta navegable, clara, estable y sin obstáculos innecesarios para encontrar contenidos y actividades.",
    items: [
      { code: "4.1", text: "Es fácil navegar y se encuentran rápidamente los contenidos buscados." },
      { code: "4.2", text: "La interfaz cuenta con un diseño implícito que informa cómo interactuar, o existen instrucciones de uso claras." },
      { code: "4.3", text: "Todos los enlaces funcionan correctamente; no hay enlaces rotos o que conduzcan a contenido erróneo." },
      { code: "4.4", text: "La navegación es sencilla, con mínimo número de clics y de efectos distractores." }
    ]
  },
  {
    id: "mediacion_materiales",
    number: "5",
    title: "Mediación de materiales",
    description: "Observa claridad, atractivo, completitud de consignas y respeto de propiedad intelectual en los materiales disponibles.",
    items: [
      { code: "5.1", text: "La presentación del contenido es clara; se localizan rápidamente los apartados e ideas que se exponen." },
      { code: "5.2", text: "Los contenidos se presentan de forma atractiva o innovadora, por ejemplo infografías, audios, videos u otros recursos." },
      { code: "5.3", text: "Las consignas están bien formuladas y permiten responder qué, para qué, cómo, con qué, quiénes, dónde y cuándo." },
      { code: "5.4", text: "El contenido respeta los derechos de propiedad intelectual cuando utiliza otras fuentes." }
    ]
  },
  {
    id: "reflexion_innovacion",
    number: "6",
    title: "Capacidad de generar reflexión, crítica e innovación",
    description: "Revisa si las actividades promueven aprendizaje significativo, comprensión, colaboración, producción, metodologías activas y pensamiento crítico.",
    items: [
      { code: "6.1", text: "Se promueve el aprendizaje significativo: es clara la relación entre lo ya aprendido y los nuevos conocimientos." },
      { code: "6.2", text: "Se proponen actividades para el acceso y comprensión de la información, como lectura, búsqueda o exploración guiada." },
      { code: "6.3", text: "Se proponen actividades para construir colaborativamente." },
      { code: "6.4", text: "Se proponen actividades que permiten visualizar o expresar lo comprendido mediante producción y publicación de información." },
      { code: "6.5", text: "Se proponen metodologías activas, como resolución de proyectos, problemas, casos o ejercicios." },
      { code: "6.6", text: "Las actividades estimulan la reflexión, la capacidad crítica y la creación de nuevas ideas, procedimientos, métodos o técnicas." }
    ]
  },
  {
    id: "interactividad_adaptabilidad",
    number: "7",
    title: "Interactividad y adaptabilidad",
    description: "Evalúa si el contenido y las actividades ofrecen interacción, alternativas o recorridos diferenciados según acciones, niveles o posibilidades de cursado.",
    items: [
      { code: "7.1", text: "La presentación del contenido no es estática, sino que depende del uso que haga el estudiante." },
      { code: "7.2", text: "Se proponen diferentes actividades o itinerarios según niveles de conocimiento, posibilidades de cursado o capacidades de aprendizaje." },
      { code: "7.3", text: "El aula facilita que el estudiante controle y maneje su aprendizaje, eligiendo contenido o actividad siguiente según su respuesta o recorrido previo." }
    ]
  },
  {
    id: "autonomia",
    number: "8",
    title: "Promoción del aprendizaje autónomo",
    description: "Revisa si la claridad de la propuesta favorece el trabajo autónomo y su vinculación con el entorno profesional o social.",
    items: [
      { code: "8.1", text: "La claridad de la propuesta facilita el trabajo autónomo por parte del estudiante." },
      { code: "8.2", text: "Existe relación entre lo aprendido y el entorno profesional y/o social de los estudiantes." }
    ]
  },
  {
    id: "formato_diseno",
    number: "9",
    title: "Formato y diseño",
    description: "Evalúa variedad de formatos, adecuación estética y calidad de textos, imágenes y audios.",
    items: [
      { code: "9.1", text: "Se utilizan formatos multimodales —texto, imagen, audio, video— para aprovechar diferentes formas de aprendizaje." },
      { code: "9.2", text: "El aula es estéticamente adecuada para el estudio y la reflexión; no tiene exceso de colores, audios o videos que distraigan." },
      { code: "9.3", text: "Los textos, imágenes y audios son de buena calidad." }
    ]
  },
  {
    id: "accesibilidad",
    number: "10",
    title: "Accesibilidad",
    gate: true,
    description: "Dimensión de atención prioritaria: observa adaptación a personas con discapacidad, accesibilidad web y accesibilidad de contenidos multimedia.",
    items: [
      { code: "10.1", text: "El material está adaptado a personas con discapacidad visual, auditiva o motora." },
      { code: "10.2", text: "Cumple criterios de accesibilidad web y criterios de accesibilidad de contenidos multimedia." },
      { code: "10.3", text: "El curso proporciona textos e imágenes accesibles en archivos, documentos, páginas LMS y páginas web para diversos estudiantes." }
    ]
  },
  {
    id: "tutoria",
    number: "11",
    title: "Tutoría",
    description: "Revisa si existe seguimiento académico y motivacional, y si están claros horarios y modos de contacto con el equipo docente.",
    items: [
      { code: "11.1", text: "Se elabora un plan de acción tutorial para realizar el seguimiento académico y motivacional del trabajo individual y grupal." },
      { code: "11.2", text: "Se establecen los horarios y modos de contacto con el profesor o equipo docente a través de diferentes canales de comunicación." }
    ]
  }
];
