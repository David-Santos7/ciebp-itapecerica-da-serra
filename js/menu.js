export function initMenu() {
    const btnMobile = document.getElementById('btn-mobile-menu');
    const menu = document.getElementById('mobile-menu');

    // Log de erro focado em depuração para auxiliar se uma view for modificada por acidente
    if (!btnMobile) console.warn("⚠️ ERRO: Botão Hamburger (btn-mobile-menu) não encontrado no DOM!");
    if (!menu) console.warn("⚠️ ERRO: Dropdown do Menu (mobile-menu) não encontrado no DOM!");

    if (!btnMobile || !menu) return; // Break antecipado se os IDs não existirem

    // Estado inicial de acessibilidade
    try {
        btnMobile.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    } catch (err) {
        // silencioso — se falhar aqui, outras proteções já existem
    }

    const toggleMenu = (event) => {
        try {
            if (event && typeof event.preventDefault === 'function') event.preventDefault();
            // Evita que o evento propague e ative o event listener do `document` instantaneamente
            if (event && typeof event.stopPropagation === 'function') event.stopPropagation();

            // Garantia: se por alguma razão o elemento não existir mais, aborta com segurança
            if (!menu || !btnMobile) return;

            menu.classList.toggle('hidden');

            const isExpanded = !menu.classList.contains('hidden');
            btnMobile.setAttribute('aria-expanded', isExpanded.toString());

            // Atualiza atributo aria-hidden para compatibilidade de acessibilidade
            menu.setAttribute('aria-hidden', (!isExpanded).toString());

            console.log('Hamburger ativado. Menu visível?', isExpanded);
        } catch (err) {
            console.error('Erro ao alternar menu mobile:', err);
        }
    };

    // Clique no botão (use apenas um listener para evitar acionamentos duplos)
    btnMobile.addEventListener('click', toggleMenu);

    // Fechar ao clicar fora da área
    document.addEventListener('click', (event) => {
        if (!menu.classList.contains('hidden')) {
            const isClickInside = menu.contains(event.target) || btnMobile.contains(event.target);
            
            // Verifica se o usuário clicou em um link (<a>) dentro do menu
            const clickedLink = event.target.closest && event.target.closest('a');

            if (!isClickInside || clickedLink) {
                menu.classList.add('hidden');
                btnMobile.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
        }
    });

    // Acessibilidade avançada: Tecla ESC para fechar
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            btnMobile.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            btnMobile.focus(); // Retorna o foco ao gatilho para usuários de teclado
        }
    });
}