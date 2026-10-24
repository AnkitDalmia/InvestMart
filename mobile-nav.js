(() => {
  const toggle = document.querySelector('.home-menu-toggle');
  const menu = document.querySelector('#mobile-navigation');

  if (!toggle || !menu) return;

  const setMenuOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.hidden = !open;
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.home-header') && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) setMenuOpen(false);
  });
})();