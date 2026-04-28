document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       LÓGICA DO CARROSSEL (Auto-Play + Setas)
    ========================================== */
    const track = document.getElementById('track');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');
    
    if(track) {
        const scrollNext = () => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' }); 
            } else {
                track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
        };

        if(btnNext) btnNext.addEventListener('click', scrollNext);
        if(btnPrev) btnPrev.addEventListener('click', scrollPrev);

        // Auto-Play
        let autoPlayInterval = setInterval(scrollNext, 5000);

        // Pausa se o utilizador interagir
        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => autoPlayInterval = setInterval(scrollNext, 5000));
        track.addEventListener('touchstart', () => clearInterval(autoPlayInterval));
    }

    /* ==========================================
       LÓGICA DO MODAL DE MAPA
    ========================================== */
    const modal = document.getElementById('mapModal');
    const btnOpenMap = document.getElementById('btnOpenMap');
    const btnCloseMap = document.getElementById('btnCloseMap');
    const modalContent = document.getElementById('mapModalContent');

    if(modal && btnOpenMap && btnCloseMap) {
        const openModal = () => {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
        };

        const closeModal = () => {
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        btnOpenMap.addEventListener('click', openModal);
        btnCloseMap.addEventListener('click', closeModal);

        // Fechar ao clicar fora ou Esc
        modal.addEventListener('click', (e) => {
            if (!modalContent.contains(e.target)) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
        });
    }
});