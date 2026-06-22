/*
  Editar este archivo para adaptar carreras, aulas y rúbrica.
  La suma de pesos de RUBRIC debe ser 100.
*/

window.APP_CONFIG = {
  institutionName: "Facultad",
  storageKey: "evaluaciones-aulas-virtuales-v1",
  decisionRules: {
    approved: 70,
    conditional: 55,
    gateMinimum: 2,
    gateDimensions: ["accesibilidad", "seguridad"]
  },
  programs: {
    "abogacia": {
      label: "Carrera de Abogacía",
      courses: [
        "Introducción a la Filosofía",
        "Problemática del Conocimiento",
        "Introducción al Derecho",
        "Derecho Romano",
        "Derecho de las Familias",
        "Derecho Internacional Público",
        "Práctica Profesional Supervisada VII",
        "Práctica Profesional Supervisada VIII"
      ]
    },
    "tecnicatura": {
      label: "Tecnicatura Univ. en Administración de Edificios",
      courses: [
        "Introducción a la Comunicación",
        "Fundamentos del Derecho I",
        "Manejo de Utilitarios PC",
        "Mediación, Negociación y Resolución de Conflictos"
      ]
    },
    "posgrado": {
      label: "Posgrado / Diplomaturas",
      courses: [
        "Seminario de posgrado",
        "Diplomatura",
        "Curso de actualización",
        "Taller virtual"
      ]
    },
    "generica": {
      label: "Otra carrera o espacio curricular",
      courses: [
        "Aula virtual 1",
        "Aula virtual 2",
        "Aula virtual 3"
      ]
    }
  }
};

window.RUBRIC = [
  {
    id: "pedagogica",
    title: "Diseño pedagógico, comunicación y alineamiento",
    weight: 20,
    description: "Evalúa si el aula permite comprender qué se aprende, cómo se aprende, cómo se comunica y cómo se sostiene la presencia docente.",
    indicators: [
      "Resultados de aprendizaje o propósitos formativos visibles.",
      "Relación explícita entre objetivos, contenidos, actividades y evaluación.",
      "Actividades formativas distribuidas durante el cursado.",
      "Criterios de evaluación, rúbricas o pautas disponibles para estudiantes.",
      "Presencia docente, canales de consulta y comunicación periódica."
    ],
    scale: [
      "No hay diseño reconocible; el aula funciona como depósito de archivos y sin comunicación clara.",
      "Hay organización mínima, pero objetivos, actividades y evaluación aparecen desarticulados.",
      "Cumple mínimos: estructura, objetivos y criterios básicos visibles.",
      "Presenta una secuencia consistente, con actividades y feedback adecuados.",
      "Diseño sólido, explícito, comunicativo, coherente y basado en evidencia de mejora."
    ]
  },
  {
    id: "tecnica",
    title: "Funcionamiento técnico del aula",
    weight: 10,
    description: "Revisa estabilidad, enlaces, disponibilidad y compatibilidad de recursos.",
    indicators: [
      "El aula está visible y correctamente configurada.",
      "No hay enlaces rotos en recursos centrales.",
      "Los archivos, videos, cuestionarios y tareas abren sin errores.",
      "El diseño se visualiza correctamente en celular y computadora.",
      "La estructura no depende de recursos externos inestables."
    ],
    scale: [
      "El aula presenta errores graves o inaccesibilidad técnica.",
      "Funciona parcialmente, con errores frecuentes o recursos caídos.",
      "Funciona de manera aceptable, aunque requiere ajustes puntuales.",
      "Funciona bien y mantiene una estructura estable.",
      "Funcionamiento robusto, documentado y validado con pruebas técnicas."
    ]
  },
  {
    id: "accesibilidad",
    title: "Accesibilidad, inclusión y DUA",
    weight: 12,
    gate: true,
    description: "Dimensión de umbral: ningún aula debería aprobar si presenta barreras graves no remediadas.",
    indicators: [
      "Imágenes relevantes con texto alternativo.",
      "Videos con subtítulos, transcripción o alternativa equivalente.",
      "Documentos principales legibles y accesibles.",
      "Contraste, jerarquía visual y navegación comprensibles.",
      "Opciones o apoyos para trayectorias diversas."
    ],
    scale: [
      "Barreras graves de acceso sin alternativas.",
      "Accesibilidad tratada de forma ocasional o reactiva.",
      "Cumple mínimos básicos de accesibilidad.",
      "Presenta criterios inclusivos consistentes y evidencias de revisión.",
      "Diseño universal integrado, con alternativas, validación y mejora continua."
    ]
  },
  {
    id: "usabilidad",
    title: "Usabilidad y experiencia de navegación",
    weight: 8,
    description: "Evalúa si el estudiantado puede orientarse sin sobrecarga ni confusión.",
    indicators: [
      "Portada o bloque inicial con orientación clara.",
      "Menú, secciones y nombres de módulos consistentes.",
      "Calendario, entregas y tareas fáciles de encontrar.",
      "Carga cognitiva razonable: no hay exceso de elementos dispersos.",
      "Uso de plantilla o patrón común institucional."
    ],
    scale: [
      "Navegación confusa; no se localizan recursos o tareas centrales.",
      "Organización irregular; depende de instrucciones externas.",
      "Navegación aceptable, aunque con mejoras necesarias.",
      "Experiencia clara, consistente y previsible.",
      "Experiencia altamente cuidada, probada con usuarios y fácil de replicar."
    ]
  },
  {
    id: "evaluacion",
    title: "Evaluación y retroalimentación",
    weight: 10,
    description: "Revisa criterios, instrumentos, feedback, trazabilidad y evaluación formativa.",
    indicators: [
      "Actividades evaluables configuradas correctamente.",
      "Criterios, consignas y fechas visibles.",
      "Uso de rúbricas o guías de evaluación.",
      "Feedback formativo antes de instancias de alto impacto.",
      "Registro claro de calificaciones y devoluciones."
    ],
    scale: [
      "Evaluación opaca, tardía o sólo numérica.",
      "Hay evaluación, pero con criterios incompletos o baja trazabilidad.",
      "Cumple mínimos de consignas, fechas y calificaciones.",
      "Evaluación consistente, con rúbricas y feedback útil.",
      "Evaluación formativa, transparente, trazable y orientada a la mejora."
    ]
  },
  {
    id: "analitica",
    title: "Analítica de aprendizaje y uso de datos",
    weight: 8,
    description: "Evalúa si se usan datos del LMS para acompañar y mejorar, con criterios responsables.",
    indicators: [
      "Revisión de participación, accesos o avance.",
      "Identificación temprana de estudiantes con baja actividad.",
      "Uso de reportes para ajustar enseñanza o soporte.",
      "Criterios transparentes sobre qué datos se usan y para qué.",
      "Registro de intervenciones o alertas."
    ],
    scale: [
      "No se revisan datos ni reportes de actividad.",
      "Uso ocasional de datos, sin criterio documentado.",
      "Se revisan métricas básicas de actividad.",
      "La analítica informa decisiones de acompañamiento y mejora.",
      "Uso sistemático, ético y documentado de analíticas para mejorar trayectorias."
    ]
  },
  {
    id: "interoperabilidad",
    title: "Interoperabilidad y recursos digitales",
    weight: 8,
    description: "Revisa integración de herramientas, recursos externos y reutilización de materiales.",
    indicators: [
      "Herramientas externas integradas de manera segura.",
      "Recursos con licencias o autoría claras.",
      "Materiales reutilizables, actualizables y bien organizados.",
      "Integración con calificaciones o seguimiento cuando corresponde.",
      "Evita duplicaciones innecesarias entre plataformas."
    ],
    scale: [
      "Recursos dispersos, sin licencias ni integración confiable.",
      "Integraciones o recursos externos usados sin criterios claros.",
      "Cumple mínimos de organización y licenciamiento.",
      "Integraciones pertinentes, estables y pedagógicamente justificadas.",
      "Ecosistema interoperable, seguro, reusable y documentado."
    ]
  },
  {
    id: "soporte",
    title: "Soporte, documentación y acompañamiento",
    weight: 8,
    description: "Evalúa si docentes y estudiantes tienen ayuda suficiente para usar el aula.",
    indicators: [
      "Guía inicial o tutorial para estudiantes.",
      "Información de contacto o mesa de ayuda.",
      "Orientaciones para entrega de tareas, participación y evaluación.",
      "Documentación docente para sostener el aula.",
      "Registro de problemas frecuentes y soluciones."
    ],
    scale: [
      "No hay soporte ni orientación visible.",
      "Ayuda informal, dispersa o dependiente de consultas individuales.",
      "Soporte básico disponible para problemas frecuentes.",
      "Acompañamiento claro, documentado y accesible.",
      "Sistema de soporte integrado, medible y orientado a mejora continua."
    ]
  },
  {
    id: "seguridad",
    title: "Seguridad, privacidad y cumplimiento legal",
    weight: 8,
    gate: true,
    description: "Dimensión de umbral: verifica roles, permisos, datos personales, derechos de uso, herramientas externas y resguardo de evaluaciones.",
    indicators: [
      "Roles y permisos revisados.",
      "No se exponen datos personales innecesarios.",
      "Materiales con derechos, licencias o citas claras.",
      "Uso seguro y transparente de IA o herramientas externas si aplica.",
      "Resguardo de entregas, evaluaciones y protocolos frente a incidentes."
    ],
    scale: [
      "Riesgos graves de exposición de datos, permisos, licencias o incumplimiento legal.",
      "Controles débiles, informales o no documentados.",
      "Cumple mínimos de privacidad, permisos, licencias y resguardo.",
      "Seguridad y cumplimiento revisados y coherentes con el uso del aula.",
      "Seguridad, privacidad y cumplimiento documentados, auditados y trazables."
    ]
  },
  {
    id: "gobernanza",
    title: "Gobernanza y mejora continua",
    weight: 8,
    description: "Mide si la evaluación se convierte en decisiones y mejoras concretas.",
    indicators: [
      "Responsables del aula identificados.",
      "Registro de cambios o mejoras realizadas.",
      "Plan de mejora con responsables y plazos.",
      "Evidencias de seguimiento institucional.",
      "Criterios comunes con otras aulas de la facultad."
    ],
    scale: [
      "No hay responsables ni plan de mejora.",
      "Mejoras aisladas, sin registro ni seguimiento.",
      "Responsables y acciones mínimas identificadas.",
      "Plan de mejora con seguimiento y evidencias.",
      "Ciclo institucional de evaluación, mejora, reevaluación y aprendizaje colectivo."
    ]
  },
];
