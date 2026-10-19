/**
 * PaymentsPanel — shows financial records and transactions identified in the investigation.
 * Renders into the sidebar panel, matching the layout from the original MasterZap.
 */

const ICON_CARD = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;

export function renderPaymentsPanel({ paymentsData = [], onSelect }) {
  const panel = document.createElement('section');
  panel.className = 'payments-panel';
  panel.setAttribute('aria-label', 'Pagamentos');

  // Header
  const header = document.createElement('div');
  header.className = 'panel-header payments-header';
  header.innerHTML = `
    <div class="panel-header-top">
      <span class="panel-header-icon payments-header-icon">${ICON_CARD}</span>
      <h2 class="panel-header-title">Pagamentos</h2>
    </div>
    <p class="panel-header-subtitle">Registros financeiros identificados no material.</p>
  `;
  panel.appendChild(header);

  // Table container
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'payments-table-wrapper';

  const table = document.createElement('table');
  table.className = 'payments-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th class="th-origem">Origem</th>
        <th class="th-destinatario">Destinatário</th>
        <th class="th-data">Data</th>
        <th class="th-valor">Valor</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector('tbody');

  for (const item of paymentsData) {
    const tr = document.createElement('tr');
    tr.className = 'payment-row';
    if (item.destaque) tr.classList.add('payment-row--highlight');

    const tdOrigem = document.createElement('td');
    tdOrigem.className = 'td-origem';
    tdOrigem.textContent = item.origem;

    const tdDest = document.createElement('td');
    tdDest.className = 'td-destinatario';
    tdDest.textContent = item.destinatario;

    const tdData = document.createElement('td');
    tdData.className = 'td-data';
    tdData.textContent = item.data;

    const tdValor = document.createElement('td');
    tdValor.className = 'td-valor';
    tdValor.textContent = item.valor;

    tr.appendChild(tdOrigem);
    tr.appendChild(tdDest);
    tr.appendChild(tdData);
    tr.appendChild(tdValor);

    if (onSelect) {
      tr.addEventListener('click', () => onSelect(item));
    }

    tbody.appendChild(tr);
  }

  tableWrapper.appendChild(table);
  panel.appendChild(tableWrapper);

  return panel;
}
