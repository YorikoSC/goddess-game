import { gameState } from '../core/gameState.js';
import { loadPuregramPosts } from './puregram.js';

export function showScreen(screenId) {
    console.log('Показываем экран:', screenId);
    if (gameState.boostyNotification) screenId = 'boosty';
    const screens = document.querySelectorAll('.screen');
    if (!screens.length) console.error('Нет элементов .screen в DOM');
    const currentActiveScreen = document.querySelector('.screen.active');
    if (currentActiveScreen) currentActiveScreen.classList.remove('active');
    const targetScreen = document.querySelector(`.screen[data-screen="${screenId}"]`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        if (screenId === 'puregram') loadPuregramPosts();
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.screen === screenId);
        });
    } else {
        console.error(`Экран с data-screen="${screenId}" не найден`);
    }
}

export function showNavigation() {
    document.querySelector('.nav').style.display = 'flex';
}

export function hideNavigation() {
    document.querySelector('.nav').style.display = 'none';
}

export function showEndgameScreen() {
    saveProgress();
    document.querySelector('[data-screen="endgame"]').classList.add('active');
    document.querySelector('[data-screen="chat"]').classList.remove('active');
    hideNavigation();
    const startButton = document.querySelector('.start-new-chapter');
    startButton.replaceWith(startButton.cloneNode(true));
    startButton.addEventListener('click', async () => {
        document.querySelector('[data-screen="endgame"]').classList.remove('active');
        document.querySelector('[data-screen="chat"]').classList.add('active');
        showNavigation();
        clearChat();
        if (gameState.arc === 1) {
            gameState.arc = 2;
            await loadChapter('arc2_date_monolog');
        } else if (gameState.arc === 2) console.log('Игра завершена');
    });
}

function saveProgress() {
    const progress = {
        chapter: gameState.currentChapter,
        arc: gameState.arc,
        language: gameState.language,
        choices: gameState.choices,
        lastCheckpoint: gameState.lastCheckpoint,
    };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
}

export function clearChat() {
    document.getElementById('chat').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    gameState.dialogueEnded = false;
}