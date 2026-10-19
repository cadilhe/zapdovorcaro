/**
 * FlightsView — displays flight logs, passenger lists, and private jet routes
 * identified in the police investigation reports.
 * Matches Screenshot 5 from the original MasterZap.
 */

const ICON_ARROW_LEFT = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;
const ICON_PLANE = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;

export function renderFlightsView({ flightsData = {}, onBack, onPassengerClick }) {
  const container = document.createElement('div');
  container.className = 'flights-view';
  container.setAttribute('aria-label', 'Voos e passageiros');

  // Header with back button
  const header = document.createElement('header');
  header.className = 'flights-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'flights-back-btn';
  backBtn.setAttribute('aria-label', 'Voltar');
  backBtn.innerHTML = ICON_ARROW_LEFT;
  if (onBack) backBtn.addEventListener('click', onBack);

  const headerInfo = document.createElement('div');
  headerInfo.className = 'flights-header-info';
  headerInfo.innerHTML = `
    <h1 class="flights-title">${flightsData.title || 'Voos e passageiros'}</h1>
    <p class="flights-subtitle">${flightsData.subtitle || 'Registros reunidos no material fornecido.'}</p>
  `;

  header.appendChild(backBtn);
  header.appendChild(headerInfo);
  container.appendChild(header);

  // Content body
  const body = document.createElement('div');
  body.className = 'flights-body';

  // Section title
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'flights-section-header';
  sectionHeader.innerHTML = `
    <h2 class="flights-section-title">${flightsData.section || 'Voos com Vorcaro indicado a bordo'}</h2>
    <p class="flights-section-subtitle">${flightsData.section_subtitle || 'Trechos em que o material identifica Daniel Vorcaro como passageiro.'}</p>
  `;
  body.appendChild(sectionHeader);

  // Cards grid
  const grid = document.createElement('div');
  grid.className = 'flights-grid';

  const flights = flightsData.flights || [];
  for (const flight of flights) {
    const card = document.createElement('article');
    card.className = 'flight-card';

    // Top metadata row: date + aircraft badge
    const metaRow = document.createElement('div');
    metaRow.className = 'flight-card-meta';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'flight-date';
    dateSpan.textContent = flight.date;

    const aircraftBadge = document.createElement('span');
    aircraftBadge.className = 'flight-aircraft-badge';
    aircraftBadge.textContent = flight.aircraft;

    metaRow.appendChild(dateSpan);
    metaRow.appendChild(aircraftBadge);
    card.appendChild(metaRow);

    // Route row
    const routeRow = document.createElement('div');
    routeRow.className = 'flight-route-row';
    routeRow.innerHTML = `
      <span class="flight-plane-icon">${ICON_PLANE}</span>
      <span class="flight-route-text">${flight.route}</span>
    `;
    card.appendChild(routeRow);

    // Passengers list / tags
    if (flight.passengers && flight.passengers.length > 0) {
      const passRow = document.createElement('div');
      passRow.className = 'flight-passengers-row';

      for (const p of flight.passengers) {
        const pBadge = document.createElement('span');
        pBadge.className = 'flight-passenger-pill';
        pBadge.textContent = p;
        if (onPassengerClick) {
          pBadge.style.cursor = 'pointer';
          pBadge.addEventListener('click', () => onPassengerClick(p));
        }
        passRow.appendChild(pBadge);
      }
      card.appendChild(passRow);
    }

    // Notes
    if (flight.notes) {
      const notesP = document.createElement('p');
      notesP.className = 'flight-notes';
      notesP.textContent = flight.notes;
      card.appendChild(notesP);
    }

    grid.appendChild(card);
  }

  body.appendChild(grid);
  container.appendChild(body);

  return container;
}
