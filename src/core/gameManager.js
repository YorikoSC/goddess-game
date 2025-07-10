import { loadChapter, loadChapterInstant, restartChapter } from './chapterManager.js';
import { showScreen, showNavigation, hideNavigation, showEndgameScreen, clearChat } from '../ui/screens.js';
import { gameState, getFirstChapterOfCurrentArc, saveStateAtChoice } from './gameState.js';
import { LanguageManager } from './languageManager.js';
import { updateClock } from '../utils/clock.js';
import { playMessageSound } from '../ui/chat.js';
import { clearImageCarousel } from '../js/imageCarousel.js'; // Предполагаем, что этот модуль существует

export function startNewGame() {
    gameState.choices = {};
    gameState.arc = 1;
    gameState.isBusy = false;
    gameState.dialogueEnded = false;
    gameState.isChapterEnding = false;
    gameState.generateMessage = false;
    gameState.currentChapter = null;
    gameState.boostyNotification = false;

    clearProgress();
    clearChat();
    localStorage.removeItem('chapterPosts');
    localStorage.removeItem('allPosts');

    showScreen('chat');
    showNavigation();
    loadChapter('chapter1');
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
    console.log('Прогресс сохранен:', progress);
}

function clearProgress() {
    localStorage.removeItem('gameProgress');
    gameState.lastCheckpoint = { chapter: 'chapter1', choices: {}, arc: 1 };
    console.log('Прогресс очищен');
}

function autoSave() {
    if (!gameState.currentChapter) return;
    saveProgress();
}

function loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        gameState.currentChapter = progress.chapter || 'chapter1';
        gameState.arc = progress.arc || 1;
        gameState.language = progress.language || 'ru';
        gameState.choices = progress.choices || {};
        gameState.lastCheckpoint = progress.lastCheckpoint || { chapter: progress.chapter || 'chapter1', choices: progress.choices || {}, arc: progress.arc || 1 };
        loadChapterInstant(gameState.currentChapter);
        return true;
    }
    return false;
}

function boostyNotification() {
    showScreen('boosty');
    gameState.boostyNotification = true;
}

function checkArcCompletion() {
    if (!gameState.currentChapter || gameState.currentChapter === 'start') return null;
    if (gameState.arc === 1 && determineSecondArcStart(gameState)) return 'endgame';
    if (gameState.arc === 2 && gameState.currentChapter === 'arc2_final') return 'endgame';
    return null;
}

export function initGame() {
    window.game.languageManager = new LanguageManager();
    updateClock();
    setInterval(updateClock, 60000);

    if (!loadProgress()) {
        const startScreen = document.querySelector('.start-screen');
        if (startScreen) startScreen.classList.add('active');
    }

    const startButton = document.querySelector('.start-game-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Начало новой игры');
            const startScreen = document.querySelector('.start-screen');
            if (startScreen) startScreen.classList.remove('active');
            if (!loadProgress()) startNewGame();
            const chatScreen = document.querySelector('[data-screen="chat"]');
            if (chatScreen) chatScreen.classList.add('active');
            showNavigation();
        });
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = btn.getAttribute('data-screen');
            if (screenId) {
                showScreen(screenId);
                if (screenId === 'puregram') loadPuregramPosts();
            }
        });
    });

    const backBtn = document.querySelector('.back-btn');
    if (backBtn) backBtn.addEventListener('click', (e) => { e.preventDefault(); showScreen('chat'); });

    const restartChapterBtn = document.querySelector('.start-chapter-over');
    if (restartChapterBtn) restartChapterBtn.addEventListener('click', (e) => { e.preventDefault(); restartChapter(); });

    const restartArcBtn = document.querySelector('.nav-btn--endGame');
    if (restartArcBtn) restartArcBtn.addEventListener('click', () => { if (!gameState.isBusy) startNewGame(); });

    hideNavigation();
}

window.game = {
    ...window.game,
    showScreen,
    startNewGame,
    saveGame: saveProgress,
    loadGame: loadProgress,
    loadChapter,
    openFullscreenImage,
    determineSecondArcStart,
    saveGameState: saveProgress,
    loadGameState: loadProgress,
    clearProgress,
    clearChat,
    autoSave,
    checkArcCompletion,
    boostyNotification,
    languageManager: null,
    addNewPost: function(image, caption, likes) {
        if (!image) return;
        const captionObj = typeof caption === 'string' ? { ru: caption, en: caption } : caption;
        const newPost = { image, caption: captionObj, likes: likes || 0, chapter: gameState.currentChapter };
        chapterPosts.unshift(newPost);
        allPosts.unshift(newPost);
        localStorage.setItem('chapterPosts', JSON.stringify(chapterPosts));
        localStorage.setItem('allPosts', JSON.stringify(allPosts));
        loadPuregramPosts();
    },
};