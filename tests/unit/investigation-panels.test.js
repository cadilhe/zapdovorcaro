import { describe, it, expect, vi } from 'vitest';
import { renderPaymentsPanel } from '../../src/components/PaymentsPanel.js';
import { renderFlightsView } from '../../src/components/FlightsView.js';
import { renderMediaPanel } from '../../src/components/MediaPanel.js';

describe('Investigation Panels', () => {
  it('renders PaymentsPanel correctly with rows', () => {
    const mockPayments = [
      {
        id: 1,
        origem: 'Banco Master',
        destinatario: 'Barci de Moraes',
        data: '08/02/2024',
        valor: 'R$ 3.422.268,14',
        destaque: true
      }
    ];

    const panel = renderPaymentsPanel({ paymentsData: mockPayments });
    expect(panel.className).toBe('payments-panel');
    expect(panel.querySelector('.panel-header-title').textContent).toBe('Pagamentos');

    const rows = panel.querySelectorAll('.payment-row');
    expect(rows.length).toBe(1);
    expect(rows[0].querySelector('.td-origem').textContent).toBe('Banco Master');
    expect(rows[0].querySelector('.td-valor').textContent).toBe('R$ 3.422.268,14');
  });

  it('renders FlightsView correctly with flight cards and back button', () => {
    const onBack = vi.fn();
    const mockFlightsData = {
      title: 'Voos e passageiros',
      flights: [
        {
          id: 1,
          date: '16 e 18 mai 2024',
          aircraft: 'Jato particular',
          route: 'Nova York',
          passengers: ['Daniel Vorcaro', 'Ciro Nogueira'],
          notes: 'Nota explicativa da PF'
        }
      ]
    };

    const view = renderFlightsView({ flightsData: mockFlightsData, onBack });
    expect(view.className).toBe('flights-view');
    expect(view.querySelector('.flights-title').textContent).toBe('Voos e passageiros');

    const backBtn = view.querySelector('.flights-back-btn');
    backBtn.click();
    expect(onBack).toHaveBeenCalled();

    const cards = view.querySelectorAll('.flight-card');
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector('.flight-date').textContent).toBe('16 e 18 mai 2024');
    expect(cards[0].querySelectorAll('.flight-passenger-pill').length).toBe(2);
  });

  it('renders MediaPanel with tabs and grid items', () => {
    const mockMedia = {
      title: 'Mídia',
      subtitle: 'Mídias de todas as conversas',
      items: [
        { id: 1, type: 'image', title: 'Foto 1', src: '/assets/og-image.jpg', caption: 'Legenda' }
      ],
      documents: [
        { id: 101, title: 'Documento 1.pdf', size: '1 MB', date: '2026' }
      ],
      links: [
        { id: 201, title: 'Notícia 1', url: 'https://exemplo.com', date: '2026' }
      ]
    };

    const panel = renderMediaPanel({ mediaData: mockMedia });
    expect(panel.className).toBe('media-panel');
    expect(panel.querySelectorAll('.media-tab').length).toBe(3);

    const items = panel.querySelectorAll('.media-grid-item');
    expect(items.length).toBe(1);

    // Switch to documents tab
    const docTab = panel.querySelector('.media-tab[data-tab="documentos"]');
    docTab.click();
    expect(panel.querySelectorAll('.media-doc-item').length).toBe(1);

    // Switch to links tab
    const linkTab = panel.querySelector('.media-tab[data-tab="links"]');
    linkTab.click();
    expect(panel.querySelectorAll('.media-link-item').length).toBe(1);
  });
});
