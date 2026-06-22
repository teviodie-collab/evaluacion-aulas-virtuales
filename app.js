(() => {
  const { APP_CONFIG, RUBRIC } = window;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const state = {
    currentResult: null,
    editingId: null
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setDefaultDate();
    fillPrograms();
    renderRubric();
    renderHistory();
    bindEvents();
    updateCompletion();
    calculate({ silent: true });
  }

  function bindEvents() {
    $("#program").addEventListener("change", fillCourses);
    $("#rubricContainer").addEventListener("change", () => {
      updateCompletion();
      calculate({ silent: true });
    });
    $("#rubricContainer").addEventListener("input", () => calculate({ silent: true }));
    $("#evaluationForm").addEventListener("input", () => calculate({ silent: true }));
    $("#calculateBtn").addEventListener("click", () => calculate({ silent: false }));
    $("#saveBtn").addEventListener("click", saveEvaluation);
    $("#exportJsonBtn").addEventListener("click", exportCurrentJson);
    $("#exportCsvBtn").addEventListener("click", exportHistoryCsv);
    $("#copySummaryBtn").addEventListener("click", copySummary);
    $("#printBtn").addEventListener("click", () => window.print());
    $("#newEvaluationBtn").addEventListener("click", resetForm);
    $("#clearHistoryBtn").addEventListener("click", clearHistory);
  }

  function setDefaultDate() {
    const today = new Date().toISOString().slice(0, 10);
    $("#date").value = today;
  }

  function fillPrograms() {
    const program = $("#program");
    program.innerHTML = '<option value="">-- Seleccionar --</option>';
    Object.entries(APP_CONFIG.programs).forEach(([value, item]) => {
      program.append(new Option(item.label, value));
    });
    fillCourses();
  }

  function fillCourses() {
    const programValue = $("#program").value;
    const course = $("#course");
    course.innerHTML = '<option value="">-- Seleccionar aula --</option>';
    if (!programValue || !APP_CONFIG.programs[programValue]) return;
    APP_CONFIG.programs[programValue].courses.forEach((name) => course.append(new Option(name, name)));
  }

  function renderRubric() {
    const container = $("#rubricContainer");
    container.innerHTML = "";
    $("#totalCount").textContent = RUBRIC.length;

    RUBRIC.forEach((dimension, index) => {
      const card = document.createElement("article");
      card.className = "dimension-card";
      card.dataset.dimension = dimension.id;

      card.innerHTML = `
        <div class="dimension-head">
          <div>
            <div class="dimension-title">
              <span class="badge">${String(index + 1).padStart(2, "0")}</span>
              ${dimension.gate ? '<span class="badge gate">umbral mínimo</span>' : ""}
              <h3>${escapeHtml(dimension.title)}</h3>
            </div>
            <p class="dimension-meta">${escapeHtml(dimension.description)}</p>
          </div>
          <div class="dimension-weight">Peso<br>${dimension.weight}%</div>
        </div>
        <div class="dimension-body">
          <div>
            <strong>Indicadores observables</strong>
            <ul class="indicators">
              ${dimension.indicators.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
          <fieldset class="score-options" aria-label="Puntaje para ${escapeHtml(dimension.title)}">
            ${dimension.scale.map((label, score) => `
              <label class="score-option">
                <span><input type="radio" name="score-${dimension.id}" value="${score}" ${score === 2 ? "" : ""}> <strong>${score}</strong></span>
                <small>${escapeHtml(label)}</small>
              </label>
            `).join("")}
          </fieldset>
          <div class="evidence-grid">
            <label>
              Evidencia / enlace / captura
              <input type="text" name="evidence-${dimension.id}" placeholder="URL, archivo, captura, reporte LMS..." />
            </label>
            <label>
              Observaciones y mejora sugerida
              <textarea name="notes-${dimension.id}" rows="2" placeholder="Hallazgos, barreras, acciones sugeridas..."></textarea>
            </label>
          </div>
        </div>
      `;
      container.append(card);
    });
  }

  function collectMeta() {
    const programValue = $("#program").value;
    return {
      evaluator: $("#evaluator").value.trim(),
      date: $("#date").value,
      faculty: $("#faculty").value.trim(),
      programKey: programValue,
      program: APP_CONFIG.programs[programValue]?.label || "",
      course: $("#course").value,
      teacher: $("#teacher").value.trim(),
      modality: $("#modality").value,
      lms: $("#lms").value,
      courseUrl: $("#courseUrl").value.trim(),
      generalNotes: $("#generalNotes").value.trim(),
      telemetry: $("#telemetry").checked
    };
  }

  function collectScores() {
    return RUBRIC.map((dimension) => {
      const selected = $(`input[name="score-${dimension.id}"]:checked`);
      const score = selected ? Number(selected.value) : null;
      const evidence = $(`[name="evidence-${dimension.id}"]`)?.value.trim() || "";
      const notes = $(`[name="notes-${dimension.id}"]`)?.value.trim() || "";
      const weighted = score === null ? 0 : (score / 4) * dimension.weight;
      return {
        id: dimension.id,
        title: dimension.title,
        weight: dimension.weight,
        gate: Boolean(dimension.gate),
        score,
        weighted: round(weighted),
        evidence,
        notes
      };
    });
  }

  function updateCompletion() {
    const completed = collectScores().filter((item) => item.score !== null).length;
    $("#answeredCount").textContent = completed;
  }

  function calculate({ silent = false } = {}) {
    const meta = collectMeta();
    const dimensions = collectScores();
    const completed = dimensions.filter((item) => item.score !== null).length;
    const totalScore = round(dimensions.reduce((acc, item) => acc + item.weighted, 0));
    const gateMinimum = APP_CONFIG.decisionRules.gateMinimum;
    const gateFailures = dimensions.filter((item) => item.gate && item.score !== null && item.score < gateMinimum);
    const unansweredGates = dimensions.filter((item) => item.gate && item.score === null);

    let status = "Sin calcular";
    let statusClass = "empty";
    if (completed === RUBRIC.length) {
      if (totalScore < APP_CONFIG.decisionRules.conditional) {
        status = "Crítica";
        statusClass = "critical";
      } else if (totalScore < APP_CONFIG.decisionRules.approved || gateFailures.length > 0) {
        status = "Condicionada";
        statusClass = "conditional";
      } else {
        status = "Aprobada";
        statusClass = "approved";
      }
    }

    const result = {
      id: state.editingId || createId(),
      createdAt: new Date().toISOString(),
      meta,
      dimensions,
      completed,
      totalDimensions: RUBRIC.length,
      totalScore,
      status,
      statusClass,
      gateFailures,
      unansweredGates,
      priorities: buildPriorities(dimensions)
    };

    state.currentResult = result;
    renderResult(result, silent);
    return result;
  }

  function renderResult(result, silent) {
    const resultBox = $("#resultBox");
    $("#headerScore").textContent = `${result.totalScore} / 100`;
    $("#headerStatus").textContent = result.status;

    if (result.completed < RUBRIC.length) {
      resultBox.className = "result-box empty";
      resultBox.innerHTML = `Faltan ${RUBRIC.length - result.completed} dimensiones por completar. Puntaje parcial: <strong>${result.totalScore}/100</strong>.`;
      if (!silent) resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    resultBox.className = `result-box ${result.statusClass}`;
    const gateWarning = result.gateFailures.length
      ? `<h3>Alertas de umbral</h3><ul class="alert-list">${result.gateFailures.map((item) => `<li><strong>${escapeHtml(item.title)}:</strong> ${item.score}/4. Debe alcanzar al menos ${APP_CONFIG.decisionRules.gateMinimum}/4.</li>`).join("")}</ul>`
      : "";

    resultBox.innerHTML = `
      <div class="result-grid">
        <div class="big-score">
          <span>Puntaje global</span>
          <strong>${result.totalScore}</strong>
          <span>${result.status}</span>
        </div>
        <div>
          <h3>Informe breve</h3>
          <p>${summaryText(result)}</p>
          ${gateWarning}
          <h3>Prioridades de mejora</h3>
          <ol class="action-list">
            ${result.priorities.map((item) => `<li><strong>${escapeHtml(item.title)}:</strong> subir de ${item.score}/4 a 3/4. ${escapeHtml(item.recommendation)}</li>`).join("") || "<li>No se detectan prioridades críticas. Sostener seguimiento y mejora continua.</li>"}
          </ol>
          <div class="progress-wrap">
            ${result.dimensions.map((item) => `
              <div class="progress-row">
                <span>${escapeHtml(item.title)}</span>
                <div class="bar" aria-hidden="true"><span style="width:${item.score * 25}%"></span></div>
                <span>${item.score}/4</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    if (!silent) resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function summaryText(result) {
    const telem = result.meta.telemetry ? "con validación por telemetría del LMS" : "sin validación por telemetría del LMS";
    if (result.status === "Aprobada") {
      return `El aula “${result.meta.course || "sin nombre"}” alcanza ${result.totalScore}/100 y queda aprobada ${telem}. Se recomienda sostener el ciclo de mejora, conservar evidencias y compartir buenas prácticas.`;
    }
    if (result.status === "Condicionada") {
      return `El aula “${result.meta.course || "sin nombre"}” alcanza ${result.totalScore}/100 y queda condicionada ${telem}. Debe resolver las dimensiones con menor puntaje y cualquier alerta de umbral antes de una aprobación plena.`;
    }
    return `El aula “${result.meta.course || "sin nombre"}” alcanza ${result.totalScore}/100 y queda en estado crítico ${telem}. Se recomienda rediseño instruccional y acompañamiento técnico-pedagógico antes del próximo dictado.`;
  }

  function buildPriorities(dimensions) {
    const recommendations = {
      pedagogica: "Revisar objetivos, secuencia, comunicación docente y coherencia entre actividades y evaluación.",
      tecnica: "Corregir enlaces, recursos caídos, errores de visualización y compatibilidad móvil.",
      accesibilidad: "Remediar barreras: subtítulos, textos alternativos, documentos accesibles y alternativas equivalentes.",
      usabilidad: "Simplificar navegación, aplicar plantilla común y hacer visibles tareas, fechas y recursos centrales.",
      evaluacion: "Publicar criterios, mejorar rúbricas, asegurar feedback formativo y trazabilidad de devoluciones.",
      analitica: "Definir reportes mínimos, alertas tempranas y criterios éticos para uso de datos.",
      interoperabilidad: "Ordenar recursos externos, licencias, integraciones y sincronización con calificaciones.",
      soporte: "Agregar guía inicial, mesa de ayuda, tutoriales y orientación para estudiantes y docentes.",
      seguridad: "Revisar permisos, datos personales, licencias, herramientas externas y resguardo de evaluaciones.",
      gobernanza: "Asignar responsables, plazos, evidencias de cierre y proceso de reevaluación."
    };
    return dimensions
      .filter((item) => item.score !== null && item.score < 3)
      .sort((a, b) => (a.score - b.score) || (b.weight - a.weight))
      .slice(0, 5)
      .map((item) => ({ ...item, recommendation: recommendations[item.id] || "Definir acción de mejora específica." }));
  }

  function validateFormForSave() {
    const form = $("#evaluationForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    const result = calculate({ silent: true });
    if (result.completed < RUBRIC.length) {
      alert("Completá todas las dimensiones de la rúbrica antes de guardar.");
      return false;
    }
    return true;
  }

  function saveEvaluation() {
    if (!validateFormForSave()) return;
    const result = calculate({ silent: true });
    const history = getHistory();
    const index = history.findIndex((item) => item.id === result.id);
    if (index >= 0) history[index] = result;
    else history.unshift(result);
    setHistory(history);
    state.editingId = result.id;
    renderHistory();
    alert("Evaluación guardada en este navegador.");
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(APP_CONFIG.storageKey)) || [];
    } catch (error) {
      console.warn("No se pudo leer el historial", error);
      return [];
    }
  }

  function setHistory(history) {
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(history));
  }

  function renderHistory() {
    const list = $("#historyList");
    const history = getHistory();
    if (!history.length) {
      list.innerHTML = '<p class="muted">Todavía no hay evaluaciones guardadas.</p>';
      return;
    }

    list.innerHTML = history.map((item) => `
      <article class="history-item">
        <div>
          <strong>${escapeHtml(item.meta.course || "Aula sin nombre")}</strong><br>
          <span class="muted">${escapeHtml(item.meta.program || "")}${item.meta.program ? " · " : ""}${escapeHtml(item.meta.date || "")} · ${item.totalScore}/100 · ${escapeHtml(item.status)}</span>
        </div>
        <div class="history-actions">
          <button type="button" class="secondary" data-load="${item.id}">Cargar</button>
          <button type="button" class="danger ghost" data-delete="${item.id}">Eliminar</button>
        </div>
      </article>
    `).join("");

    $$('[data-load]', list).forEach((btn) => btn.addEventListener("click", () => loadEvaluation(btn.dataset.load)));
    $$('[data-delete]', list).forEach((btn) => btn.addEventListener("click", () => deleteEvaluation(btn.dataset.delete)));
  }

  function loadEvaluation(id) {
    const item = getHistory().find((entry) => entry.id === id);
    if (!item) return;
    state.editingId = item.id;

    $("#evaluator").value = item.meta.evaluator || "";
    $("#date").value = item.meta.date || new Date().toISOString().slice(0, 10);
    $("#faculty").value = item.meta.faculty || "";
    $("#program").value = item.meta.programKey || "";
    fillCourses();
    $("#course").value = item.meta.course || "";
    $("#teacher").value = item.meta.teacher || "";
    $("#modality").value = item.meta.modality || "Presencial con apoyo virtual";
    $("#lms").value = item.meta.lms || "Moodle";
    $("#courseUrl").value = item.meta.courseUrl || "";
    $("#generalNotes").value = item.meta.generalNotes || "";
    $("#telemetry").checked = Boolean(item.meta.telemetry);

    item.dimensions.forEach((dimension) => {
      const radio = $(`input[name="score-${dimension.id}"][value="${dimension.score}"]`);
      if (radio) radio.checked = true;
      const evidence = $(`[name="evidence-${dimension.id}"]`);
      const notes = $(`[name="notes-${dimension.id}"]`);
      if (evidence) evidence.value = dimension.evidence || "";
      if (notes) notes.value = dimension.notes || "";
    });

    updateCompletion();
    calculate({ silent: false });
  }

  function deleteEvaluation(id) {
    if (!confirm("¿Eliminar esta evaluación del historial local?")) return;
    setHistory(getHistory().filter((item) => item.id !== id));
    if (state.editingId === id) state.editingId = null;
    renderHistory();
  }

  function clearHistory() {
    if (!confirm("¿Borrar todo el historial guardado en este navegador?")) return;
    localStorage.removeItem(APP_CONFIG.storageKey);
    renderHistory();
  }

  function resetForm() {
    if (!confirm("¿Iniciar una nueva evaluación? Se perderán los cambios no guardados.")) return;
    state.editingId = null;
    $("#evaluationForm").reset();
    setDefaultDate();
    fillCourses();
    $$('input[type="radio"]', $("#rubricContainer")).forEach((input) => { input.checked = false; });
    $$('input[type="text"], textarea', $("#rubricContainer")).forEach((input) => { input.value = ""; });
    updateCompletion();
    state.currentResult = null;
    $("#resultBox").className = "result-box empty";
    $("#resultBox").textContent = "Completá la grilla y presioná “Calcular”.";
    $("#headerScore").textContent = "0 / 100";
    $("#headerStatus").textContent = "Sin calcular";
  }

  function exportCurrentJson() {
    const result = calculate({ silent: true });
    if (!result || result.completed < RUBRIC.length) {
      alert("Completá la evaluación antes de exportar.");
      return;
    }
    downloadFile(`evaluacion-aula-${slug(result.meta.course || "sin-nombre")}.json`, JSON.stringify(result, null, 2), "application/json");
  }

  function exportHistoryCsv() {
    const history = getHistory();
    if (!history.length) {
      alert("No hay historial para exportar.");
      return;
    }
    const rows = [
      ["fecha", "facultad", "programa", "aula", "docente", "evaluador", "modalidad", "lms", "telemetria", "puntaje", "estado", ...RUBRIC.map((d) => d.title)]
    ];
    history.forEach((item) => {
      const scoreMap = Object.fromEntries(item.dimensions.map((d) => [d.id, d.score]));
      rows.push([
        item.meta.date,
        item.meta.faculty,
        item.meta.program,
        item.meta.course,
        item.meta.teacher,
        item.meta.evaluator,
        item.meta.modality,
        item.meta.lms,
        item.meta.telemetry ? "sí" : "no",
        item.totalScore,
        item.status,
        ...RUBRIC.map((d) => scoreMap[d.id] ?? "")
      ]);
    });
    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadFile("historial-evaluaciones-aulas.csv", csv, "text/csv;charset=utf-8");
  }

  async function copySummary() {
    const result = calculate({ silent: true });
    if (!result || result.completed < RUBRIC.length) {
      alert("Completá la evaluación antes de copiar el informe.");
      return;
    }
    const text = [
      "INFORME BREVE DE EVALUACIÓN DE AULA VIRTUAL",
      `Aula: ${result.meta.course}`,
      `Programa: ${result.meta.program}`,
      `Fecha: ${result.meta.date}`,
      `Puntaje: ${result.totalScore}/100`,
      `Estado: ${result.status}`,
      `Telemetría LMS: ${result.meta.telemetry ? "sí" : "no"}`,
      "",
      summaryText(result),
      "",
      "Prioridades:",
      ...(result.priorities.length ? result.priorities.map((p, i) => `${i + 1}. ${p.title}: ${p.score}/4. ${p.recommendation}`) : ["Sin prioridades críticas."])
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Informe breve copiado al portapapeles.");
    } catch {
      prompt("Copiá el informe:", text);
    }
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function csvEscape(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  function round(value) {
    return Math.round(value * 10) / 10;
  }

  function createId() {
    return `eval-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function slug(text) {
    return String(text)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "evaluacion";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
