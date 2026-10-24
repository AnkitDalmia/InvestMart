(() => {
  const toggle = document.querySelector('.home-menu-toggle');
  const menu = document.querySelector('#mobile-navigation');

  document.querySelectorAll('.process-step').forEach((step) => {
    const title = step.querySelector('h4')?.textContent.trim() || 'Process step';
    step.setAttribute('role', 'button');
    step.setAttribute('tabindex', '0');
    step.setAttribute('aria-expanded', 'false');
    step.setAttribute('aria-label', `Show details for ${title}`);

    const toggleStep = () => {
      const willOpen = !step.classList.contains('is-expanded');
      document.querySelectorAll('.process-step.is-expanded').forEach((openStep) => {
        openStep.classList.remove('is-expanded');
        openStep.setAttribute('aria-expanded', 'false');
        openStep.setAttribute('aria-label', `Show details for ${openStep.querySelector('h4')?.textContent.trim() || 'process step'}`);
      });
      if (willOpen) {
        step.classList.add('is-expanded');
        step.setAttribute('aria-expanded', 'true');
        step.setAttribute('aria-label', `Hide details for ${title}`);
      }
    };

    step.addEventListener('click', toggleStep);
    step.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleStep();
      }
    });
  });

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