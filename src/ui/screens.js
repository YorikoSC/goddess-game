/**
 * Показывает нужный экран по id
 */
export function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = (screen.id === screenId) ? '' : 'none';
    });
}

/**
 * Показывает экран окончания игры/главы
 */
export function showEndgameScreen() {
    showScreen('endgame-screen');
    // Здесь можно добавить дополнительную логику для финального экрана
}

/**
 * Отрисовывает варианты выбора игрока
 */
export function renderChoices(choices, container, onChoice) {
    container.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => onChoice(choice.value);
        container.appendChild(btn);
    });
}

/**
 * Показывает уведомление Boosty
 */
export function boostyNotification() {
    const notification = document.createElement('div');
    notification.className = 'boosty-notification';
    notification.textContent = 'Поддержи проект на Boosty!';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 4000);
}