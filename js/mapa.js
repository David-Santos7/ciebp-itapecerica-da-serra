document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('mapModal');
    const btnOpen = document.getElementById('btnOpenMap');
    const btnClose = document.getElementById('btnCloseMap');
    const modalContent = document.getElementById('mapModalContent');

    // 🔒 Validação forte (evita erro silencioso)
    if (!modal || !btnOpen || !btnClose || !modalContent) {
        console.warn('Mapa.js: Elementos do modal não encontrados no DOM.');
        return;
    }

    let isOpen = false;

    // 🎯 Controle de foco (acessibilidade)
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    let firstFocusable = focusableElements[0];
    let lastFocusable = focusableElements[focusableElements.length - 1];

    // 🚀 Abrir modal
    const openModal = () => {
        if (isOpen) return;

        modal.classList.remove('hidden');

        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        });

        document.body.style.overflow = 'hidden'; // trava scroll da página
        isOpen = true;

        // foco no primeiro elemento
        firstFocusable?.focus();
    };

    // ❌ Fechar modal
    const closeModal = () => {
        if (!isOpen) return;

        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);

        document.body.style.overflow = ''; // libera scroll
        isOpen = false;

        // devolve foco ao botão de abertura
        btnOpen.focus();
    };

    // 🖱️ Eventos principais
    btnOpen.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);

    // 🧠 Clique fora do modal (overlay)
    modal.addEventListener('click', (e) => {
        if (!modalContent.contains(e.target)) {
            closeModal();
        }
    });

    // ⌨️ Tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeModal();
        }
    });

    // 🔁 Trap de foco (acessibilidade avançada)
    document.addEventListener('keydown', (e) => {
        if (!isOpen || e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab normal
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });

    // 🖐️ Suporte a arrastar o mapa (melhoria do seu código anterior)
    const slider = document.getElementById('scroll-wrapper');

    if (slider) {
        let isDown = false;
        let startX, startY;
        let scrollLeft, scrollTop;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');

            startX = e.pageX - slider.offsetLeft;
            startY = e.pageY - slider.offsetTop;

            scrollLeft = slider.scrollLeft;
            scrollTop = slider.scrollTop;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;

            e.preventDefault();

            const x = e.pageX - slider.offsetLeft;
            const y = e.pageY - slider.offsetTop;

            slider.scrollLeft = scrollLeft - (x - startX);
            slider.scrollTop = scrollTop - (y - startY);
        });
    }

    // 📱 Suporte a touch (mobile - MUITO importante)
    if (slider) {
        let startX, startY, scrollLeft, scrollTop;

        slider.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.pageX - slider.offsetLeft;
            startY = touch.pageY - slider.offsetTop;

            scrollLeft = slider.scrollLeft;
            scrollTop = slider.scrollTop;
        });

        slider.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];

            const x = touch.pageX - slider.offsetLeft;
            const y = touch.pageY - slider.offsetTop;

            slider.scrollLeft = scrollLeft - (x - startX);
            slider.scrollTop = scrollTop - (y - startY);
        });
    }
});