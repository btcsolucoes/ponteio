const body = document.body;
const tabs = Array.from(document.querySelectorAll('.tab-dock [role="tab"]'));
const panels = Array.from(document.querySelectorAll('.tab-panels > [role="tabpanel"]'));
const subTabs = Array.from(document.querySelectorAll('.subtab'));
const subPanels = Array.from(document.querySelectorAll('.subpanel'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.menu-item img, .photo-grid img, .cover-media img').forEach((img) => {
  img.loading = 'lazy';
  img.decoding = 'async';
});

const activateScopedTab = (tab, tabList, panelList) => {
  const target = tab.dataset.target;

  tabList.forEach((item) => {
    item.classList.toggle('is-active', item === tab);
  });

  panelList.forEach((panel) => {
    const isTarget = panel.id === target;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });
};

const activatePrimaryTab = (tab) => {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });

  panels.forEach((panel) => {
    const active = panel.id === tab.getAttribute('aria-controls');
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });

  body.dataset.theme = tab.dataset.theme || 'rodizio';

  tab.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'center'
  });
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activatePrimaryTab(tab));
});

subTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateScopedTab(tab, subTabs, subPanels));
});
