/*
  Plataforma de evaluación de aulas virtuales en Moodle
  Facultad de Derecho · UNCUYO

  Versión 4: instrumento ampliado a partir de la transcripción del Formulario Evaluación FCE.
  Integra identificación del aula, aspectos observables, escala 1-6 por bloques,
  COIL/internacionalización y nivel de digitalización.
*/

window.APP_CONFIG = {
  "institutionName": "Facultad de Derecho de la UNCUYO",
  "siteName": "Plataforma de evaluación de aulas virtuales en Moodle de la Facultad de Derecho de la UNCUYO",
  "storageKey": "evaluaciones-aulas-virtuales-derecho-uncuyo-v4",
  "thresholds": {
    "approved": 70,
    "conditional": 55,
    "sectionCritical": 50,
    "accessibilityMinimum": 50
  },
  "scale": [
    {
      "value": "1",
      "label": "1 · Inicial",
      "shortLabel": "1",
      "help": "Ausente, repositorio mínimo o uso sin mediación pedagógica verificable."
    },
    {
      "value": "2",
      "label": "2 · Básico",
      "shortLabel": "2",
      "help": "Presencia parcial o uso instrumental, con organización todavía débil."
    },
    {
      "value": "3",
      "label": "3 · Organizado",
      "shortLabel": "3",
      "help": "Cumplimiento aceptable, con criterios explícitos y cierta organización didáctica."
    },
    {
      "value": "4",
      "label": "4 · Personalizado",
      "shortLabel": "4",
      "help": "Uso consistente, mediado y articulado con la propuesta pedagógica."
    },
    {
      "value": "5",
      "label": "5 · Avanzado",
      "shortLabel": "5",
      "help": "Aula multimodal, interactiva, con seguimiento, retroalimentación y accesibilidad atendida."
    },
    {
      "value": "6",
      "label": "6 · Innovador",
      "shortLabel": "6",
      "help": "Trayecto altamente personalizado, integrado con tecnologías emergentes, redes, IA, COIL o validación de comunidad."
    }
  ],
  "programs": {
    "abogacia": {
      "label": "Abogacía",
      "courseLabel": "Cátedra",
      "placeholder": "-- Seleccionar cátedra --",
      "courses": [
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
    "tecnicatura": {
      "label": "Tecnicatura Universitaria en Administración de Edificios de Propiedad Horizontal y Conjuntos Inmobiliarios",
      "courseLabel": "Cátedra",
      "placeholder": "-- Seleccionar cátedra --",
      "courses": [
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
    "posgrado": {
      "label": "Oferta de posgrado",
      "courseLabel": "Oferta de posgrado",
      "placeholder": "-- Seleccionar oferta de posgrado --",
      "courses": [
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

window.EVALUATION_MODEL = [
  {
    "id": "presentacion",
    "number": "1",
    "title": "Presentación y visión general del curso",
    "weight": 18,
    "description": "Observa el bloque inicial del aula virtual, la presentación del espacio curricular y la explicitación de la propuesta pedagógica.",
    "observablesLabel": "Aspectos observables que NO están presentes en el bloque inicial",
    "observables": [
      "Programa",
      "Cronograma",
      "Horarios de clase y de consulta",
      "Equipo de cátedra",
      "Imagen de portada",
      "Fundamentación",
      "Aportes al perfil de egreso",
      "Expectativas de logros",
      "Contenidos",
      "Propuesta metodológica presencial y virtual",
      "Propuesta de evaluación presencial y virtual",
      "Propuesta COIL",
      "Competencias digitales"
    ],
    "criteria": [
      {
        "id": "bibliografia_presentacion",
        "title": "Presentación de bibliografía y webgrafía",
        "prompt": "Evalúa cómo se presenta la bibliografía, webgrafía y recursos en el programa y en el aula virtual.",
        "levels": {
          "1": "No hay indicación clara de bibliografía/webgrafía en programa ni aula virtual.",
          "2": "La bibliografía aparece sólo listada en el programa, con acceso parcial o poco claro.",
          "3": "La bibliografía está indicada en el programa y cargada o enlazada en el aula virtual.",
          "4": "Los materiales se alojan en carpetas Moodle o nube institucional, con acceso ordenado.",
          "5": "Incluye enlaces a recursos multimodales, repositorios abiertos o recursos institucionales.",
          "6": "La bibliografía y webgrafía se articulan con un recorrido didáctico claro, multimodal y actualizado."
        }
      },
      {
        "id": "bibliografia_organizacion",
        "title": "Organización y derechos de autor",
        "prompt": "Evalúa identificación, denominación accesible, organización de PDF/enlaces y respeto de derechos de autor.",
        "levels": {
          "1": "Materiales dispersos, sin organización ni identificación suficiente.",
          "2": "Listado básico, con nombres poco claros o sin criterios de organización.",
          "3": "Organización en aula con PDF y enlaces identificables por unidad o tema.",
          "4": "Denominación accesible, carpetas o secciones ordenadas y enlaces funcionales.",
          "5": "Uso preferente de enlaces URL/hipertextuales y referencias respetuosas de autoría.",
          "6": "Curaduría clara, accesible, legalmente cuidada y articulada con repositorios abiertos/institucionales."
        }
      }
    ],
    "resourceChecklist": {
      "title": "Recursos incluidos",
      "items": [
        "Listado de bibliografía",
        "Listado de webgrafía",
        "URL de bibliografía",
        "PDF",
        "Carpeta Drive",
        "Enlaces a YouTube",
        "YouTube institucional",
        "Repositorios institucionales"
      ]
    }
  },
  {
    "id": "interaccion_tutoria",
    "number": "2",
    "title": "Interacción y tutoría",
    "weight": 14,
    "description": "Releva recursos de comunicación, interacción, seguimiento académico y acompañamiento motivacional.",
    "observablesLabel": "Recursos de interacción que NO están presentes",
    "observables": [
      "Foros de la plantilla inicial sin modificar",
      "Calendario",
      "Avisos con descripción de uso",
      "Salas de chat de Moodle",
      "Plataformas de videoconferencias",
      "Redes sociales",
      "Redes de especialistas",
      "IA o agentes conversacionales"
    ],
    "criteria": [
      {
        "id": "recursos_interaccion",
        "title": "Recursos de interacción",
        "prompt": "Evalúa la disponibilidad y mediación de foros, calendario, avisos, chats, videoconferencias, comunidades y redes.",
        "levels": {
          "1": "Sólo hay foros de plantilla inicial o canales sin uso claro.",
          "2": "Calendario o avisos disponibles, pero con descripción o actualización limitada.",
          "3": "Foro de consultas y avisos organizados para comunicación regular.",
          "4": "Uso articulado de Moodle y plataformas de comunidad o videoconferencia.",
          "5": "Interacción sostenida con redes sociales/académicas o espacios de comunidad definidos.",
          "6": "Integra redes de especialistas o agentes IA con sentido pedagógico y acompañamiento verificable."
        }
      },
      {
        "id": "tutoria_comunicacion",
        "title": "Tutoría y naturaleza de la comunicación",
        "prompt": "Evalúa la asiduidad, orientación, personalización y sistematicidad del acompañamiento docente.",
        "levels": {
          "1": "Comunicación ocasional o reactiva, sin criterios de seguimiento.",
          "2": "Comunicación básica mediante novedades o consultas, sin cronograma explícito.",
          "3": "Comunicación sistemática según cronograma, con canales identificados.",
          "4": "Acompañamiento motivacional y académico con foros de uso específico o FAQ.",
          "5": "Seguimiento gestionado con rúbricas, retroalimentación y orientación diferenciada.",
          "6": "Tutoría personalizada y/o asistida digitalmente, con IA o agentes bajo criterios pedagógicos y éticos."
        }
      }
    ],
    "resourceChecklist": {
      "title": "Aspectos observables de tutoría presentes",
      "items": [
        "Foro de Novedades",
        "Foro de consultas",
        "Foros de uso específico",
        "Rúbricas en actividades",
        "Preguntas frecuentes",
        "IA/agentes de apoyo"
      ]
    }
  },
  {
    "id": "recursos",
    "number": "3",
    "title": "Recursos",
    "weight": 14,
    "description": "Evalúa tipo, origen, curaduría, multimodalidad, configuración y acceso a los contenidos digitales.",
    "observablesLabel": "Recursos que NO están presentes",
    "observables": [
      "Etiquetas",
      "Imágenes",
      "Audios",
      "Videos",
      "PPT",
      "Genially",
      "Canva",
      "Iconografía"
    ],
    "criteria": [
      {
        "id": "tipo_recursos",
        "title": "Tipo y curaduría de recursos",
        "prompt": "Evalúa si los recursos son de plantilla, de internet, propios, multimodales, interactivos o emergentes.",
        "levels": {
          "1": "Predominan recursos de plantilla base, sin curaduría ni mediación suficiente.",
          "2": "Se utilizan recursos de internet sin modificar o con escasa contextualización.",
          "3": "Hay recursos de internet adaptados o modificados para el curso.",
          "4": "Se combinan recursos de internet con recursos propios multimodales.",
          "5": "Se integran recursos propios e interactivos con sentido didáctico.",
          "6": "Se producen recursos propios con tecnologías emergentes vinculadas al ámbito profesional."
        }
      },
      {
        "id": "configuracion_acceso",
        "title": "Configuración y acceso",
        "prompt": "Evalúa cómo se accede a los recursos: URL, pestañas, etiquetas, hipertexto, embebidos y mediación.",
        "levels": {
          "1": "Acceso disperso o poco claro; recursos subidos sin mediación.",
          "2": "Acceso mediante URL listadas, con organización mínima.",
          "3": "Uso de URL o pestañas emergentes con indicaciones básicas.",
          "4": "Etiquetas y secciones organizan el recorrido de lectura y consulta.",
          "5": "Hipertexto mediado y recursos embebidos que reducen barreras de acceso.",
          "6": "Ecosistema de recursos integrado, accesible, interactivo y contextualizado profesionalmente."
        }
      }
    ]
  },
  {
    "id": "actividades_evaluacion",
    "number": "4",
    "title": "Actividades y evaluación",
    "weight": 18,
    "description": "Identifica herramientas de seguimiento, entrega, evaluación, retroalimentación y trabajo colaborativo.",
    "observablesLabel": "Herramientas de evaluación que NO están presentes",
    "observables": [
      "Calificador",
      "Tarea",
      "Cuestionario",
      "Foro",
      "Wiki",
      "Glosario",
      "Recursos externos",
      "IA/agentes"
    ],
    "criteria": [
      {
        "id": "recursos_evaluacion",
        "title": "Recursos de evaluación",
        "prompt": "Evalúa la integración de herramientas Moodle, externas y emergentes para entrega, seguimiento y evaluación.",
        "levels": {
          "1": "Instancias de entrega o seguimiento aisladas, sin criterios claros.",
          "2": "Uso de herramientas externas básicas, como Drive o correo, sin integración suficiente.",
          "3": "Uso de herramientas Moodle como tarea y calificador con funcionamiento claro.",
          "4": "Combinación pertinente de Moodle y herramientas externas.",
          "5": "Uso de recursos específicos como Kahoot!, Socrative, EdPuzzle o Google Forms con sentido evaluativo.",
          "6": "Evaluación integrada con tecnologías emergentes, analítica, IA o retroalimentación avanzada."
        }
      },
      {
        "id": "colaboracion",
        "title": "Colaboración entre estudiantes",
        "prompt": "Evalúa si las herramientas propician producción colaborativa, interacción entre pares y validación comunitaria.",
        "levels": {
          "1": "No se observan actividades colaborativas.",
          "2": "Hay interacción mínima, no necesariamente orientada a producción colectiva.",
          "3": "Se utilizan foros, wikis, glosarios o lecciones para colaborar en Moodle.",
          "4": "Se combinan herramientas Moodle con Google Docs, Padlet u otras herramientas colaborativas.",
          "5": "Las actividades colaborativas tienen consignas, criterios y retroalimentación claros.",
          "6": "La producción colaborativa se valida con comunidad, especialistas o redes externas."
        }
      }
    ],
    "resourceChecklist": {
      "title": "Herramientas colaborativas observadas",
      "items": [
        "Foro",
        "Wiki",
        "Glosario",
        "Lección",
        "Jamboard",
        "Padlet",
        "Google Docs",
        "Herramientas externas"
      ]
    }
  },
  {
    "id": "diseno_accesibilidad",
    "number": "5",
    "title": "Diseño instruccional y accesibilidad",
    "weight": 18,
    "gate": true,
    "description": "Evalúa mediación didáctica, organización visual, navegación, accesibilidad y condiciones de inclusión.",
    "observablesLabel": "Aspectos de accesibilidad/diseño que NO están presentes",
    "observables": [
      "Accesibilidad desde diversos dispositivos",
      "Navegación sencilla con mínimos clics",
      "Enlaces funcionando",
      "Organizadores gráficos de tiempo y crédito",
      "Lenguajes apropiados",
      "Personalización para aprendizaje autónomo",
      "Recursos para personas con discapacidad"
    ],
    "criteria": [
      {
        "id": "organizacion_mediacion",
        "title": "Organización y mediación",
        "prompt": "Evalúa bloques, etiquetas, infografías, secuencia didáctica y uso de herramientas externas de mediación.",
        "levels": {
          "1": "No hay mediación visible; el aula funciona como depósito de materiales.",
          "2": "Organización básica por bloques o etiquetas, con mediación limitada.",
          "3": "Bloques y etiquetas ordenan el recorrido y orientan la navegación.",
          "4": "Se incorporan infografías u organizadores visuales coherentes con la secuencia didáctica.",
          "5": "Uso de Genially, Canva u otros recursos externos para mediación visual y conceptual.",
          "6": "Secuencia didáctica accesible, mediada y vinculada a repositorios digitales abiertos o recursos innovadores."
        }
      },
      {
        "id": "accesibilidad",
        "title": "Accesibilidad e inclusión",
        "prompt": "Evalúa navegación, dispositivos, enlaces, lenguajes, autonomía y asistencia a personas con discapacidad.",
        "levels": {
          "1": "Presenta barreras importantes de acceso, navegación o comprensión.",
          "2": "Cumple aspectos mínimos, pero sin revisión sistemática de accesibilidad.",
          "3": "Navegación simple, enlaces funcionales y lenguajes relativamente claros.",
          "4": "Considera dispositivos diversos, tiempos, carga de trabajo y organizadores de cursado.",
          "5": "Incluye recursos accesibles y apoyos para aprendizaje autónomo y necesidades diversas.",
          "6": "Diseño inclusivo robusto, con personalización y asistencia específica a personas con discapacidad."
        }
      }
    ],
    "resourceChecklist": {
      "title": "Elementos de organización presentes",
      "items": [
        "Bloques",
        "Etiquetas",
        "Infografías",
        "Organizadores temporales",
        "Recursos accesibles",
        "Secuencia didáctica explícita"
      ]
    }
  },
  {
    "id": "coil",
    "number": "6",
    "title": "Internacionalización y nacionalización del currículum / COIL",
    "weight": 8,
    "optionalToggle": true,
    "description": "Registra si el aula incorpora experiencias de colaboración internacional en línea, nacionalización del currículum o Global Classroom.",
    "observablesLabel": "Elementos COIL o de internacionalización que NO están presentes",
    "observables": [
      "Denominación de la propuesta",
      "Carrera o espacio curricular involucrado",
      "Instituciones participantes",
      "Responsables y roles",
      "Carga horaria",
      "Cronograma",
      "Metodología de evaluación",
      "Problemática profesional compartida",
      "Objetivos/capacidades a desarrollar",
      "Herramientas de colaboración digital",
      "Aportes al perfil de egreso",
      "Insignias o créditos"
    ],
    "criteria": [
      {
        "id": "propuesta_coil",
        "title": "Coherencia de la propuesta COIL / Global Classroom",
        "prompt": "Evalúa coordinación, objetivos, roles, metodología, colaboración digital y aporte al perfil de egreso.",
        "levels": {
          "1": "No contiene los elementos mínimos para reconocer una propuesta COIL o de internacionalización.",
          "2": "Menciona una intención de internacionalización, pero sin estructura operativa clara.",
          "3": "Define denominación, responsables, cronograma y herramientas básicas.",
          "4": "Articula objetivos, capacidades, metodología y evaluación con instituciones participantes.",
          "5": "Incluye colaboración digital efectiva, roles claros y aportes al perfil de egreso.",
          "6": "Propuesta coherente, coordinada, evaluable y reconocible mediante créditos, insignias o validación institucional."
        }
      }
    ]
  },
  {
    "id": "observaciones_generales",
    "number": "7",
    "title": "Observaciones generales y nivel de digitalización",
    "weight": 10,
    "description": "Mirada holística del aula virtual según digitalización, personalización y condiciones para otorgar aval académico.",
    "criteria": [
      {
        "id": "nivel_digitalizacion",
        "title": "Nivel de digitalización y personalización",
        "prompt": "Selecciona el nivel que mejor describe el aula evaluada.",
        "levels": {
          "1": "Repositorio: menos de 25% de digitalización. Sin aval académico.",
          "2": "Digitalización parcial: 25% a 40%. Aval con observaciones.",
          "3": "Trayecto parcialmente personalizado: 40% a 59%. Otorga aval.",
          "4": "Trayecto mayormente personalizado: 60% a 79%. Otorga aval.",
          "5": "Trayecto completamente personalizado: 80% a 100%, con barra de progreso.",
          "6": "Trayectos personalizados específicos: 100% de digitalización, por ejemplo PEUCE, PROGRESA o NIC."
        }
      }
    ]
  }
];
