(() => {
  const { APP_CONFIG, RUBRIC } = window;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const state = {
    editingId: null,
    currentResult: null
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setDefaultDate();
    populatePrograms();
    renderRubric();
    bindEvents();
    updateCounters();
    renderHistory();
    calculate(true);
  }

  function setDefaultDate() {
    const date = $("#date");
    if (!date.value) date.value = new Date().toISOString().slice(0, 10);
  }

  function populatePrograms() {
    const programSelect = $("#program");
    programSelect.innerHTML = '<option value="">-- Seleccionar carrera u oferta --</option>';

    Object.entries(APP_CONFIG.programs).forEach(([key, program]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = program.label;
      programSelect.appendChild(option);
    });

    programSelect.addEventListener("change", () => populateCourses(programSelect.value));
    populateCourses(programSelect.value);
  }

  function populateCourses(programKey, selectedValue = "") {
    const courseSelect = $("#course");
    const courseLabel = $("#courseLabel");
    const program = APP_CONFIG.programs[programKey];

    courseSelect.innerHTML = "";
    courseLabel.textContent = program?.courseLabel || "Cátedra";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = program?.placeholder || "-- Seleccionar primero carrera u oferta --";
    courseSelect.appendChild(placeholder);

    if (!program) return;

    program.courses.forEach((course) => {
      const option = document.createElement("option");
      if (course.startsWith("---")) {
        option.textContent = course;
        option.disabled = true;
        option.className = "option-heading";
      } else {
        option.value = course;
        option.textContent = course;
      }
      courseSelect.appendChild(option);
    });

    if (selectedValue) courseSelect.value = selectedValue;
  }

  function renderRubric() {
    const container = $("#rubricContainer");
    container.innerHTML = RUBRIC.map((dimension) => `
      <article class="dimension-card" data-dimension="${dimension.id}">
        <header class="dimension-head">
          <div class="dimension-title-wrap">
            <span class="dimension-number">${escapeHtml(dimension.number)}</span>
            <div>
              <h3>${escapeHtml(dimension.title)}</h3>
              <p>${escapeHtml(dimension.description)}</p>
            </div>
          </div>
          <div class="dimension-score" id="dimension-score-${dimension.id}">
            <span>Dimensión</span>
            <strong>—</strong>
            <span>${dimension.items.length} descriptores</span>
          </div>
        </header>

        <div class="descriptor-list">
          ${dimension.items.map((item) => renderDescriptor(dimension.id, item)).join("")}
        </div>

        <div class="dimension-notes">
          <label>
            Observaciones / evidencias de la dimensión ${escapeHtml(dimension.number)}
            <textarea id="notes-${dimension.id}" placeholder="Registrar evidencias observadas, capturas, aclaraciones o acciones sugeridas."></textarea>
          </label>
        </div>
      </article>
    `).join("");

    $("#totalCount").textContent = String(totalDescriptors());
  }

  function renderDescriptor(dimensionId, item) {
    const name = inputName(dimensionId, item.code);
    return `
      <div class="descriptor-row" data-code="${escapeHtml(item.code)}">
        <div class="descriptor-text">
          <span class="descriptor-code">${escapeHtml(item.code)}</span>
          <p>${escapeHtml(item.text)}</p>
        </div>
        <div class="radio-grid" role="radiogroup" aria-label="${escapeHtml(item.code)}">
          ${APP_CONFIG.scale.map((scale) => `
            <label class="radio-tile" title="${escapeHtml(scale.help)}">
              <input type="radio" name="${name}" value="${escapeHtml(scale.value)}" />
              <span>${escapeHtml(scale.label)}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }

  function bindEvents() {
    $("#rubricContainer").addEventListener("change", () => {
      updateCounters();
      calculate(true);
    });

    ["#evaluator", "#date", "#program", "#course", "#modality", "#lastAccess", "#courseUrl", "#generalNotes"].forEach((selector) => {
      $(selector).addEventListener("input", () => calculate(true));
      $(selector).addEventListener("change", () => calculate(true));
    });

    $("#calculateBtn").addEventListener("click", () => calculate(false));
    $("#saveBtn").addEventListener("click", saveCurrent);
    $("#exportJsonBtn").addEventListener("click", exportJson);
    $("#exportCsvBtn").addEventListener("click", exportCsv);
    $("#copySummaryBtn").addEventListener("click", copySummary);
    $("#printBtn").addEventListener("click", () => window.print());
    $("#newEvaluationBtn").addEventListener("click", resetForm);
    $("#clearHistoryBtn").addEventListener("click", clearHistory);
  }

  function collectMeta() {
    const programKey = $("#program").value;
    const program = APP_CONFIG.programs[programKey];
    return {
      evaluator: $("#evaluator").value.trim(),
      date: $("#date").value,
      programKey,
      programLabel: program?.label || "",
      courseLabel: program?.courseLabel || "Cátedra",
      course: $("#course").value,
      modality: $("#modality").value,
      lastAccess: $("#lastAccess").value,
      courseUrl: $("#courseUrl").value.trim(),
      generalNotes: $("#generalNotes").value.trim()
    };
  }

  function collectDimensions() {
    return RUBRIC.map((dimension) => {
      const itemResults = dimension.items.map((item) => {
        const checked = $(`input[name="${cssEscape(inputName(dimension.id, item.code))}"]:checked`);
        const value = checked?.value || "";
        const numeric = value && value !== "NA" ? Number(value) : null;
        return {
          code: item.code,
          text: item.text,
          value,
          numeric,
          percent: numeric === null ? null : Math.round(((numeric - 1) / 4) * 100)
        };
      });

      const answered = itemResults.filter((item) => item.value !== "").length;
      const applicable = itemResults.filter((item) => item.numeric !== null);
      const notApplicable = itemResults.filter((item) => item.value === "NA").length;
      const missing = itemResults.length - answered;
      const rawAverage = applicable.length
        ? applicable.reduce((sum, item) => sum + item.numeric, 0) / applicable.length
        : null;
      const percent = rawAverage === null ? null : Math.round(((rawAverage - 1) / 4) * 100);
      const notes = $(`#notes-${dimension.id}`).value.trim();

      return {
        id: dimension.id,
        number: dimension.number,
        title: dimension.title,
        gate: Boolean(dimension.gate),
        totalItems: dimension.items.length,
        answered,
        missing,
        applicable: applicable.length,
        notApplicable,
        average: rawAverage === null ? null : round(rawAverage, 2),
        percent,
        notes,
        items: itemResults
      };
    });
  }

  function calculate(silent = false) {
    const meta = collectMeta();
    const dimensions = collectDimensions();
    const allItems = dimensions.flatMap((dimension) => dimension.items);
    const answeredItems = allItems.filter((item) => item.value !== "");
    const applicableItems = allItems.filter((item) => item.numeric !== null);
    const missingItems = allItems.length - answeredItems.length;

    const totalScore = applicableItems.length
      ? Math.round((applicableItems.reduce((sum, item) => sum + ((item.numeric - 1) / 4), 0) / applicableItems.length) * 100)
      : 0;

    const accessibility = dimensions.find((dimension) => dimension.id === "accesibilidad");
    const criticalDimensions = dimensions.filter((dimension) => dimension.percent !== null && dimension.percent < APP_CONFIG.thresholds.dimensionCritical);
    const accessibilityFailure = accessibility && accessibility.percent !== null && accessibility.percent < APP_CONFIG.thresholds.accessibilityMinimum;

    let status = "Sin calcular";
    let statusClass = "empty";

    if (answeredItems.length > 0) {
      if (totalScore < APP_CONFIG.thresholds.conditional) {
        status = "Crítica";
        statusClass = "critical";
      } else if (totalScore < APP_CONFIG.thresholds.approved || accessibilityFailure) {
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
      totalDescriptors: allItems.length,
      answeredDescriptors: answeredItems.length,
      applicableDescriptors: applicableItems.length,
      missingDescriptors: missingItems,
      totalScore,
      status,
      statusClass,
      criticalDimensions,
      accessibilityFailure,
      priorities: buildPriorities(dimensions)
    };

    state.currentResult = result;
    updateDimensionScores(dimensions);
    renderResult(result, silent);
    updateCounters();
    return result;
  }

  function updateDimensionScores(dimensions) {
    dimensions.forEach((dimension) => {
      const box = $(`#dimension-score-${dimension.id}`);
      if (!box) return;
      let cls = "dimension-score";
      if (dimension.percent === null) cls += " partial";
      else if (dimension.percent < 50) cls += " critical";
      else if (dimension.percent < 70) cls += " partial";
      else cls += " good";
      box.className = cls;
      box.innerHTML = `
        <span>Dimensión</span>
        <strong>${dimension.percent === null ? "—" : `${dimension.percent}/100`}</strong>
        <span>${dimension.answered}/${dimension.totalItems} respondidos${dimension.notApplicable ? ` · ${dimension.notApplicable} NA` : ""}</span>
      `;
    });
  }

  function renderResult(result, silent) {
    $("#headerScore").textContent = `${result.totalScore} / 100`;
    $("#headerStatus").textContent = result.status;
    const resultBox = $("#resultBox");

    if (result.answeredDescriptors === 0) {
      resultBox.className = "result-box empty";
      resultBox.innerHTML = "Completá la grilla y presioná “Calcular”.";
      return;
    }

    resultBox.className = `result-box ${result.statusClass}`;

    const missingMessage = result.missingDescriptors > 0
      ? `<p><strong>Atención:</strong> faltan ${result.missingDescriptors} descriptores por responder. El puntaje es parcial.</p>`
      : "";

    const accessibilityWarning = result.accessibilityFailure
      ? `<h3>Alerta de accesibilidad</h3><p>La dimensión Accesibilidad quedó por debajo de ${APP_CONFIG.thresholds.accessibilityMinimum}/100. Se recomienda tratarla como mejora prioritaria antes de considerar aprobada el aula.</p>`
      : "";

    resultBox.innerHTML = `
      <div class="result-grid">
        <div class="big-score">
          <span>Puntaje global</span>
          <strong>${result.totalScore}</strong>
          <span>${escapeHtml(result.status)}</span>
        </div>
        <div>
          <h3>Informe breve</h3>
          <p>${escapeHtml(summaryText(result))}</p>
          ${missingMessage}
          ${accessibilityWarning}
          <h3>Prioridades de mejora</h3>
          <ol class="action-list">
            ${result.priorities.map((item) => `<li><strong>${escapeHtml(item.title)}:</strong> ${item.percent === null ? "sin datos" : `${item.percent}/100`}. ${escapeHtml(item.recommendation)}</li>`).join("") || "<li>No se detectan prioridades críticas. Sostener seguimiento y mejora continua.</li>"}
          </ol>
          <div class="score-table-wrap">
            <table class="score-table">
              <thead>
                <tr>
                  <th>Dimensión</th>
                  <th>Puntaje</th>
                  <th>Respondidos</th>
                  <th>NA</th>
                </tr>
              </thead>
              <tbody>
                ${result.dimensions.map((dimension) => `
                  <tr>
                    <td>${escapeHtml(dimension.number)}. ${escapeHtml(dimension.title)}</td>
                    <td>${dimension.percent === null ? "—" : `${dimension.percent}/100`}</td>
                    <td>${dimension.answered}/${dimension.totalItems}</td>
                    <td>${dimension.notApplicable}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (!silent) resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildPriorities(dimensions) {
    return dimensions
      .filter((dimension) => dimension.percent === null || dimension.percent < 70)
      .sort((a, b) => (a.percent ?? -1) - (b.percent ?? -1))
      .slice(0, 5)
      .map((dimension) => ({
        title: dimension.title,
        percent: dimension.percent,
        recommendation: recommendationFor(dimension)
      }));
  }

  function recommendationFor(dimension) {
    const map = {
      objetivos: "Revisar programa, hoja de ruta, objetivos/competencias y alineación con actividades, evaluación y recursos.",
      evaluacion: "Transparentar criterios, diversificar instrumentos y explicitar formas de retroalimentación.",
      tecnologias: "Seleccionar herramientas digitales pertinentes para participación, comunicación y colaboración, no sólo para repositorio.",
      usabilidad: "Ordenar bloques, reducir clics, corregir enlaces y mejorar instrucciones de navegación.",
      mediacion_materiales: "Mejorar claridad, formato de contenidos, consignas completas y referencias/licencias de materiales.",
      reflexion_innovacion: "Incorporar actividades de comprensión, producción, colaboración, resolución de casos y reflexión crítica.",
      interactividad_adaptabilidad: "Diseñar recorridos o actividades diferenciadas y aumentar la interacción del estudiante con el contenido.",
      autonomia: "Aclarar expectativas de trabajo autónomo y vincular actividades con el campo profesional/social.",
      formato_diseno: "Incorporar formatos multimodales de calidad y revisar criterios estéticos para favorecer estudio y reflexión.",
      accesibilidad: "Remediar documentos, imágenes, videos y navegación según criterios de accesibilidad y diversidad funcional.",
      tutoria: "Explicitar plan tutorial, seguimiento académico/motivacional y canales/horarios de contacto."
    };
    return map[dimension.id] || "Definir acciones de mejora con responsable, plazo y evidencia de cierre.";
  }

  function summaryText(result) {
    const meta = result.meta;
    const course = meta.course || "aula no especificada";
    const program = meta.programLabel || "oferta no especificada";
    const base = `La evaluación de ${course} (${program}) arroja ${result.totalScore}/100 y estado ${result.status}.`;
    const descriptors = `Se respondieron ${result.answeredDescriptors} de ${result.totalDescriptors} descriptores; ${result.applicableDescriptors} fueron aplicables.`;
    const priority = result.priorities.length
      ? `Las prioridades iniciales son: ${result.priorities.map((item) => item.title).join(", ")}.`
      : "No se identifican prioridades críticas inmediatas.";
    return `${base} ${descriptors} ${priority}`;
  }

  function validateMeta() {
    const form = $("#evaluationForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    return true;
  }

  function saveCurrent() {
    if (!validateMeta()) return;
    const result = calculate(false);
    if (result.answeredDescriptors === 0) {
      alert("Completá al menos un descriptor antes de guardar.");
      return;
    }

    const history = getHistory();
    const index = history.findIndex((item) => item.id === result.id);
    if (index >= 0) history[index] = result;
    else history.unshift(result);

    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(history));
    state.editingId = result.id;
    renderHistory();
    alert("Evaluación guardada en este navegador.");
  }

  function renderHistory() {
    const history = getHistory();
    const list = $("#historyList");
    if (!history.length) {
      list.innerHTML = '<p class="muted">Todavía no hay evaluaciones guardadas.</p>';
      return;
    }

    list.innerHTML = history.map((item) => `
      <article class="history-item">
        <div>
          <h3>${escapeHtml(item.meta.course || "Aula sin nombre")}</h3>
          <p>${escapeHtml(item.meta.programLabel || "")} · ${formatDate(item.meta.date)} · ${item.totalScore}/100 · ${escapeHtml(item.status)}</p>
        </div>
        <div class="history-actions">
          <button type="button" class="secondary small" data-action="load" data-id="${item.id}">Abrir</button>
          <button type="button" class="danger ghost small" data-action="delete" data-id="${item.id}">Borrar</button>
        </div>
      </article>
    `).join("");

    list.addEventListener("click", handleHistoryClick, { once: true });
  }

  function handleHistoryClick(event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) {
      renderHistory();
      return;
    }
    const { action, id } = btn.dataset;
    if (action === "load") loadEvaluation(id);
    if (action === "delete") deleteEvaluation(id);
  }

  function loadEvaluation(id) {
    const item = getHistory().find((entry) => entry.id === id);
    if (!item) return;
    state.editingId = item.id;

    $("#evaluator").value = item.meta.evaluator || "";
    $("#date").value = item.meta.date || "";
    $("#program").value = item.meta.programKey || "";
    populateCourses(item.meta.programKey || "", item.meta.course || "");
    $("#modality").value = item.meta.modality || "Presencial con complementos virtuales";
    $("#lastAccess").value = item.meta.lastAccess || "";
    $("#courseUrl").value = item.meta.courseUrl || "";
    $("#generalNotes").value = item.meta.generalNotes || "";

    clearDescriptorAnswers();
    item.dimensions.forEach((dimension) => {
      const notes = $(`#notes-${dimension.id}`);
      if (notes) notes.value = dimension.notes || "";
      dimension.items.forEach((descriptor) => {
        const selector = `input[name="${cssEscape(inputName(dimension.id, descriptor.code))}"][value="${cssEscape(descriptor.value)}"]`;
        const input = $(selector);
        if (input) input.checked = true;
      });
    });

    calculate(false);
    renderHistory();
    $("#datos").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deleteEvaluation(id) {
    if (!confirm("¿Borrar esta evaluación del historial local?")) return;
    const history = getHistory().filter((item) => item.id !== id);
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(history));
    if (state.editingId === id) state.editingId = null;
    renderHistory();
  }

  function clearHistory() {
    if (!confirm("¿Borrar todo el historial local de este navegador?")) return;
    localStorage.removeItem(APP_CONFIG.storageKey);
    state.editingId = null;
    renderHistory();
  }

  function resetForm() {
    if (!confirm("¿Iniciar una nueva evaluación? Se limpiarán los datos no guardados.")) return;
    state.editingId = null;
    $("#evaluationForm").reset();
    setDefaultDate();
    $("#program").value = "";
    populateCourses("");
    clearDescriptorAnswers();
    $$('textarea[id^="notes-"]').forEach((textarea) => { textarea.value = ""; });
    calculate(true);
    updateCounters();
  }

  function clearDescriptorAnswers() {
    $$("#rubricContainer input[type='radio']").forEach((input) => { input.checked = false; });
  }

  function exportJson() {
    const result = calculate(false);
    if (result.answeredDescriptors === 0) {
      alert("No hay evaluación para exportar.");
      return;
    }
    downloadFile(`evaluacion-aula-${safeFileName(result.meta.course || "sin-nombre")}.json`, JSON.stringify(result, null, 2), "application/json;charset=utf-8");
  }

  function exportCsv() {
    const history = getHistory();
    if (!history.length) {
      alert("No hay historial guardado para exportar.");
      return;
    }

    const rows = [[
      "id", "fecha_evaluacion", "evaluador", "oferta", "aula", "modalidad", "ultimo_acceso", "puntaje", "estado", "descriptores_respondidos", "descriptores_aplicables", "observaciones_generales",
      ...RUBRIC.map((dimension) => `${dimension.number}_${dimension.id}_puntaje`)
    ]];

    history.forEach((item) => {
      rows.push([
        item.id,
        item.meta.date,
        item.meta.evaluator,
        item.meta.programLabel,
        item.meta.course,
        item.meta.modality,
        item.meta.lastAccess,
        item.totalScore,
        item.status,
        item.answeredDescriptors,
        item.applicableDescriptors,
        item.meta.generalNotes,
        ...RUBRIC.map((dimension) => {
          const found = item.dimensions.find((entry) => entry.id === dimension.id);
          return found?.percent ?? "";
        })
      ]);
    });

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    downloadFile("historial-evaluaciones-aulas-virtuales.csv", csv, "text/csv;charset=utf-8");
  }

  async function copySummary() {
    const result = calculate(false);
    if (result.answeredDescriptors === 0) {
      alert("No hay informe para copiar.");
      return;
    }

    const lines = [
      APP_CONFIG.siteName,
      "",
      `Evaluador/a: ${result.meta.evaluator || "—"}`,
      `Fecha: ${formatDate(result.meta.date)}`,
      `Oferta: ${result.meta.programLabel || "—"}`,
      `${result.meta.courseLabel || "Cátedra"}: ${result.meta.course || "—"}`,
      `Modalidad: ${result.meta.modality || "—"}`,
      result.meta.lastAccess ? `Último acceso / revisión del aula: ${formatDate(result.meta.lastAccess)}` : "",
      "",
      `Resultado: ${result.totalScore}/100 · ${result.status}`,
      `Descriptores respondidos: ${result.answeredDescriptors}/${result.totalDescriptors}`,
      "",
      "Síntesis:",
      summaryText(result),
      "",
      "Puntajes por dimensión:",
      ...result.dimensions.map((dimension) => `- ${dimension.number}. ${dimension.title}: ${dimension.percent === null ? "—" : `${dimension.percent}/100`} (${dimension.answered}/${dimension.totalItems} respondidos, ${dimension.notApplicable} NA)`),
      "",
      "Prioridades de mejora:",
      ...(result.priorities.length ? result.priorities.map((item) => `- ${item.title}: ${item.percent === null ? "sin datos" : `${item.percent}/100`}. ${item.recommendation}`) : ["- No se detectan prioridades críticas inmediatas."])
    ].filter(Boolean).join("\n");

    try {
      await navigator.clipboard.writeText(lines);
      alert("Informe copiado al portapapeles.");
    } catch {
      alert("No se pudo copiar automáticamente. Usá imprimir/guardar PDF o exportar JSON.");
    }
  }

  function updateCounters() {
    const dimensions = collectDimensions();
    const answered = dimensions.reduce((sum, dimension) => sum + dimension.answered, 0);
    $("#answeredCount").textContent = String(answered);
    $("#totalCount").textContent = String(totalDescriptors());
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(APP_CONFIG.storageKey) || "[]");
    } catch {
      return [];
    }
  }

  function inputName(dimensionId, code) {
    return `score-${dimensionId}-${code.replace(/\./g, "-")}`;
  }

  function totalDescriptors() {
    return RUBRIC.reduce((sum, dimension) => sum + dimension.items.length, 0);
  }

  function round(value, decimals = 2) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
  }

  function createId() {
    return `eval-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function formatDate(value) {
    if (!value) return "—";
    const [year, month, day] = value.split("-");
    return year && month && day ? `${day}/${month}/${year}` : value;
  }

  function safeFileName(value) {
    return value.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "evaluacion";
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  }

  function downloadFile(fileName, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }
})();
