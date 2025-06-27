/**
 * Скрывает элементы навигации
 */
export function hideNavigation() {
    const nav = document.getElementById('navigation');
    if (nav) {
        nav.style.display = 'none';
    }
}

/**
 * Показывает элементы навигации
 */
export function showNavigation() {
    const nav = document.getElementById('navigation');
    if (nav) {
        nav.style.display = '';
    }
}