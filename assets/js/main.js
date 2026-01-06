const defaultDate = new Date(2026, 8, 3);
const state = {
  currentSection: 'inicio',
  currentRole: 'profesores',
  currentMonth: defaultDate.getMonth(),
  currentYear: defaultDate.getFullYear(),
  selectedDate: '2026-09-03',
  editingEventIndex: null,
  storeCategory: 'papeleria',
  selectedProduct: null,
  conversations: {},
};

const newsItems = [
  {
    title: 'Ya puedes descargar el modelo actualizado de examen de Matemáticas II para la prueba de EBAU.',
    author: 'Dpto. de Matemáticas',
    time: 'Hace 2 horas',
    image: 'https://img.icons8.com/color/96/abacus.png',
  },
  {
    title: 'La plataforma estará en mantenimiento el sábado de 22:00 a 23:00. Guarda tus progresos antes.\npor: Dpto. de Matemáticas',
    author: 'Mantenimiento',
    time: 'Hace 3 horas',
    image: 'https://img.icons8.com/fluency/96/maintenance.png',
  },
  {
    title: 'Nueva clase de refuerzo de Química (Enlace químico) disponible el jueves a las 17:30.',
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

const calendarEvents = {
  '2026-09-02': [{ subject: 'Valenciano', time: '17:00 - 18:00' }],
  '2026-09-03': [
    { subject: 'Cast', time: '17:00 - 18:00' },
    { subject: 'Mat', time: '18:00 - 19:00' },
  ],
  '2026-09-07': [
    { subject: 'Cast', time: '' },
    { subject: 'In', time: '' },
  ],
  '2026-09-08': [{ subject: 'Inglés', time: '10:00 - 11:00' }],
  '2026-09-10': [{ subject: 'Mates', time: '19:00 - 20:00' }],
  '2026-09-15': [
    { subject: 'Cast', time: '' },
    { subject: 'In', time: '' },
    { subject: 'Mat', time: '' },
  ],
};

const materials = [
  { title: 'Enunciados', level: 0, checked: false, bold: true },
  { title: 'Más Exámenes Sintaxis', level: 0, checked: false, bold: true },
  { title: 'Anexos', level: 0, checked: false, bold: true },
  { title: 'Examen Sintaxis 1', level: 1, checked: true },
  { title: 'Examen Sintaxis 2', level: 1, checked: true },
  { title: 'Examen Sintaxis 3', level: 1, checked: true },
  { title: 'Examen Sintaxis 4', level: 1, checked: true },
  { title: 'Examen Sintaxis 1 (Resuelto)', level: 1, checked: true },
  { title: 'Examen Sintaxis 2 (Resuelto)', level: 1, checked: true },
  { title: 'Examen Sintaxis 3 (Resuelto)', level: 1, checked: true },
  { title: 'Examen Sintaxis 4 (Resuelto)', level: 1, checked: true },
  { title: 'Bibliografía', level: 0, checked: true },
  { title: 'Nueva Carp', level: 0, checked: false, bold: true },
];

const upcomingClasses = [
  { subject: 'Matemáticas', date: '02/11/2025', time: '16:00 - 17:00' },
  { subject: 'Valenciano', date: '03/11/2025', time: '18:00 - 19:00' },
  { subject: 'Biología', date: '04/11/2025', time: '15:00 - 16:00' },
];

const recordedClasses = ['Matemáticas', 'Química', 'Física'];

const storeCategories = [
  { id: 'libros', label: 'Libros' },
  { id: 'papeleria', label: 'Papelería' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'preparacion', label: 'Preparación Exámenes' },
];

const products = [
  { id: 'bolis', name: 'Pack Bolígrafos', price: '4,50$', category: 'papeleria', description: 'Pack de bolígrafos de color azul, negro, rojo y verde.', gallery: 3 },
  { id: 'tipex', name: 'Tipex', price: '2,00$', category: 'papeleria', description: 'Cinta correctora.', gallery: 2 },
  { id: 'hojas', name: 'Pack Hojas A4', price: '5,00$', category: 'papeleria', description: 'Paquete de hojas tamaño A4.', gallery: 2 },
  { id: 'lapices', name: 'Pack Lápices', price: '3,00$', category: 'papeleria', description: 'Pack de lápices estándar.', gallery: 2 },
  { id: 'compas', name: 'Compás', price: '7,00$', category: 'papeleria', description: 'Compás de precisión.', gallery: 2 },
  { id: 'boligrafo-negro', name: 'Bolígrafo Negro', price: '1,00$', category: 'papeleria', description: 'Bolígrafo tinta negra.', gallery: 2 },
  { id: 'boligrafo-azul', name: 'Bolígrafo Azul', price: '1,00$', category: 'papeleria', description: 'Bolígrafo tinta azul.', gallery: 2 },
  { id: 'subrayadores', name: 'Pack Subrayadores', price: '5,00$', category: 'papeleria', description: 'Subrayadores de colores pastel.', gallery: 2 },
  { id: 'rotuladores', name: 'Pack Rotuladores', price: '5,00$', category: 'papeleria', description: 'Rotuladores de punta fina.', gallery: 2 },
];

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
  container.innerHTML = newsItems.map(item => `
    <div class="news-card">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <div class="news-title">${item.title}</div>
        <div class="news-meta">${item.time} · Publicado por: ${item.author}</div>
        <a class="news-link" href="#">Leer más</a>
      </div>
    </div>
  `).join('');
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
      state.currentSection = btn.dataset.section;
      updateNavigation();
    });
  });
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
    const iso = date.toISOString().split('T')[0];
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day ' + (isCurrentMonth ? '' : 'inactive');
    if (state.selectedDate === iso) dayEl.classList.add('selected');
    if (iso === new Date().toISOString().split('T')[0]) dayEl.classList.add('today');
    dayEl.innerHTML = `
      <div class="day-number">${isCurrentMonth ? dayNumber : ''}</div>
      <div class="day-events">${(calendarEvents[iso] || []).map(ev => {
        const color = eventColors[ev.subject] || eventColors.Mates;
        const label = ev.subject ? 'labelled' : '';
        const text = ev.subject || '';
        const time = ev.time ? `<span class="event-time">${ev.time}</span>` : '';
        return `<span class="event-pill ${label}" style="--event-color:${color};" title="${text}${ev.time ? ` · ${ev.time}` : ''}"><span class="event-name">${text}</span>${time}</span>`;
      }).join('')}</div>
    `;
    if (isCurrentMonth) {
      dayEl.addEventListener('click', () => {
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
  if (!container) return;
  const dayEvents = calendarEvents[state.selectedDate] || [];
  if (!state.selectedDate) {
    container.innerHTML = '<div class="text-muted">Selecciona un día para ver eventos.</div>';
    return;
  }
  if (dayEvents.length === 0) {
    container.innerHTML = '<div class="text-muted">No hay eventos para esta fecha.</div>';
    return;
  }
  container.innerHTML = dayEvents.map((ev, idx) => `
    <div class="event-card" style="border-left-color:${eventColors[ev.subject] || eventColors.Mates}" data-index="${idx}">
      <i class="fa-regular fa-calendar" style="color:${eventColors[ev.subject] || eventColors.Mates}"></i>
      <div>
        <p class="event-title">Clase de ${ev.subject}</p>
        <small>${formatDate(state.selectedDate)} · ${ev.time || 'Horario por confirmar'}</small>
      </div>
      <button class="icon-btn ms-auto edit-event-btn" data-index="${idx}" title="Editar evento">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.edit-event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      const selectedEvents = calendarEvents[state.selectedDate] || [];
      const eventData = selectedEvents[index];
      if (!eventData) return;
      toggleEventForm(true, { mode: 'edit', eventIndex: index, eventData });
    });
  });
}

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
}

function toggleEventForm(show, options = {}) {
  const overlay = document.getElementById('eventFormOverlay');
  const dateLabel = document.getElementById('eventFormDate');
  const subjectInput = document.getElementById('eventSubject');
  const timeInput = document.getElementById('eventTime');
  const submitBtn = document.getElementById('eventFormSubmit');
  if (!overlay || !dateLabel || !subjectInput || !timeInput || !submitBtn) return;
  if (show) {
    const { mode = 'add', eventIndex = null, eventData = {} } = options;
    state.editingEventIndex = mode === 'edit' ? eventIndex : null;
    overlay.classList.remove('d-none');
    dateLabel.textContent = state.selectedDate ? formatDate(state.selectedDate) : 'Selecciona una fecha';
    subjectInput.value = eventData.subject || '';
    timeInput.value = eventData.time || '';
    submitBtn.textContent = mode === 'edit' ? 'Guardar cambios' : 'Añadir';
    overlay.dataset.mode = mode;
    subjectInput.focus();
  } else {
    overlay.classList.add('d-none');
    overlay.dataset.mode = '';
    state.editingEventIndex = null;
    submitBtn.textContent = 'Añadir';
  }
}

function handleAddEvent() {
  const addBtn = document.getElementById('addEventBtn');
  const form = document.getElementById('eventForm');
  const cancelBtn = document.getElementById('cancelEvent');
  const closeBtn = document.getElementById('closeEventForm');
  const overlay = document.getElementById('eventFormOverlay');
  if (!addBtn || !form || !cancelBtn || !closeBtn || !overlay) return;

  addBtn.addEventListener('click', () => {
    if (!state.selectedDate) {
      const todayIso = new Date().toISOString().split('T')[0];
      state.selectedDate = todayIso;
      renderCalendar();
    }
    toggleEventForm(true, { mode: 'add' });
  });

  const closeForm = () => toggleEventForm(false);
  cancelBtn.addEventListener('click', closeForm);
  closeBtn.addEventListener('click', closeForm);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.selectedDate) return;
    const subject = document.getElementById('eventSubject').value.trim() || 'Nuevo evento';
    const time = document.getElementById('eventTime').value.trim();
    const iso = state.selectedDate;
    if (!calendarEvents[iso]) calendarEvents[iso] = [];
    const isEditMode = overlay.dataset.mode === 'edit' && state.editingEventIndex !== null;
    if (isEditMode && calendarEvents[iso][state.editingEventIndex]) {
      calendarEvents[iso][state.editingEventIndex] = { subject, time };
    } else {
      calendarEvents[iso].push({ subject, time });
    }
    toggleEventForm(false);
    renderCalendar();
    renderDayEvents();
  });
}

function renderMaterials() {
  const container = document.getElementById('materialsList');
  if (!container) return;
  container.innerHTML = materials.map(item => `
    <div class="material-item" style="margin-left:${item.level * 16}px">
      <div class="label ${item.bold ? 'fw-bold' : ''}">
        <span class="bullet"></span>
        ${item.title}
      </div>
      <input type="checkbox" ${item.checked ? 'checked' : ''}>
    </div>
  `).join('');
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
        <button class="btn btn-primary">RESERVAR</button>
        <button class="btn btn-outline-primary rounded-circle"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  `).join('');

  const recorded = document.getElementById('recordedClasses');
  if (!recorded) return;
  recorded.innerHTML = recordedClasses.map(cls => `
    <div class="recorded-item">
      <div class="title"><i class="fa-solid fa-video me-2"></i>${cls}</div>
      <i class="fa-solid fa-chevron-down text-muted"></i>
    </div>
  `).join('');
}

function renderStore() {
  const pills = document.getElementById('categoryPills');
  if (!pills) return;
  pills.innerHTML = storeCategories.map(cat => `
    <button class="category-btn ${state.storeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.label}</button>
  `).join('');

  const filtered = products.filter(p => state.storeCategory === 'all' || p.category === state.storeCategory);
  const grid = document.getElementById('tiendaGrid');
  if (!grid) return;
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-thumb"><i class="fa-regular fa-image"></i></div>
      <div class="fw-semibold">${p.name}</div>
      <div class="text-muted">${p.price}</div>
    </div>
  `).join('');

  pills.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.storeCategory = btn.dataset.cat;
      renderStore();
    });
  });

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const product = products.find(p => p.id === card.dataset.id);
      state.selectedProduct = product;
      renderProductDetail();
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
      <button class="icon-btn mb-3" id="closeDetail"><i class="fa-solid fa-arrow-left"></i></button>
      <h2>${product.name}</h2>
      <p class="text-muted">precio: ${product.price}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <div class="d-flex gap-2 align-items-center mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button">1 unidad</button>
        <button class="btn btn-primary">Añadir al Carrito</button>
      </div>
    </div>
  `;
  detail.classList.remove('d-none');
  document.getElementById('closeDetail').addEventListener('click', () => {
    state.selectedProduct = null;
    renderProductDetail();
  });
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

function init() {
  renderNews();
  renderNotifications();
  setupNavigation();
  fillSelectOptions();
  renderCalendar();
  renderMaterials();
  renderClasses();
  renderStore();
  renderProductDetail();
  state.conversations = { ...state.conversations, ...conversations };
  renderConversations();
  initCommTabs();
  renderChat();
  setupMessageInput();
  handleAddEvent();
}

document.addEventListener('DOMContentLoaded', init);
