// Run before styles render; keep this external to preserve the strict script CSP.
(() => {
  let theme;
  try { theme = localStorage.getItem('theme'); } catch { /* Use the system preference. */ }
  const explicit = theme === 'light' || theme === 'dark';
  const dark = explicit ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.add(dark ? 'dark' : 'light');
  document.querySelector('meta[name="color-scheme"]').content = explicit ? theme : 'light dark';
})();
