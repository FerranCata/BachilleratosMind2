const defaultDate = new Date(2026, 8, 3);
const state = {
  currentSection: 'inicio',
  currentRole: 'profesores',
  currentMonth: defaultDate.getMonth(),
  currentYear: defaultDate.getFullYear(),
  selectedDate: null,
  editingEventIndex: null,
  storeCategory: 'papeleria',
  storeTab: 'catalog',
  selectedProduct: null,
  cart: [
    { productId: 'cuota-2526', quantity: 1 },
    { productId: 'boligrafo-azul', quantity: 3 },
    { productId: 'libreta-espiral', quantity: 5 },
    { productId: 'calculadora', quantity: 1 },
    { productId: 'regla-verde', quantity: 1 },
  ],
  checkoutStep: 1,
  paymentMethod: 'tarjeta',
  materialsPath: ['Materiales', 'Materiales del Centro', '2º BACH', 'Castellano', 'Sintaxis'],
  conversations: {},
};

const newsItems = [
  {
    title: 'Ya puedes descargar el modelo actualizado de examen de Matemáticas II para la prueba de EBAU.',
    detail: 'Incluye los nuevos criterios de corrección y ejemplos de preguntas tipo. Disponible en la sección de materiales del centro.',
    author: 'Dpto. de Matemáticas',
    time: 'Hace 2 horas',
    image: 'https://img.icons8.com/color/96/abacus.png',
  },
  {
    title: 'La plataforma estará en mantenimiento el sábado de 22:00 a 23:00. Guarda tus progresos antes.\npor: Dpto. de Matemáticas',
    detail: 'Durante esa franja el acceso quedará limitado. Recomendamos descargar apuntes y completar tareas pendientes antes del inicio.',
    author: 'Mantenimiento',
    time: 'Hace 3 horas',
    image: 'https://img.icons8.com/fluency/96/maintenance.png',
  },
  {
    title: 'Nueva clase de refuerzo de Química (Enlace químico) disponible el jueves a las 17:30.',
    detail: 'Reserva tu plaza en la sección de Clases de Refuerzo. Habrá repaso de enlaces covalentes e iónicos con ejercicios prácticos.',
    author: 'Dpto. de Química',
    time: 'Hace 3 horas',
    image: 'https://img.icons8.com/fluency/96/test-tube.png',
  },
];

const notifications = [
  { title: 'Mensaje de Jaime', text: 'Gracias!' },
  { title: 'Recordatorio Clase de Repaso', text: '17:00 - 19:00', icon: 'clock' },
  { title: '¡Nuevos Materiales Subidos!', text: 'Examenes Resueltos Física 2 BACH' },
];

const eventColors = {
  Castellano: '#2e6edb',
  Cast: '#2e6edb',
  Valenciano: '#e52e2e',
  Inglés: '#d44bd4',
  In: '#d44bd4',
  Mates: '#f3bc1b',
  Mat: '#f3bc1b',
};
const defaultEventColor = '#2e6edb';

const calendarEvents = {
  '2026-09-01': [
    { subject: 'Historia', time: '10:00 - 11:30', color: '#8b5cf6' },
    { subject: 'Inglés', time: '12:00 - 13:00', color: '#d44bd4' },
  ],
  '2026-09-03': [
    { subject: 'Matemáticas', time: '16:00 - 17:30', color: '#f3bc1b' },
    { subject: 'Castellano', time: '18:00 - 19:00', color: '#2e6edb' },
  ],
  '2026-09-04': [
    { subject: 'Química', time: '09:00 - 10:00', color: '#20b07f' },
  ],
  '2026-09-07': [
    { subject: 'Valenciano', time: '11:00 - 12:30', color: '#e52e2e' },
    { subject: 'Física', time: '15:30 - 17:00', color: '#2e6edb' },
  ],
};

const sidebarToggleClass = 'sidebar-open';
const sidebarClosingClass = 'sidebar-closing';
const sidebarPanel = document.querySelector('.sidebar');

const isNarrowScreen = () => window.matchMedia('(max-width: 1100px)').matches;

const setSidebarOpen = (isOpen) => {
  const wasOpen = document.body.classList.contains(sidebarToggleClass);
  if (!isOpen && wasOpen && isNarrowScreen() && sidebarPanel) {
    document.body.classList.add(sidebarClosingClass);
    const handleTransitionEnd = (event) => {
      if (event.propertyName !== 'transform') return;
      document.body.classList.remove(sidebarClosingClass);
      sidebarPanel.removeEventListener('transitionend', handleTransitionEnd);
    };
    sidebarPanel.addEventListener('transitionend', handleTransitionEnd);
    window.setTimeout(() => {
      document.body.classList.remove(sidebarClosingClass);
      sidebarPanel.removeEventListener('transitionend', handleTransitionEnd);
    }, 300);
  }
  if (isOpen) {
    document.body.classList.remove(sidebarClosingClass);
  }
  document.body.classList.toggle(sidebarToggleClass, isOpen);
};

const closeSidebarForNarrow = () => {
  if (isNarrowScreen()) {
    setSidebarOpen(false);
  }
};

const materialsTree = {
  title: 'Materiales',
  type: 'folder',
  children: [
    {
      title: 'Materiales del Centro',
      type: 'folder',
      children: [
        {
          title: '2º BACH',
          type: 'folder',
          children: [
            {
              title: 'Castellano',
              type: 'folder',
              children: [
                {
                  title: 'Sintaxis',
                  type: 'folder',
                  children: [
                    { title: 'Exámenes resueltos de sintaxis', type: 'file', detail: '5 archivos', meta: 'Actualizado hoy' },
                    { title: 'Guía rápida - Sintaxis.pdf', type: 'file', detail: '1,2 MB · PDF', meta: 'Modificado hace 2 días' },
                    { title: 'Esquemas oracionales', type: 'folder', detail: '3 subcarpetas', meta: 'Actualizado el lunes' },
                    { title: 'Actividades autocorregibles.xlsx', type: 'file', detail: 'Hoja de cálculo', meta: 'Añadido esta semana' },
                  ],
                },
                {
                  title: 'Literatura',
                  type: 'folder',
                  children: [
                    { title: 'Lecturas recomendadas 2º BACH', type: 'file', detail: 'Material de lectura', meta: 'Actualizado el mes pasado' },
                  ],
                },
              ],
            },
            {
              title: 'Física',
              type: 'folder',
              children: [
                { title: 'Banco de frases - Práctica', type: 'file', detail: 'Documento · 0,8 MB', meta: 'Revisado ayer' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Recursos compartidos',
      type: 'folder',
      children: [
        { title: 'Apuntes colaborativos', type: 'file', detail: 'Notas compartidas', meta: 'Actualizado esta semana' },
        { title: 'Plantillas de ejercicios', type: 'file', detail: '3 documentos', meta: 'Añadido este mes' },
      ],
    },
    {
      title: 'Recursos Adicionales',
      type: 'folder',
      children: [
        {
          title: 'Videos',
          type: 'folder',
          children: [
            { title: 'Matemáticas', type: 'folder', detail: '12 vídeos', meta: 'Actualizado hoy' },
            { title: 'Química', type: 'folder', detail: '8 vídeos', meta: 'Actualizado ayer' },
            { title: 'Física', type: 'folder', detail: '10 vídeos', meta: 'Actualizado esta semana' },
            { title: 'Biología', type: 'folder', detail: '6 vídeos', meta: 'Nuevo contenido' },
            { title: 'Historia', type: 'folder', detail: '5 vídeos', meta: 'Actualizado ayer' },
            { title: 'Valenciano', type: 'folder', detail: '7 vídeos', meta: 'Actualizado esta semana' },
            { title: 'Inglés', type: 'folder', detail: '9 vídeos', meta: 'Actualizado hoy' },
            { title: 'Economía', type: 'folder', detail: '4 vídeos', meta: 'Actualizado hoy' },
            { title: 'Filosofía', type: 'folder', detail: '3 vídeos', meta: 'Nuevo contenido' },
          ],
        },
      ],
    },
  ],
};

const upcomingClasses = [
  { subject: 'Matemáticas', date: '02/11/2025', time: '16:00 - 17:00' },
  { subject: 'Valenciano', date: '03/11/2025', time: '18:00 - 19:00' },
  { subject: 'Biología', date: '04/11/2025', time: '15:00 - 16:00' },
  { subject: 'Historia', date: '05/11/2025', time: '17:00 - 18:30' },
  { subject: 'Física', date: '06/11/2025', time: '16:30 - 17:30' },
  { subject: 'Inglés', date: '07/11/2025', time: '18:00 - 19:30' },
  { subject: 'Química', date: '08/11/2025', time: '16:00 - 17:00' },
  { subject: 'Economía', date: '09/11/2025', time: '17:30 - 18:30' },
  { subject: 'Filosofía', date: '10/11/2025', time: '18:00 - 19:00' },
];

const recordedClasses = [
  { subject: 'Matemáticas' },
  { subject: 'Química' },
  { subject: 'Física' },
  { subject: 'Biología' },
  { subject: 'Historia' },
  { subject: 'Valenciano' },
  { subject: 'Inglés' },
  { subject: 'Economía' },
  { subject: 'Filosofía' },
];

const storeCategories = [
  { id: 'todo', label: 'Todo' },
  { id: 'libros', label: 'Libros' },
  { id: 'papeleria', label: 'Papelería' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'preparacion', label: 'Preparación Exámenes' },
  { id: 'servicios', label: 'Servicios' },
];

const products = [
  { id: 'cuota-2526', name: 'Cuota anual matrícula 25/26', price: 1000, category: 'servicios', description: 'Pago de matrícula anual para el curso 25/26.', gallery: 1 },
  { id: 'boligrafo-azul', name: 'Bolígrafo azul', price: 1, category: 'papeleria', description: 'Bolígrafo tinta azul de trazo fino.', gallery: 2 },
  { id: 'libreta-espiral', name: 'Libreta de espiral tamaño mediano', price: 4, category: 'papeleria', description: 'Libreta cuadriculada con tapa dura y 100 hojas.', gallery: 2 },
  { id: 'calculadora', name: 'Calculadora científica escolar', price: 30, category: 'tecnologia', description: 'Calculadora con funciones trigonométricas y estadísticas.', gallery: 2 },
  { id: 'regla-verde', name: 'Regla escolar transparente verde', price: 5, category: 'papeleria', description: 'Regla de 30 cm con marcaje antideslizante.', gallery: 1 },
  { id: 'manual-sintaxis', name: 'Manual de sintaxis 2º BACH', price: 24.5, category: 'libros', description: 'Manual con teoría, ejemplos y ejercicios resueltos de sintaxis.', gallery: 3 },
  { id: 'pack-ebau', name: 'Pack simulacros EBAU Lengua', price: 18, category: 'preparacion', description: 'Colección de simulacros de examen con soluciones comentadas.', gallery: 2 },
  { id: 'kit-highlighters', name: 'Pack subrayadores pastel', price: 6, category: 'papeleria', description: 'Subrayadores de larga duración en colores pastel.', gallery: 2 },
  { id: 'tablet-academica', name: 'Tablet académica 10"', price: 210, category: 'tecnologia', description: 'Tablet con lápiz digital para apuntes y clases online.', gallery: 3 },
  { id: 'mochila', name: 'Mochila ergonómica Bachillerato', price: 39, category: 'papeleria', description: 'Mochila con compartimento para portátil y cuadernos.', gallery: 2 },
  { id: 'lecturas-castellano', name: 'Pack lecturas Castellano', price: 27, category: 'libros', description: 'Selección de lecturas recomendadas para 2º BACH.', gallery: 2 },
  { id: 'auriculares', name: 'Auriculares con micrófono', price: 25, category: 'tecnologia', description: 'Auriculares cómodos para videoclases y estudio.', gallery: 2 },
  { id: 'flashcards-historia', name: 'Flashcards Historia de España', price: 12, category: 'preparacion', description: 'Tarjetas de repaso con hitos clave y preguntas rápidas.', gallery: 1 },
  { id: 'cuaderno-musica', name: 'Cuaderno pauta doble', price: 3.5, category: 'papeleria', description: 'Cuaderno pautado para clase de música.', gallery: 1 },
  { id: 'organizador-escritorio', name: 'Organizador de escritorio', price: 9, category: 'papeleria', description: 'Bandeja para rotuladores, libretas y notas adhesivas.', gallery: 1 },
  { id: 'router-estudio', name: 'Router WiFi estudio', price: 48, category: 'tecnologia', description: 'Router con priorización de tráfico para clases online.', gallery: 1 },
  { id: 'pack-apuntes', name: 'Apuntes resumidos de Química', price: 15, category: 'preparacion', description: 'Apuntes estructurados por temas con ejercicios tipo examen.', gallery: 2 },
];

const formatCurrency = (value) => `${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const getCategoryLabel = (id) => storeCategories.find(cat => cat.id === id)?.label || 'Otros';
const findProduct = (productId) => products.find(p => p.id === productId);
const padDateNumber = (value) => String(value).padStart(2, '0');
const toIsoDate = (date) => `${date.getFullYear()}-${padDateNumber(date.getMonth() + 1)}-${padDateNumber(date.getDate())}`;
const parseClassDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('/').map(Number);
  if (!day || !month || !year) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : toIsoDate(date);
};
const getMaterialsFolder = (path) => {
  let current = materialsTree;
  for (let i = 1; i < path.length; i++) {
    const next = current.children?.find(child => child.type === 'folder' && child.title === path[i]);
    if (!next) return materialsTree;
    current = next;
  }
  return current;
};

const getMaterialsItems = (path) => getMaterialsFolder(path)?.children || [];

const conversations = {
  profesores: [
    { id: 'jaime', name: 'Jaime Velduque B.', preview: 'El jueves es la revisión', time: '1 min', messages: [
      { from: 'them', text: 'El jueves es la revisión' },
      { from: 'me', text: 'Entendido, gracias!' },
    ] },
    { id: 'nacho', name: 'Nacho Rodriguez Mor.', preview: 'Venga a las 17:00', time: '10 min', messages: [
      { from: 'them', text: 'Venga a las 17:00' },
      { from: 'me', text: 'Allí estaré.' },
    ] },
    { id: 'pablo', name: 'Pablo Rodriguez O.', preview: '¿Tienes los ejercicios?', time: '20 min', messages: [
      { from: 'them', text: '¿Tienes los ejercicios?' },
      { from: 'me', text: 'Los entrego hoy.' },
    ] },
    { id: 'marcos', name: 'Marcos Lopez Pons', preview: 'Gracias!', time: '25 min', messages: [
      { from: 'them', text: 'tienes el pdf de esta practica hecho?' },
      { from: 'me', text: 'Sí, ahora te lo paso.' },
      { from: 'them', text: 'Gracias!' },
    ] },
  ],
  alumnos: [
    { id: 'jaime-a', name: 'Jaime', preview: 'Gracias!', time: '1 min', messages: [
      { from: 'them', text: 'Gracias!' },
      { from: 'me', text: 'De nada!' },
    ] },
    { id: 'nacho-a', name: 'Nacho', preview: 'Pásame los apuntes.', time: '10 min', messages: [
      { from: 'them', text: 'Pásame los apuntes.' },
      { from: 'me', text: 'Te los mando ahora.' },
    ] },
    { id: 'taha', name: 'Taha', preview: '¿Tienes los ejercicios?', time: '20 min', messages: [
      { from: 'them', text: '¿Tienes los ejercicios?' },
      { from: 'me', text: 'Sí, los llevo.' },
    ] },
    { id: 'marcos-a', name: 'Marcos', preview: 'Eres el mejor', time: '25 min', messages: [
      { from: 'them', text: 'Eres el mejor' },
      { from: 'me', text: 'Gracias!' },
    ] },
  ],
};

function renderNews() {
  const container = document.getElementById('newsList');
  if (!container) return;
  container.innerHTML = newsItems.map((item, index) => `
    <div class="news-card">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <div class="news-title">${item.title}</div>
        <div class="news-meta">${item.time} · Publicado por: ${item.author}</div>
        <p class="news-detail d-none" id="newsDetail-${index}">${item.detail || ''}</p>
        <a class="news-link" href="#" data-index="${index}">Leer más</a>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.news-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const index = link.dataset.index;
      const detail = document.getElementById(`newsDetail-${index}`);
      if (!detail) return;
      const isHidden = detail.classList.contains('d-none');
      detail.classList.toggle('d-none', !isHidden);
      link.textContent = isHidden ? 'Leer menos' : 'Leer más';
    });
  });
}

function renderNotifications() {
  const container = document.getElementById('notificationList');
  if (!container) return;
  container.innerHTML = notifications.map(n => `
    <div class="notification-item">
      <div class="notification-title">${n.title}</div>
      <div class="text-muted">${n.text}</div>
    </div>
  `).join('');
}

function updateNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === state.currentSection);
  });
  document.querySelectorAll('.section').forEach(section => {
    section.classList.toggle('d-none', section.id !== state.currentSection);
  });
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextSection = btn.dataset.section;
      const previousSection = state.currentSection;
      state.currentSection = nextSection;
      if (nextSection === 'calendario' && previousSection !== 'calendario') {
        state.selectedDate = null;
        renderCalendar();
      }
      updateNavigation();
      closeSidebarForNarrow();
    });
  });

  const brandLink = document.getElementById('brandLink');
  if (brandLink) {
    brandLink.addEventListener('click', () => {
      state.currentSection = 'inicio';
      updateNavigation();
      closeSidebarForNarrow();
    });
  }
}

function fillSelectOptions() {
  const monthSelect = document.getElementById('monthSelect');
  const yearSelect = document.getElementById('yearSelect');
  if (!monthSelect || !yearSelect) return;
  const months = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  monthSelect.innerHTML = months.map((m, i) => `<option value="${i}">${m}</option>`).join('');
  const currentYear = new Date().getFullYear();
  const range = Array.from({ length: 5 }, (_, idx) => currentYear - 1 + idx);
  yearSelect.innerHTML = range.map(y => `<option value="${y}">${y}</option>`).join('');
  monthSelect.value = state.currentMonth;
  yearSelect.value = state.currentYear;
  monthSelect.addEventListener('change', (e) => {
    state.currentMonth = Number(e.target.value);
    renderCalendar();
  });
  yearSelect.addEventListener('change', (e) => {
    state.currentYear = Number(e.target.value);
    renderCalendar();
  });
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const firstDay = new Date(state.currentYear, state.currentMonth, 1);
  const startWeekday = firstDay.getDay() || 7; // Monday first
  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  const totalCells = Math.ceil((startWeekday - 1 + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - (startWeekday - 2);
    const date = new Date(state.currentYear, state.currentMonth, dayNumber);
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const iso = toIsoDate(date);
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day ' + (isCurrentMonth ? '' : 'inactive');
    dayEl.dataset.date = iso;
    if (state.selectedDate === iso) dayEl.classList.add('selected');
    if (iso === toIsoDate(new Date())) dayEl.classList.add('today');
    const events = calendarEvents[iso] || [];
    const visibleEvents = events.slice(0, 2);
    const remaining = events.length - visibleEvents.length;
    dayEl.innerHTML = `
      <div class="day-number">${isCurrentMonth ? dayNumber : ''}</div>
      <div class="day-events">${visibleEvents.map(ev => {
        const color = getEventColor(ev);
        const label = ev.subject ? 'labelled' : '';
        const text = ev.subject || '';
        const time = ev.time ? `<span class="event-time">${ev.time}</span>` : '';
        return `<span class="event-pill ${label}" style="--event-color:${color};" title="${text}${ev.time ? ` · ${ev.time}` : ''}"><span class="event-name">${text}</span>${time}</span>`;
      }).join('')}${remaining > 0 ? `<span class="event-pill more">+${remaining} más</span>` : ''}</div>
    `;
    if (isCurrentMonth) {
      dayEl.addEventListener('click', () => {
        if (state.selectedDate === iso) {
          toggleEventForm(true, { mode: 'add' });
          return;
        }
        state.selectedDate = iso;
        renderCalendar();
        renderDayEvents();
      });
    }
    grid.appendChild(dayEl);
  }
  renderDayEvents();
}

function renderDayEvents() {
  const container = document.getElementById('calendarEvents');
  const list = document.getElementById('calendarEventsList');
  const dateLabel = document.getElementById('calendarEventsDate');
  if (!container) return;
  if (!state.selectedDate) {
    container.classList.add('d-none');
    if (list) list.innerHTML = '';
    if (dateLabel) dateLabel.textContent = '';
    return;
  }
  if (!list) return;
  const dayEvents = calendarEvents[state.selectedDate] || [];
  container.classList.remove('d-none');
  if (dateLabel) dateLabel.textContent = formatDate(state.selectedDate);
  if (dayEvents.length === 0) {
    list.innerHTML = '<div class="text-muted">No hay eventos para esta fecha.</div>';
  } else {
    list.innerHTML = dayEvents.map((ev, idx) => {
      const color = getEventColor(ev);
      return `
      <div class="event-card" style="border-left-color:${color}" data-index="${idx}">
        <i class="fa-regular fa-calendar" style="color:${color}"></i>
        <div>
          <p class="event-title">Clase de ${ev.subject}</p>
          <small>${formatDate(state.selectedDate)} · ${ev.time || 'Horario por confirmar'}</small>
        </div>
        <button class="icon-btn ms-auto edit-event-btn" data-index="${idx}" title="Editar evento">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    `;
    }).join('');
  }

  list.querySelectorAll('.edit-event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      const selectedEvents = calendarEvents[state.selectedDate] || [];
      const eventData = selectedEvents[index];
      if (!eventData) return;
      toggleEventForm(true, { mode: 'edit', eventIndex: index, eventData });
    });
  });

  positionCalendarEvents();
}

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
}

function getEventColor(eventData) {
  return eventData.color || eventColors[eventData.subject] || defaultEventColor;
}

function updateEventColorSelection(color) {
  const swatches = document.querySelectorAll('.color-swatch');
  if (!swatches.length) return;
  swatches.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.color?.toLowerCase() === color.toLowerCase());
  });
}

function toggleEventForm(show, options = {}) {
  const overlay = document.getElementById('eventFormOverlay');
  const dateLabel = document.getElementById('eventFormDate');
  const subjectInput = document.getElementById('eventSubject');
  const timeInput = document.getElementById('eventTime');
  const colorInput = document.getElementById('eventColor');
  const submitBtn = document.getElementById('eventFormSubmit');
  const deleteBtn = document.getElementById('deleteEventBtn');
  if (!overlay || !dateLabel || !subjectInput || !timeInput || !colorInput || !submitBtn || !deleteBtn) return;
  if (show) {
    const { mode = 'add', eventIndex = null, eventData = {} } = options;
    state.editingEventIndex = mode === 'edit' ? eventIndex : null;
    overlay.classList.remove('d-none');
    dateLabel.textContent = state.selectedDate ? formatDate(state.selectedDate) : 'Selecciona una fecha';
    subjectInput.value = eventData.subject || '';
    timeInput.value = eventData.time || '';
    colorInput.value = getEventColor(eventData);
    updateEventColorSelection(colorInput.value);
    submitBtn.textContent = mode === 'edit' ? 'Guardar cambios' : 'Añadir';
    deleteBtn.classList.toggle('d-none', mode !== 'edit');
    overlay.dataset.mode = mode;
    subjectInput.focus();
  } else {
    overlay.classList.add('d-none');
    overlay.dataset.mode = '';
    state.editingEventIndex = null;
    submitBtn.textContent = 'Añadir';
    deleteBtn.classList.add('d-none');
  }
}

function handleAddEvent() {
  const addBtn = document.getElementById('addEventBtn');
  const form = document.getElementById('eventForm');
  const cancelBtn = document.getElementById('cancelEvent');
  const closeBtn = document.getElementById('closeEventForm');
  const overlay = document.getElementById('eventFormOverlay');
  const deleteBtn = document.getElementById('deleteEventBtn');
  const colorInput = document.getElementById('eventColor');
  const swatches = document.querySelectorAll('.color-swatch');
  if (!addBtn || !form || !cancelBtn || !closeBtn || !overlay || !deleteBtn) return;

  if (colorInput && swatches.length) {
    swatches.forEach(btn => {
      btn.style.setProperty('--swatch-color', btn.dataset.color);
      btn.addEventListener('click', () => {
        colorInput.value = btn.dataset.color;
        updateEventColorSelection(colorInput.value);
      });
    });
    colorInput.addEventListener('input', () => updateEventColorSelection(colorInput.value));
    colorInput.addEventListener('change', () => updateEventColorSelection(colorInput.value));
    updateEventColorSelection(colorInput.value);
  }

  addBtn.addEventListener('click', () => {
    if (!state.selectedDate) {
      const todayIso = toIsoDate(new Date());
      state.selectedDate = todayIso;
      renderCalendar();
    }
    toggleEventForm(true, { mode: 'add' });
  });

  const closeForm = () => toggleEventForm(false);
  cancelBtn.addEventListener('click', closeForm);
  closeBtn.addEventListener('click', closeForm);
  deleteBtn.addEventListener('click', () => {
    if (!state.selectedDate) return;
    const isEditMode = overlay.dataset.mode === 'edit' && state.editingEventIndex !== null;
    if (!isEditMode) return;
    const message = '¿Quieres eliminar este evento? Esta acción no se puede deshacer.';
    if (!window.confirm(message)) return;
    const events = calendarEvents[state.selectedDate] || [];
    events.splice(state.editingEventIndex, 1);
    if (events.length === 0) delete calendarEvents[state.selectedDate];
    toggleEventForm(false);
    renderCalendar();
    renderDayEvents();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.selectedDate) return;
    const subject = document.getElementById('eventSubject').value.trim() || 'Nuevo evento';
    const time = document.getElementById('eventTime').value.trim();
    const color = document.getElementById('eventColor').value || defaultEventColor;
    const iso = state.selectedDate;
    if (!calendarEvents[iso]) calendarEvents[iso] = [];
    const isEditMode = overlay.dataset.mode === 'edit' && state.editingEventIndex !== null;
    if (isEditMode && calendarEvents[iso][state.editingEventIndex]) {
      calendarEvents[iso][state.editingEventIndex] = { subject, time, color };
    } else {
      calendarEvents[iso].push({ subject, time, color });
    }
    toggleEventForm(false);
    renderCalendar();
    renderDayEvents();
  });
}

function positionCalendarEvents() {
  const container = document.getElementById('calendarEvents');
  const grid = document.getElementById('calendarGrid');
  if (!container || !grid || !state.selectedDate) return;
  const dayEl = grid.querySelector(`.calendar-day[data-date="${state.selectedDate}"]`);
  if (!dayEl) {
    container.classList.add('d-none');
    return;
  }
  const panel = grid.closest('.calendar-panel');
  if (!panel) return;
  const panelRect = panel.getBoundingClientRect();
  const dayRect = dayEl.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  const topOffset = dayRect.bottom - panelRect.top + 8;
  const leftOffset = gridRect.left - panelRect.left;
  container.style.top = `${topOffset}px`;
  container.style.left = `${leftOffset}px`;
  container.style.width = `${gridRect.width}px`;
}

function renderMaterials() {
  const container = document.getElementById('materialsList');
  const breadcrumb = document.getElementById('materialsPath');
  if (!container || !breadcrumb) return;

  const items = getMaterialsItems(state.materialsPath);

  breadcrumb.innerHTML = state.materialsPath.map((segment, idx) => `
    <button class="crumb ${idx === state.materialsPath.length - 1 ? 'active' : ''}" data-index="${idx}">${segment}</button>
    ${idx < state.materialsPath.length - 1 ? '<span class="crumb-separator">></span>' : ''}
  `).join('');

  const rows = [];

  if (state.materialsPath.length > 1) {
    const parentName = state.materialsPath[state.materialsPath.length - 2];
    rows.push(`
      <div class="material-row back-row" data-action="back">
        <div class="material-icon"><i class="fa-solid fa-arrow-left"></i></div>
        <div class="material-label">
          <div class="title">Atrás</div>
          <div class="subtitle">Volver a ${parentName}</div>
        </div>
        <div class="material-meta"></div>
      </div>
    `);
  }

  rows.push(...items.map(item => `
    <div class="material-row ${item.type === 'folder' ? 'folder' : ''}" data-type="${item.type}" data-title="${item.title}">
      <div class="material-icon">${item.type === 'folder' ? '<i class="fa-solid fa-folder"></i>' : '<i class="fa-solid fa-file-lines"></i>'}</div>
      <div class="material-label">
        <div class="title">${item.title}</div>
        <div class="subtitle">${item.detail || (item.type === 'folder' ? 'Carpeta' : '')}</div>
      </div>
      <div class="material-meta">${item.meta || ''}</div>
    </div>
  `));

  container.innerHTML = rows.join('');

  breadcrumb.querySelectorAll('.crumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      state.materialsPath = state.materialsPath.slice(0, idx + 1);
      renderMaterials();
    });
  });

  container.querySelectorAll('.material-row').forEach(row => {
    const action = row.dataset.action;
    if (action === 'back') {
      row.addEventListener('click', () => {
        if (state.materialsPath.length > 1) {
          state.materialsPath = state.materialsPath.slice(0, -1);
          renderMaterials();
        }
      });
      return;
    }
    const type = row.dataset.type;
    const title = row.dataset.title;
    if (type === 'folder') {
      row.addEventListener('click', () => {
        state.materialsPath = [...state.materialsPath, title];
        renderMaterials();
      });
    }
  });
}

function setupMaterialsFab() {
  const fab = document.getElementById('materialsFab');
  const menu = document.getElementById('materialsMenu');
  if (!fab || !menu) return;

  const closeMenu = () => {
    menu.classList.add('d-none');
    fab.setAttribute('aria-expanded', 'false');
  };

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('d-none');
    const expanded = !menu.classList.contains('d-none');
    fab.setAttribute('aria-expanded', String(expanded));
  });

  menu.querySelectorAll('.fab-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    const isInside = menu.contains(e.target) || fab.contains(e.target);
    if (!isInside) {
      closeMenu();
    }
  });
}

function setupMaterialsFab() {
  const fab = document.getElementById('materialsFab');
  const menu = document.getElementById('materialsMenu');
  if (!fab || !menu) return;

  const closeMenu = () => {
    menu.classList.add('d-none');
    fab.setAttribute('aria-expanded', 'false');
  };

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('d-none');
    const expanded = !menu.classList.contains('d-none');
    fab.setAttribute('aria-expanded', String(expanded));
  });

  menu.querySelectorAll('.fab-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    const isInside = menu.contains(e.target) || fab.contains(e.target);
    if (!isInside) {
      closeMenu();
    }
  });
}

function renderClasses() {
  const carousel = document.getElementById('upcomingClasses');
  if (!carousel) return;
  carousel.innerHTML = upcomingClasses.map(cls => `
    <div class="class-card">
      <h4>${cls.subject}</h4>
      <div class="fw-semibold">${cls.date}</div>
      <div class="fw-semibold">${cls.time}</div>
      <div class="d-flex justify-content-center gap-2">
        <button class="btn btn-primary reserve-class" data-subject="${cls.subject}" data-date="${cls.date}" data-time="${cls.time}">RESERVAR</button>
      </div>
    </div>
  `).join('');

  const addClassEvent = (button) => {
    const { subject, date, time } = button.dataset;
    const iso = parseClassDate(date);
    if (!iso) return;
    if (!calendarEvents[iso]) calendarEvents[iso] = [];
    calendarEvents[iso].push({ subject, time, color: getEventColor({ subject }) });
    const eventDate = new Date(iso);
    state.currentMonth = eventDate.getMonth();
    state.currentYear = eventDate.getFullYear();
    state.selectedDate = iso;
    state.currentSection = 'calendario';
    updateNavigation();
    renderCalendar();
    renderDayEvents();
  };

  carousel.querySelectorAll('.reserve-class').forEach(button => {
    button.addEventListener('click', () => {
      const { subject, date, time } = button.dataset;
      const message = `¿Confirmas la reserva de la clase de refuerzo de ${subject} el ${date} a las ${time}?`;
      if (!window.confirm(message)) return;
      addClassEvent(button);
    });
  });

  const recorded = document.getElementById('recordedClasses');
  if (!recorded) return;
  recorded.innerHTML = recordedClasses.map(cls => `
    <div class="recorded-item">
      <div class="title"><i class="fa-solid fa-video me-2"></i>${cls.subject}</div>
      <div class="recorded-actions">
        <button class="btn btn-outline-primary btn-sm view-video" data-subject="${cls.subject}">Video</button>
        <i class="fa-solid fa-chevron-down text-muted"></i>
      </div>
    </div>
  `).join('');

  recorded.querySelectorAll('.view-video').forEach(button => {
    button.addEventListener('click', () => {
      state.materialsPath = ['Materiales', 'Recursos Adicionales', 'Videos', button.dataset.subject];
      state.currentSection = 'materiales';
      updateNavigation();
      renderMaterials();
    });
  });
}

function renderStore() {
  const pills = document.getElementById('categoryPills');
  if (!pills) return;
  pills.innerHTML = storeCategories.map(cat => `
    <button class="category-btn ${state.storeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.label}</button>
  `).join('');

  const filtered = products.filter(p => state.storeCategory === 'todo' || p.category === state.storeCategory);
  const grid = document.getElementById('tiendaGrid');
  if (!grid) return;
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-thumb">
        <span class="product-category">${getCategoryLabel(p.category)}</span>
        <i class="fa-regular fa-image"></i>
      </div>
      <div class="fw-semibold">${p.name}</div>
      <div class="text-muted">${formatCurrency(p.price)}</div>
      <div class="product-actions">
        <div class="d-flex justify-content-between align-items-center gap-2">
          <div class="qty-field">
            <input type="number" min="1" value="1" class="form-control form-control-sm qty-input" data-id="${p.id}">
          </div>
          <button class="btn btn-primary btn-sm add-to-cart" data-id="${p.id}">Añadir</button>
        </div>
      </div>
    </div>
  `).join('');

  pills.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.storeCategory = btn.dataset.cat;
      renderStore();
    });
  });

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const qtyInput = card?.querySelector('.qty-input');
      const qty = Math.max(1, Number(qtyInput?.value) || 1);
      addToCart(btn.dataset.id, qty);
      if (qtyInput) qtyInput.value = '1';
    });
  });

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const product = products.find(p => p.id === card.dataset.id);
      state.selectedProduct = product;
      renderProductDetail();
    });
  });

  grid.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('click', (e) => e.stopPropagation());
    input.addEventListener('change', () => {
      input.value = String(Math.max(1, Number(input.value) || 1));
    });
  });
}

function renderProductDetail() {
  const detail = document.getElementById('productDetail');
  if (!detail) return;
  const product = state.selectedProduct;
  if (!product) {
    detail.classList.add('d-none');
    return;
  }
  const galleryItems = Array.from({ length: product.gallery }, (_, i) => `<div class="placeholder">Imagen ${i + 1}</div>`).join('');
  detail.innerHTML = `
    <div class="product-gallery">
      ${galleryItems}
    </div>
    <div class="product-info">
      <button class="icon-btn mb-3" id="closeDetail"><i class="fa-solid fa-arrow-left"></i><span class="icon-text">Atras</span></button>
      <h2>${product.name}</h2>
      <p class="text-muted">Precio: ${formatCurrency(product.price)}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <div class="d-flex flex-column gap-2 mb-3">
        <label class="fw-semibold text-primary">Cantidad</label>
        <input type="number" class="form-control w-auto" id="detailQty" value="1" min="1" aria-label="Cantidad a añadir">
        <div class="d-flex gap-2">
          <button class="btn btn-primary" id="addFromDetail" data-id="${product.id}">Añadir al Carrito</button>
          <button class="btn btn-outline-secondary" id="viewCartFromDetail">Ver carrito</button>
        </div>
      </div>
    </div>
  `;
  detail.classList.remove('d-none');
  document.getElementById('closeDetail').addEventListener('click', () => {
    state.selectedProduct = null;
    renderProductDetail();
  });
  document.getElementById('addFromDetail').addEventListener('click', (e) => {
    const qtyInput = document.getElementById('detailQty');
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    addToCart(e.target.dataset.id, qty);
  });
  document.getElementById('viewCartFromDetail').addEventListener('click', () => {
    setStoreTab('cart');
  });
}

function calculateCartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = findProduct(item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);
}

function addToCart(productId, quantity = 1) {
  const product = findProduct(productId);
  if (!product) return;
  const existing = state.cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ productId, quantity });
  }
  renderCart();
  renderCheckout();
  showCartNotice(product.name, quantity);
}

let cartNoticeTimeout;

function showCartNotice(productName, quantity) {
  const notice = document.getElementById('cartNotice');
  if (!notice) return;
  const suffix = quantity === 1 ? 'unidad' : 'unidades';
  notice.innerHTML = `<i class="fa-solid fa-circle-check text-primary"></i> Añadido: ${productName} (${quantity} ${suffix}).`;
  notice.classList.remove('d-none');
  if (cartNoticeTimeout) window.clearTimeout(cartNoticeTimeout);
  cartNoticeTimeout = window.setTimeout(() => {
    notice.classList.add('d-none');
  }, 2600);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const countChip = document.getElementById('cartCountChip');
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countChip) countChip.textContent = `${totalItems} artículos`;
  if (!container || !footer) return;
  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-muted">
        Todavía no has añadido productos. Explora la tienda y agrégalos al carrito.
      </div>
    `;
    footer.innerHTML = `
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" id="backToCatalog">Volver al catálogo</button>
      </div>
    `;
  } else {
    container.innerHTML = state.cart.map(item => {
      const product = findProduct(item.productId);
      if (!product) return '';
      return `
        <div class="cart-item" data-id="${item.productId}">
          <div>
            <div class="title">${product.name}</div>
            <div class="cart-meta">${getCategoryLabel(product.category)} · ${formatCurrency(product.price)}</div>
          </div>
          <div class="d-flex align-items-center gap-3 flex-wrap justify-content-end">
            <div class="qty-control" data-id="${item.productId}">
              <button class="decrease" data-id="${item.productId}" aria-label="Disminuir cantidad">-</button>
              <span>${item.quantity} ud.</span>
              <button class="increase" data-id="${item.productId}" aria-label="Aumentar cantidad">+</button>
            </div>
            <div class="fw-bold">${formatCurrency(product.price * item.quantity)}</div>
            <button class="icon-btn remove-item" data-id="${item.productId}" title="Eliminar del carrito">🗑</button>
          </div>
        </div>
      `;
    }).join('');

    const total = calculateCartTotal();
    footer.innerHTML = `
      <div>
        <div class="text-muted">Importe estimado</div>
        <div class="total-amount">${formatCurrency(total)}</div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" id="continueShopping">Seguir comprando</button>
        <button class="btn btn-primary" id="goToPayment">Ir a pago</button>
      </div>
    `;
  }

  container.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = state.cart.find(i => i.productId === btn.dataset.id);
      if (!item) return;
      item.quantity += 1;
      renderCart();
      renderCheckout();
    });
  });

  container.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = state.cart.find(i => i.productId === btn.dataset.id);
      if (!item) return;
      item.quantity = Math.max(1, item.quantity - 1);
      renderCart();
      renderCheckout();
    });
  });

  container.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cart = state.cart.filter(i => i.productId !== btn.dataset.id);
      renderCart();
      renderCheckout();
    });
  });

  const backBtn = document.getElementById('backToCatalog');
  if (backBtn) backBtn.addEventListener('click', () => setStoreTab('catalog'));

  const continueBtn = document.getElementById('continueShopping');
  if (continueBtn) continueBtn.addEventListener('click', () => setStoreTab('catalog'));

  const goPaymentBtn = document.getElementById('goToPayment');
  if (goPaymentBtn) goPaymentBtn.addEventListener('click', () => {
    state.checkoutStep = 1;
    setStoreTab('payment');
  });
}

function renderCheckout() {
  const panel = document.getElementById('checkoutPanel');
  if (!panel) return;
  if (state.cart.length === 0) {
    panel.innerHTML = `
      <div class="checkout-panel">
        <p class="text-muted mb-2">No hay productos en el carrito.</p>
        <button class="btn btn-primary" id="checkoutBackToCatalog">Volver a la tienda</button>
      </div>
    `;
    const backBtn = document.getElementById('checkoutBackToCatalog');
    if (backBtn) backBtn.addEventListener('click', () => setStoreTab('catalog'));
    return;
  }

  const total = calculateCartTotal();
  const steps = [
    { id: 1, label: '1.CONFIRMACIÓN SELECCIÓN' },
    { id: 2, label: '2.SELECCIÓN MÉTODO DE PAGO' },
    { id: 3, label: '3.VALIDACIÓN TRANSACCIÓN' },
  ];

  const stepper = `
    <div class="payment-steps">
      ${steps.map(step => `
        <div class="step-pill ${state.checkoutStep === step.id ? 'active' : state.checkoutStep > step.id ? 'completed' : ''}">
          ${step.label}
        </div>
      `).join('')}
    </div>
  `;

  let content = '';

  if (state.checkoutStep === 1) {
    content = `
      <div class="checkout-grid">
        <div class="order-box">
          <h4 class="section-title mb-3">Resumen de tu pedido</h4>
          ${state.cart.map(item => {
            const product = findProduct(item.productId);
            if (!product) return '';
            return `
              <div class="order-line">
                <div class="name">${product.name}</div>
                <div class="fw-semibold text-center">x${item.quantity}</div>
                <div class="fw-semibold text-end">${formatCurrency(product.price * item.quantity)}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="summary-box">
          <div class="text-uppercase">Importe a pagar</div>
          <div class="summary-amount">${formatCurrency(total)}</div>
          <div class="small fw-semibold">Se aceptan pagos en:</div>
          <div class="d-flex flex-wrap gap-2">
            <span class="badge text-bg-light text-primary">PayPal</span>
            <span class="badge text-bg-light text-primary">Mastercard</span>
            <span class="badge text-bg-light text-primary">VISA</span>
            <span class="badge text-bg-light text-primary">G Pay</span>
          </div>
        </div>
      </div>
      <div class="checkout-actions">
        <button class="btn btn-outline-primary" data-action="back-cart">Atrás</button>
        <button class="btn btn-primary" data-action="next-step">Siguiente</button>
      </div>
    `;
  } else if (state.checkoutStep === 2) {
    content = `
      <div class="checkout-grid">
        <div class="order-box">
          <h4 class="section-title mb-3">Datos de pago</h4>
          <div class="mb-3">
            <label class="form-label fw-semibold">Nombre del titular</label>
            <input type="text" class="form-control" value="PABLO RODRÍGUEZ MARÍN">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Número de tarjeta de crédito/débito</label>
            <input type="text" class="form-control" value="5321 6583 8753 0293">
          </div>
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label fw-semibold">Número CVV</label>
              <input type="text" class="form-control" value="999">
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold">Fecha de expiración</label>
              <input type="text" class="form-control" value="07/32">
            </div>
          </div>
        </div>
        <div class="order-box">
          <h4 class="section-title mb-3">Selección método de pago</h4>
          <div class="payment-methods">
            <button class="method-btn ${state.paymentMethod === 'gpay' ? 'active' : ''}" data-method="gpay">G Pay</button>
            <button class="method-btn ${state.paymentMethod === 'tarjeta' ? 'active' : ''}" data-method="tarjeta">Tarjeta (Mastercard / VISA)</button>
            <button class="method-btn ${state.paymentMethod === 'paypal' ? 'active' : ''}" data-method="paypal">PayPal</button>
          </div>
          <div class="mt-3 fw-bold">Importe a pagar: ${formatCurrency(total)}</div>
        </div>
      </div>
      <div class="checkout-actions">
        <button class="btn btn-outline-primary" data-action="prev-step">Atrás</button>
        <button class="btn btn-primary" data-action="complete-payment">Pagar</button>
      </div>
    `;
  } else {
    content = `
      <div class="payment-success">
        <div class="icon"><i class="fa-solid fa-check"></i></div>
        <h3 class="text-center text-success">EL PAGO HA SIDO REALIZADO CORRECTAMENTE</h3>
        <button class="btn btn-primary" data-action="finish">Finalizar</button>
      </div>
    `;
  }

  panel.innerHTML = `<div class="checkout-panel">${stepper}${content}</div>`;

  panel.querySelectorAll('[data-action="next-step"]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.checkoutStep = 2;
      renderCheckout();
    });
  });

  panel.querySelectorAll('[data-action="prev-step"]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.checkoutStep = 1;
      renderCheckout();
    });
  });

  panel.querySelectorAll('[data-action="back-cart"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setStoreTab('cart');
      state.checkoutStep = 1;
      renderCheckout();
    });
  });

  panel.querySelectorAll('[data-action="complete-payment"]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.checkoutStep = 3;
      renderCheckout();
    });
  });

  panel.querySelectorAll('[data-action="finish"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setStoreTab('catalog');
      state.checkoutStep = 1;
    });
  });

  panel.querySelectorAll('.method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.paymentMethod = btn.dataset.method;
      renderCheckout();
    });
  });
}

function setStoreTab(tab) {
  state.storeTab = tab;
  document.querySelectorAll('.store-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.store-tab').forEach(tabContent => {
    const id = tabContent.id.replace('Tab', '');
    tabContent.classList.toggle('d-none', id !== tab);
  });

  if (tab === 'cart') renderCart();
  if (tab === 'payment') renderCheckout();
}

function setupStoreTabs() {
  const openCartBtn = document.getElementById('openCartFromCatalog');
  if (openCartBtn) openCartBtn.addEventListener('click', () => setStoreTab('cart'));
}

function renderConversations() {
  const container = document.getElementById('conversationList');
  if (!container) return;
  const list = conversations[state.currentRole];
  container.innerHTML = list.map(c => `
    <div class="conversation-item" data-id="${c.id}">
      <div class="avatar-sm">${c.name[0]}</div>
      <div>
        <div class="fw-semibold">${c.name}</div>
        <div class="text-muted small">${c.preview}</div>
      </div>
      <div class="text-muted small text-end">${c.time}</div>
    </div>
  `).join('');

  if (!state.conversations.active || !list.find(c => c.id === state.conversations.active.id)) {
    state.conversations.active = list[0];
  }

  container.querySelectorAll('.conversation-item').forEach(item => {
    item.addEventListener('click', () => {
      container.querySelectorAll('.conversation-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      const convo = list.find(c => c.id === item.dataset.id);
      state.conversations.active = convo;
      renderChat();
    });
  });

  const activeEl = Array.from(container.querySelectorAll('.conversation-item')).find(el => el.dataset.id === state.conversations.active?.id);
  if (activeEl) activeEl.classList.add('active');
}

function renderChat() {
  const chatTitle = document.getElementById('chatTitle');
  const chatBody = document.getElementById('chatBody');
  if (!chatTitle || !chatBody) return;
  const convo = state.conversations.active;
  if (!convo) {
    chatTitle.textContent = 'Selecciona una conversación';
    chatBody.innerHTML = '<div class="text-muted">No hay mensajes seleccionados.</div>';
    return;
  }
  chatTitle.textContent = convo.name;
  chatBody.innerHTML = '';
  convo.messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message ' + (msg.from === 'me' ? 'me' : '');
    div.textContent = msg.text;
    chatBody.appendChild(div);
  });
  if (convo.attachment) {
    const attachment = document.createElement('div');
    attachment.className = 'attachment';
    attachment.textContent = convo.attachment;
    chatBody.appendChild(attachment);
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setupMessageInput() {
  const input = document.getElementById('messageInput');
  const send = document.getElementById('sendMessage');
  if (!input || !send) return;
  const sendHandler = () => {
    if (!state.conversations.active || !input.value.trim()) return;
    state.conversations.active.messages.push({ from: 'me', text: input.value.trim() });
    input.value = '';
    renderChat();
  };
  send.addEventListener('click', sendHandler);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendHandler();
    }
  });
}

function initCommTabs() {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentRole = btn.dataset.role;
      state.conversations.active = null;
      renderConversations();
      renderChat();
    });
  });
}

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setSidebarOpen(!document.body.classList.contains(sidebarToggleClass));
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => setSidebarOpen(false));
  }
  window.addEventListener('resize', () => {
    if (!isNarrowScreen()) {
      setSidebarOpen(false);
    }
  });
}

function init() {
  renderNews();
  renderNotifications();
  setupNavigation();
  setupSidebarToggle();
  fillSelectOptions();
  renderCalendar();
  renderMaterials();
  setupMaterialsFab();
  renderClasses();
  renderStore();
  renderProductDetail();
  renderCart();
  renderCheckout();
  setupStoreTabs();
  setStoreTab(state.storeTab);
  state.conversations = { ...state.conversations, ...conversations };
  renderConversations();
  initCommTabs();
  renderChat();
  setupMessageInput();
  handleAddEvent();
  window.addEventListener('resize', () => {
    if (state.selectedDate) positionCalendarEvents();
  });
}

document.addEventListener('DOMContentLoaded', init);
