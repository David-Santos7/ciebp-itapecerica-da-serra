export function initMenu() {
    const btnMobile = document.getElementById('btn-mobile-menu');
    const menu = document.getElementById('mobile-menu');

    // Log de erro focado em depuração para auxiliar se uma view for modificada por acidente
    if (!btnMobile) console.warn("⚠️ ERRO: Botão Hamburger (btn-mobile-menu) não encontrado no DOM!");
    if (!menu) console.warn("⚠️ ERRO: Dropdown do Menu (mobile-menu) não encontrado no DOM!");

    if (!btnMobile || !menu) return; // Break antecipado se os IDs não existirem

    const toggleMenu = (event) => {
        event.preventDefault();
        event.stopPropagation(); // Evita que o evento propague e ative o event listener do `document` instantaneamente
        
        menu.classList.toggle('hidden');
        
        const isExpanded = !menu.classList.contains('hidden');
        btnMobile.setAttribute('aria-expanded', isExpanded.toString());
        
        console.log("Hamburger clicado! Menu visível?", isExpanded);
    };

    // Clique no botão
    btnMobile.addEventListener('click', toggleMenu);

    // Fechar ao clicar fora da área
    document.addEventListener('click', (event) => {
        if (!menu.classList.contains('hidden')) {
            const isClickInside = menu.contains(event.target) || btnMobile.contains(event.target);
            if (!isClickInside) {
                menu.classList.add('hidden');
                btnMobile.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Acessibilidade avançada: Tecla ESC para fechar
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            btnMobile.setAttribute('aria-expanded', 'false');
            btnMobile.focus(); // Retorna o foco ao gatilho para usuários de teclado
        }
    });
}