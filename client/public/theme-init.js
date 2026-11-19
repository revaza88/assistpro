// Run before styles render; keep this external to preserve the strict script CSP.
(() => {
  // One continuous light brand surface, including the original opaque logo bands.
  // Old saved preferences and OS dark mode must not reintroduce a dark page middle.
  document.documentElement.classList.add('light');
  document.querySelector('meta[name="color-scheme"]').content = 'light';
})();
