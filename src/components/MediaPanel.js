/**
 * MediaPanel — aggregates media, documents, and external links cited in the leaks.
 * Renders into the sidebar panel, matching Screenshot 4.
 */

import { ICON_DOCUMENT, ICON_LINK } from '../lib/icons.js';

export function renderMediaPanel({ mediaData = {}, onImageClick }) {
  const panel = document.createElement('section');
  panel.className = 'media-panel';
  panel.setAttribute('aria-label', 'Mídias');

  // Header
  const header = document.createElement('div');
  header.className = 'panel-header media-header';
  header.innerHTML = `
    <h2 class="panel-header-title">${mediaData.title || 'Mídia'}</h2>
    <p class="panel-header-subtitle">${mediaData.subtitle || 'Mídias de todas as conversas'}</p>
  `;
  panel.appendChild(header);

  // Tabs
  const tabsNav = document.createElement('div');
  tabsNav.className = 'media-tabs';
  tabsNav.innerHTML = `
    <button class="media-tab active" data-tab="midias">Mídias</button>
    <button class="media-tab" data-tab="documentos">Documentos</button>
    <button class="media-tab" data-tab="links">Links</button>
  `;
  panel.appendChild(tabsNav);

  // Content area
  const content = document.createElement('div');
  content.className = 'media-content';
  panel.appendChild(content);

  function renderTab(tabKey) {
    content.innerHTML = '';

    if (tabKey === 'midias') {
      const section = document.createElement('div');
      section.className = 'media-section';

      const sectionTitle = document.createElement('div');
      sectionTitle.className = 'media-date-header';
      sectionTitle.textContent = 'Sem data';
      section.appendChild(sectionTitle);

      const grid = document.createElement('div');
      grid.className = 'media-grid';

      const items = mediaData.items || [];
      for (const item of items) {
        const itemEl = document.createElement('div');
        itemEl.className = 'media-grid-item';
        itemEl.setAttribute('role', 'button');
        itemEl.setAttribute('tabindex', '0');
        itemEl.title = item.caption || item.title;

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || item.title;
        img.loading = 'lazy';

        itemEl.appendChild(img);

        if (onImageClick) {
          itemEl.addEventListener('click', () => onImageClick(item));
        }

        grid.appendChild(itemEl);
      }

      section.appendChild(grid);
      content.appendChild(section);
    } else if (tabKey === 'documentos') {
      const list = document.createElement('div');
      list.className = 'media-docs-list';

      const docs = mediaData.documents || [];
      for (const doc of docs) {
        const item = document.createElement('div');
        item.className = 'media-doc-item';
        item.innerHTML = `
          <div class="media-doc-icon">${ICON_DOCUMENT || '📄'}</div>
          <div class="media-doc-info">
            <span class="media-doc-title">${doc.title}</span>
            <span class="media-doc-meta">${doc.size} · ${doc.date}</span>
          </div>
        `;
        list.appendChild(item);
      }

      content.appendChild(list);
    } else if (tabKey === 'links') {
      const list = document.createElement('div');
      list.className = 'media-links-list';

      const links = mediaData.links || [];
      for (const link of links) {
        const item = document.createElement('a');
        item.className = 'media-link-item';
        item.href = link.url;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
        item.innerHTML = `
          <div class="media-link-icon">${ICON_LINK || '🔗'}</div>
          <div class="media-link-info">
            <span class="media-link-title">${link.title}</span>
            <span class="media-link-meta">${link.date}</span>
          </div>
        `;
        list.appendChild(item);
      }

      content.appendChild(list);
    }
  }

  // Bind tabs click
  const tabBtns = tabsNav.querySelectorAll('.media-tab');
  for (const btn of tabBtns) {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderTab(btn.dataset.tab);
    });
  }

  // Initial render
  renderTab('midias');

  return panel;
}
