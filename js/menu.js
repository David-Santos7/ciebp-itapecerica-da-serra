export function initMenu() {
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!btnMobileMenu || !mobileMenu) {
    console.error('Erro: Elementos do menu mobile não encontrados no DOM.');
    return;
  }

  btnMobileMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    const isExpanded = btnMobileMenu.getAttribute('aria-expanded') === 'true';
    btnMobileMenu.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !btnMobileMenu.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      btnMobileMenu.setAttribute('aria-expanded', 'false');
    }
  });
}
