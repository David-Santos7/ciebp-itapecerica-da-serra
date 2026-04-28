// Funcionalidade do Menu Mobile (Hamburger)
document.addEventListener('DOMContentLoaded', () => {
    const btnMobile = document.getElementById('btn-mobile-menu');
    const menu = document.getElementById('mobile-menu');

    // DEBUG: Isso vai avisar no Console (F12) se faltou algum ID no HTML
    if (!btnMobile) console.error("⚠️ ERRO: Botão Hamburger (btn-mobile-menu) não encontrado no HTML!");
    if (!menu) console.error("⚠️ ERRO: Dropdown do Menu (mobile-menu) não encontrado no HTML!");

    if (btnMobile && menu) {
        btnMobile.addEventListener('click', (event) => {
            // Evita comportamentos indesejados ao clicar
            event.preventDefault(); 
            
            // Alterna o menu
            menu.classList.toggle('hidden');
            
            // DEBUG: Confirma se o clique está funcionando
            console.log("Hamburger clicado! Menu oculto?", menu.classList.contains('hidden'));
        });
    }
});