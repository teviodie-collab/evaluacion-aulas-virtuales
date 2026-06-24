(() => {
  const { APP_CONFIG, EVALUATION_MODEL } = window;

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
    renderInstrument();
    bindEvents();
    updateCounters();
    renderHistory();
    calculate(true);
  }

  function setDefaultDate() {
    const date = $("#date");
    if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);
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

  function renderInstrument() {
    const container = $("#rubricContainer");
    container.innerHTML = EVALUATION_MODEL.map(renderSection).join("");
    $("#totalCount").textContent = String(totalCriteria());
  }

  function renderSection(section) {
    const optional = section.optionalToggle ? `
      <label class="optional-toggle">
        <input type="checkbox" id="exclude-${section.id}" />
        No corresponde evaluar este bloque en el aula seleccionada
      </label>` : "";

    const observables = section.observables?.length ? `
      <div class="sub-block observable-block">
        <div class="sub-heading">
          <div>
            <h4>${escapeHtml(section.observablesLabel || "Aspectos observables que NO están presentes")}</h4>
            <p>Marcar únicamente los elementos ausentes. Dejar sin marcar lo que sí se observa en el aula.</p>
          </div>
          <label class="confirm-check">
            <input type="checkbox" id="confirmed-${section.id}" />
            Observables revisados
          </label>
        </div>
        <div class="checkbox-grid">
          ${section.observables.map((item, index) => `
            <label class="check-tile absent">
              <input type="checkbox" name="absent-${section.id}" value="${escapeHtml(item)}" data-index="${index}" />
              <span>${escapeHtml(item)}</span>
            </label>
          `).join("")}
        </div>
      </div>` : "";

    const resourceChecklist = section.resourceChecklist?.items?.length ? `
      <div class="sub-block resource-block">
        <h4>${escapeHtml(section.resourceChecklist.title)}</h4>
        <div class="checkbox-grid compact">
          ${section.resourceChecklist.items.map((item, index) => `
            <label class="check-tile present">
              <input type="checkbox" name="present-${section.id}" value="${escapeHtml(item)}" data-index="${index}" />
              <span>${escapeHtml(item)}</span>
            </label>
          `).join("")}
        </div>
      </div>` : "";

    const criteria = section.criteria.map((criterion) => renderCriterion(section.id, criterion)).join("");

    return `
      <article class="dimension-card" data-section="${escapeHtml(section.id)}">
        <header class="dimension-head">
          <div class="dimension-title-wrap">
            <span class="dimension-number">${escapeHtml(section.number)}</span>
            <div>
              <h3>${escapeHtml(section.title)}</h3>
              <p>${escapeHtml(section.description)}</p>
            </div>
          </div>
          <div class="dimension-score" id="section-score-${section.id}">
            <span>Peso ${section.weight}%</span>
            <strong>—</strong>
            <span>${section.criteria.length} criterios</span>
          </div>
        </header>
        ${optional}
        ${observables}
        <div class="criteria-stack">${criteria}</div>
        ${resourceChecklist}
        <div class="dimension-notes">
          <label>
            Observaciones / evidencias del bloque ${escapeHtml(section.number)}
            <textarea id="notes-${section.id}" placeholder="Registrar capturas, enlaces, evidencias Moodle, aclaraciones o acciones sugeridas."></textarea>
          </label>
        </div>
      </article>
    `;
  }

  function renderCriterion(sectionId, criterion) {
    const name = inputName(sectionId, criterion.id);
    return `
      <div class="criterion-card" data-criterion="${escapeHtml(criterion.id)}">
        <div class="criterion-head">
          <div>
            <h4>${escapeHtml(criterion.title)}</h4>
            <p>${escapeHtml(criterion.prompt)}</p>
          </div>
        </div>
        <div class="radio-grid six" role="radiogroup" aria-label="${escapeHtml(criterion.title)}">
          ${APP_CONFIG.scale.map((scale) => `
            <label class="radio-tile" title="${escapeHtml(scale.help)}">
              <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(scale.value)}" />
              <strong>${escapeHtml(scale.shortLabel)}</strong>
              <span>${escapeHtml(scale.label.replace(/^\d+ · /, ""))}</span>
            </label>
          `).join("")}
        </div>
        <details class="level-details">
          <summary>Ver descriptores de nivel</summary>
          <ol>
            ${Object.entries(criterion.levels).map(([level, text]) => `<li><strong>${escapeHtml(level)}.</strong> ${escapeHtml(text)}</li>`).join("")}
          </ol>
        </details>
      </div>
    `;
  }

  function bindEvents() {
    $("#rubricContainer").addEventListener("change", () => {
      updateCounters();
      calculate(true);
    });

    const metaSelectors = [
      "#email", "#evaluator", "#date", "#virtualClassroomName", "#program", "#course", "#siuCode",
      "#modality", "#curricularSpaces", "#teachingTeam", "#evaluationReferents", "#lastAccess", "#courseUrl", "#generalNotes"
    ];
    metaSelectors.forEach((selector) => {
      const el = $(selector);
      el.addEventListener("input", () => calculate(true));
      el.addEventListener("change", () => calculate(true));
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
      email: $("#email").value.trim(),
      evaluator: $("#evaluator").value.trim(),
      date: $("#date").value,
      virtualClassroomName: $("#virtualClassroomName").value.trim(),
      programKey,
      programLabel: program?.label || "",
      courseLabel: program?.courseLabel || "Cátedra",
      course: $("#course").value,
      siuCode: $("#siuCode").value.trim(),
      modality: $("#modality").value,
      curricularSpaces: $("#curricularSpaces").value.trim(),
      teachingTeam: $("#teachingTeam").value.trim(),
      evaluationReferents: $("#evaluationReferents").value.trim(),
      lastAccess: $("#lastAccess").value,
      courseUrl: $("#courseUrl").value.trim(),
      generalNotes: $("#generalNotes").value.trim()
    };
  }

  function collectSections() {
    return EVALUATION_MODEL.map((section) => {
      const excluded = Boolean(section.optionalToggle && $(`#exclude-${section.id}`)?.checked);
      const absentItems = $$( `input[name="absent-${section.id}"]:checked`).map((input) => input.value);
      const presentItems = $$( `input[name="present-${section.id}"]:checked`).map((input) => input.value);
      const observablesConfirmed = Boolean($(`#confirmed-${section.id}`)?.checked);
      const observableScore = section.observables?.length
        ? Math.round(((section.observables.length - absentItems.length) / section.observables.length) * 100)
        : null;

      const criteria = section.criteria.map((criterion) => {
        const checked = $(`input[name="${cssEscape(inputName(section.id, criterion.id))}"]:checked`);
        const value = checked?.value || "";
        const numeric = value ? Number(value) : null;
        return {
          id: criterion.id,
          title: criterion.title,
          value,
          numeric,
          percent: numeric === null ? 0 : Math.round(((numeric - 1) / 5) * 100),
          levelText: numeric === null ? "" : criterion.levels[String(numeric)]
        };
      });

      const components = [];
      if (section.observables?.length) components.push(observablesConfirmed ? observableScore : 0);
      criteria.forEach((criterion) => components.push(criterion.percent));

      const percent = excluded
        ? null
        : components.length
          ? Math.round(components.reduce((sum, value) => sum + value, 0) / components.length)
          : null;

      const notes = $(`#notes-${section.id}`).value.trim();
      const answeredCriteria = criteria.filter((criterion) => criterion.value !== "").length;
      const missingCriteria = criteria.length - answeredCriteria;

      return {
        id: section.id,
        number: section.number,
        title: section.title,
        weight: section.weight,
        gate: Boolean(section.gate),
        optional: Boolean(section.optionalToggle),
        excluded,
        observablesLabel: section.observablesLabel || "",
        totalObservables: section.observables?.length || 0,
        observablesConfirmed,
        absentItems,
        presentItems,
        observableScore,
        criteria,
        answeredCriteria,
        missingCriteria,
        percent,
        notes
      };
    });
  }

  function calculate(silent = false) {
    const meta = collectMeta();
    const sections = collectSections();
    const includedSections = sections.filter((section) => !section.excluded);
    const answeredCriteria = sections.reduce((sum, section) => sum + section.answeredCriteria, 0);
    const totalCriteriaCount = includedSections.reduce((sum, section) => sum + section.criteria.length, 0);
    const missingCriteria = includedSections.reduce((sum, section) => sum + section.missingCriteria, 0);

    const denominator = includedSections.reduce((sum, section) => sum + section.weight, 0);
    const weightedSum = includedSections.reduce((sum, section) => {
      const value = section.percent === null ? 0 : section.percent;
      return sum + (value * section.weight);
    }, 0);
    const totalScore = denominator ? Math.round(weightedSum / denominator) : 0;

    const accessibility = sections.find((section) => section.id === "diseno_accesibilidad");
    const accessibilityFailure = accessibility && !accessibility.excluded && accessibility.percent !== null && accessibility.percent < APP_CONFIG.thresholds.accessibilityMinimum;
    const criticalSections = includedSections.filter((section) => section.percent !== null && section.percent < APP_CONFIG.thresholds.sectionCritical);

    let status = "Sin calcular";
    let statusClass = "empty";
    if (answeredCriteria > 0 || sections.some((section) => section.observablesConfirmed)) {
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

    const digitalizationCriterion = sections
      .find((section) => section.id === "observaciones_generales")
      ?.criteria.find((criterion) => criterion.id === "nivel_digitalizacion");
    const digitalization = digitalizationCriterion?.numeric
      ? {
          level: digitalizationCriterion.numeric,
          percent: digitalizationCriterion.percent,
          text: digitalizationCriterion.levelText,
          endorsement: endorsementFromDigitalization(digitalizationCriterion.numeric)
        }
      : null;

    const result = {
      id: state.editingId || createId(),
      createdAt: new Date().toISOString(),
      meta,
      sections,
      includedWeight: denominator,
      totalCriteria: totalCriteriaCount,
      answeredCriteria,
      missingCriteria,
      totalScore,
      status,
      statusClass,
      accessibilityFailure,
      digitalization,
      criticalSections,
      priorities: buildPriorities(sections)
    };

    state.currentResult = result;
    updateSectionScores(sections);
    renderResult(result, silent);
    updateHeader(result);
    return result;
  }

  function updateSectionScores(sections) {
    sections.forEach((section) => {
      const target = $(`#section-score-${section.id}`);
      if (!target) return;
      const strong = $("strong", target);
      const spans = $$("span", target);
      if (section.excluded) {
        strong.textContent = "Excluido";
        target.className = "dimension-score excluded";
      } else if (section.percent === null) {
        strong.textContent = "—";
        target.className = "dimension-score";
      } else {
        strong.textContent = `${section.percent}/100`;
        target.className = `dimension-score ${scoreClass(section.percent)}`;
      }
      if (spans[1]) {
        const missing = section.missingCriteria;
        spans[1].textContent = missing ? `${missing} sin responder` : "Completo";
      }
    });
  }

  function renderResult(result, silent) {
    const box = $("#resultBox");
    const sectionRows = result.sections.map((section) => {
      const visibleScore = section.excluded ? "Excluido" : `${section.percent ?? 0}/100`;
      const absent = section.absentItems.length ? section.absentItems.join("; ") : "Sin ausencias marcadas";
      return `
        <tr>
          <td>${escapeHtml(section.number)}. ${escapeHtml(section.title)}</td>
          <td>${escapeHtml(visibleScore)}</td>
          <td>${escapeHtml(String(section.weight))}%</td>
          <td>${escapeHtml(absent)}</td>
        </tr>`;
    }).join("");

    const priorities = result.priorities.length
      ? `<ol>${result.priorities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`
      : "<p>No se detectan prioridades críticas con los datos cargados.</p>";

    const digitalizationHtml = result.digitalization
      ? `<p><strong>Nivel de digitalización seleccionado:</strong> ${result.digitalization.level}/6 · ${escapeHtml(result.digitalization.text)}<br><strong>Aval orientativo:</strong> ${escapeHtml(result.digitalization.endorsement)}</p>`
      : `<p><strong>Nivel de digitalización:</strong> sin seleccionar.</p>`;

    const missingWarning = result.missingCriteria > 0
      ? `<p class="warning-line">Quedan ${result.missingCriteria} criterios sin responder. El resultado puede variar al completar la evaluación.</p>`
      : "";

    const accessibilityWarning = result.accessibilityFailure
      ? `<p class="warning-line">Atención: Diseño instruccional y accesibilidad queda por debajo del mínimo institucional.</p>`
      : "";

    box.className = `result-box ${result.statusClass}`;
    box.innerHTML = `
      <div class="result-main">
        <div>
          <span class="result-label">Puntaje global</span>
          <strong>${result.totalScore}/100</strong>
        </div>
        <div>
          <span class="result-label">Estado</span>
          <strong>${escapeHtml(result.status)}</strong>
        </div>
        <div>
          <span class="result-label">Criterios respondidos</span>
          <strong>${result.answeredCriteria}/${result.totalCriteria}</strong>
        </div>
      </div>
      ${missingWarning}
      ${accessibilityWarning}
      ${digitalizationHtml}
      <h3>Resultado por bloque</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Bloque</th><th>Puntaje</th><th>Peso</th><th>Aspectos no presentes</th></tr></thead>
          <tbody>${sectionRows}</tbody>
        </table>
      </div>
      <h3>Prioridades de mejora</h3>
      ${priorities}
    `;

    if (!silent) {
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateHeader(result) {
    $("#headerScore").textContent = `${result.totalScore} / 100`;
    $("#headerStatus").textContent = result.status;
    $("#headerStatus").className = result.statusClass;
  }

  function updateCounters() {
    const total = totalCriteria();
    const answered = $$("#rubricContainer input[type='radio']:checked").length;
    $("#answeredCount").textContent = String(answered);
    $("#totalCount").textContent = String(total);
  }

  function totalCriteria() {
    return EVALUATION_MODEL.reduce((sum, section) => sum + section.criteria.length, 0);
  }

  function buildPriorities(sections) {
    const priorities = [];

    sections
      .filter((section) => !section.excluded && section.percent !== null && section.percent < 60)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 4)
      .forEach((section) => priorities.push(`Revisar ${section.number}. ${section.title}: puntaje ${section.percent}/100.`));

    sections.forEach((section) => {
      if (section.excluded) return;
      if (!section.observablesConfirmed && section.totalObservables > 0) {
        priorities.push(`Confirmar la revisión de aspectos observables en ${section.number}. ${section.title}.`);
      }
      if (section.absentItems.length) {
        const sample = section.absentItems.slice(0, 3).join(", ");
        priorities.push(`Incorporar o documentar en ${section.number}. ${section.title}: ${sample}${section.absentItems.length > 3 ? "…" : ""}.`);
      }
    });

    return [...new Set(priorities)].slice(0, 8);
  }

  function endorsementFromDigitalization(level) {
    const map = {
      1: "Sin aval académico según el nivel de digitalización declarado.",
      2: "Aval con observaciones: requiere mejoras para consolidar la propuesta virtual.",
      3: "Otorga aval: trayecto parcialmente personalizado.",
      4: "Otorga aval: trayecto mayormente personalizado.",
      5: "Otorga aval fortalecido: trayecto completamente personalizado con seguimiento visible.",
      6: "Aval destacado: trayecto personalizado específico con alto nivel de digitalización."
    };
    return map[level] || "Sin definición.";
  }

  function saveCurrent() {
    const form = $("#evaluationForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const result = calculate(true);
    const saved = loadSaved();
    const index = saved.findIndex((item) => item.id === result.id);
    if (index >= 0) saved[index] = result;
    else saved.unshift(result);
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(saved.slice(0, 200)));
    state.editingId = result.id;
    renderHistory();
    notify("Evaluación guardada en este navegador.");
  }

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(APP_CONFIG.storageKey) || "[]");
    } catch (error) {
      console.warn("No se pudo leer el historial", error);
      return [];
    }
  }

  function renderHistory() {
    const target = $("#historyList");
    const saved = loadSaved();
    if (!saved.length) {
      target.innerHTML = '<p class="muted">Todavía no hay evaluaciones guardadas.</p>';
      return;
    }

    target.innerHTML = saved.map((item) => `
      <article class="history-card">
        <div>
          <strong>${escapeHtml(item.meta.course || item.meta.virtualClassroomName || "Aula sin nombre")}</strong>
          <p>${escapeHtml(item.meta.programLabel || "")} · ${escapeHtml(item.meta.date || "Sin fecha")} · ${escapeHtml(item.status)} · ${item.totalScore}/100</p>
        </div>
        <div class="button-row small">
          <button type="button" class="secondary" data-load="${escapeHtml(item.id)}">Cargar</button>
          <button type="button" class="danger ghost" data-delete="${escapeHtml(item.id)}">Eliminar</button>
        </div>
      </article>
    `).join("");

    target.addEventListener("click", handleHistoryClick, { once: true });
  }

  function handleHistoryClick(event) {
    const loadId = event.target?.dataset?.load;
    const deleteId = event.target?.dataset?.delete;
    if (loadId) loadEvaluation(loadId);
    if (deleteId) deleteEvaluation(deleteId);
    renderHistory();
  }

  function loadEvaluation(id) {
    const item = loadSaved().find((entry) => entry.id === id);
    if (!item) return;
    state.editingId = item.id;

    const meta = item.meta || {};
    setValue("#email", meta.email || "");
    setValue("#evaluator", meta.evaluator || "");
    setValue("#date", meta.date || "");
    setValue("#virtualClassroomName", meta.virtualClassroomName || "");
    setValue("#program", meta.programKey || "");
    populateCourses(meta.programKey || "", meta.course || "");
    setValue("#siuCode", meta.siuCode || "");
    setValue("#modality", meta.modality || "Presencial con complementos virtuales");
    setValue("#curricularSpaces", meta.curricularSpaces || "");
    setValue("#teachingTeam", meta.teachingTeam || "");
    setValue("#evaluationReferents", meta.evaluationReferents || "");
    setValue("#lastAccess", meta.lastAccess || "");
    setValue("#courseUrl", meta.courseUrl || "");
    setValue("#generalNotes", meta.generalNotes || "");

    resetInstrumentInputs();
    (item.sections || []).forEach((section) => {
      const exclude = $(`#exclude-${section.id}`);
      if (exclude) exclude.checked = Boolean(section.excluded);
      const confirmed = $(`#confirmed-${section.id}`);
      if (confirmed) confirmed.checked = Boolean(section.observablesConfirmed);
      (section.absentItems || []).forEach((value) => checkByNameAndValue(`absent-${section.id}`, value));
      (section.presentItems || []).forEach((value) => checkByNameAndValue(`present-${section.id}`, value));
      (section.criteria || []).forEach((criterion) => {
        const input = $(`input[name="${cssEscape(inputName(section.id, criterion.id))}"][value="${cssEscape(criterion.value)}"]`);
        if (input) input.checked = true;
      });
      setValue(`#notes-${section.id}`, section.notes || "");
    });

    updateCounters();
    calculate(true);
    notify("Evaluación cargada para editar.");
  }

  function resetInstrumentInputs() {
    $$("#rubricContainer input[type='radio'], #rubricContainer input[type='checkbox']").forEach((input) => {
      input.checked = false;
    });
    $$("#rubricContainer textarea").forEach((textarea) => {
      textarea.value = "";
    });
  }

  function checkByNameAndValue(name, value) {
    const inputs = $$(`input[name="${cssEscape(name)}"]`);
    const found = inputs.find((input) => input.value === value);
    if (found) found.checked = true;
  }

  function deleteEvaluation(id) {
    const saved = loadSaved().filter((item) => item.id !== id);
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(saved));
    if (state.editingId === id) state.editingId = null;
    notify("Evaluación eliminada.");
  }

  function clearHistory() {
    if (!confirm("¿Borrar todas las evaluaciones guardadas en este navegador?")) return;
    localStorage.removeItem(APP_CONFIG.storageKey);
    state.editingId = null;
    renderHistory();
    notify("Historial borrado.");
  }

  function resetForm() {
    if (!confirm("¿Iniciar una nueva evaluación? Se limpiarán los datos no guardados.")) return;
    state.editingId = null;
    $("#evaluationForm").reset();
    setDefaultDate();
    populatePrograms();
    resetInstrumentInputs();
    updateCounters();
    calculate(true);
  }

  function exportJson() {
    const result = calculate(true);
    downloadFile(`evaluacion-aula-${safeFileName(result.meta.course || result.meta.virtualClassroomName || "moodle")}.json`, JSON.stringify(result, null, 2), "application/json");
  }

  function exportCsv() {
    const saved = loadSaved();
    const rows = [
      ["fecha", "correo", "evaluador", "aula", "carrera_oferta", "catedra_oferta", "codigo_siu", "modalidad", "puntaje", "estado", "nivel_digitalizacion", "aval_orientativo"]
    ];

    saved.forEach((item) => {
      rows.push([
        item.meta.date || "",
        item.meta.email || "",
        item.meta.evaluator || "",
        item.meta.virtualClassroomName || "",
        item.meta.programLabel || "",
        item.meta.course || "",
        item.meta.siuCode || "",
        item.meta.modality || "",
        item.totalScore,
        item.status,
        item.digitalization?.level || "",
        item.digitalization?.endorsement || ""
      ]);
    });

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    downloadFile("historial-evaluaciones-aulas.csv", csv, "text/csv;charset=utf-8");
  }

  async function copySummary() {
    const result = calculate(true);
    const lines = [];
    lines.push("Informe breve de evaluación de aula virtual");
    lines.push(`Aula: ${result.meta.virtualClassroomName || result.meta.course || "Sin nombre"}`);
    lines.push(`Carrera/oferta: ${result.meta.programLabel || "Sin dato"}`);
    lines.push(`${result.meta.courseLabel || "Cátedra"}: ${result.meta.course || "Sin dato"}`);
    lines.push(`Código SIU: ${result.meta.siuCode || "Sin dato"}`);
    lines.push(`Modalidad: ${result.meta.modality || "Sin dato"}`);
    lines.push(`Fecha: ${result.meta.date || "Sin dato"}`);
    lines.push(`Puntaje global: ${result.totalScore}/100`);
    lines.push(`Estado: ${result.status}`);
    if (result.digitalization) {
      lines.push(`Nivel de digitalización: ${result.digitalization.level}/6 - ${result.digitalization.text}`);
      lines.push(`Aval orientativo: ${result.digitalization.endorsement}`);
    }
    lines.push("Prioridades de mejora:");
    result.priorities.forEach((priority, index) => lines.push(`${index + 1}. ${priority}`));

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      notify("Informe breve copiado al portapapeles.");
    } catch (error) {
      console.warn(error);
      alert(lines.join("\n"));
    }
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function notify(message) {
    const existing = $(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  function setValue(selector, value) {
    const el = $(selector);
    if (el) el.value = value;
  }

  function inputName(sectionId, criterionId) {
    return `criterion-${sectionId}-${criterionId}`;
  }

  function scoreClass(score) {
    if (score >= APP_CONFIG.thresholds.approved) return "approved";
    if (score >= APP_CONFIG.thresholds.conditional) return "conditional";
    return "critical";
  }

  function createId() {
    return `eval-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function safeFileName(value) {
    return String(value || "archivo")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 80) || "archivo";
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
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
