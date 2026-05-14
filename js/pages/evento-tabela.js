/**
 * ==========================================================
 * evento-tabela.js
 * Scroll arrastável (drag-to-scroll) para desktop + mobile
 * Seguro, reutilizável e com melhor UX
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('scroll-wrapper');

    // Segurança: evita erro caso o elemento não exista
    if (!slider) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    /* =========================
       FUNÇÕES AUXILIARES
    ========================= */

    const startDrag = (x, y) => {
        isDragging = true;
        slider.classList.add('dragging');

        startX = x - slider.offsetLeft;
        startY = y - slider.offsetTop;

        scrollLeft = slider.scrollLeft;
        scrollTop = slider.scrollTop;
    };

    const moveDrag = (x, y) => {
        if (!isDragging) return;

        const walkX = x - slider.offsetLeft - startX;
        const walkY = y - slider.offsetTop - startY;

        slider.scrollLeft = scrollLeft - walkX;
        slider.scrollTop = scrollTop - walkY;
    };

    const endDrag = () => {
        isDragging = false;
        slider.classList.remove('dragging');
    };

    /* =========================
       EVENTOS DESKTOP
    ========================= */

    slider.addEventListener('mousedown', (e) => {
        startDrag(e.pageX, e.pageY);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        moveDrag(e.pageX, e.pageY);
    });

    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);

    /* =========================
       EVENTOS MOBILE (TOUCH)
    ========================= */

    slider.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrag(touch.pageX, touch.pageY);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        moveDrag(touch.pageX, touch.pageY);
    }, { passive: true });

    slider.addEventListener('touchend', endDrag);

    /* =========================
       MELHORIA DE UX
    ========================= */

    slider.style.cursor = 'grab';

    slider.addEventListener('mousedown', () => {
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseup', () => {
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseleave', () => {
        slider.style.cursor = 'grab';
    });
});