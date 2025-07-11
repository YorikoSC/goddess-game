export function showOverlay(text, duration = 3000) {
    const overlay = document.createElement('div');
    overlay.className = 'chapter-overlay';
    overlay.textContent = text;
    
    document.body.appendChild(overlay);
    
    // Плавное появление
    setTimeout(() => overlay.classList.add('visible'), 100);
    
    // Плавное исчезновение
    setTimeout(() => {
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 1000);
    }, duration);
}