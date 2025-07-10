import { initImageCarousel, clearImageCarousel } from './js/imageCarousel.js';
import { GameStateManager } from './GameStateManager.js';
import { LanguageManager } from './LanguageManager.js';
import { MessageRenderer } from './MessageRenderer.js';
import { ChapterLoader } from './ChapterLoader.js';
import { ScreenManager } from './ScreenManager.js';
import { determineSecondArcStart, saveGameState, loadGameState } from './ArcManager.js';

// Инициализация модулей
const gameStateManager = new GameStateManager();
const screenManager = new ScreenManager(gameStateManager);
const messageRenderer = new MessageRenderer(
  document.getElementById('chat'),
  document.getElementById('choices'),
  gameStateManager
);
const chapterLoader = new ChapterLoader(messageRenderer, gameStateManager);
const languageManager = new LanguageManager(gameStateManager, chapterLoader, screenManager);

console.log('GameStateManager импортирован:', GameStateManager);
console.log('gameStateManager создан:', gameStateManager);
console.log('clearProgress доступен:', gameStateManager.clearProgress);

// Проверка наличия clearProgress
if (!gameStateManager.clearProgress) {
  console.error('Метод clearProgress не найден в gameStateManager');
}

// Глобальный объект игры
window.game = {
  startSecondArc: async function () {
    const nextChapter = determineSecondArcStart(gameStateManager.gameState);
    if (nextChapter) {
      await chapterLoader.loadChapter(nextChapter);
      return true;
    }
    return false;
  },
  showScreen: screenManager.showScreen.bind(screenManager),
  startNewGame,
  saveGame,
  loadGame,
  loadChapter: chapterLoader.loadChapter.bind(chapterLoader),
  openFullscreenImage,
  determineSecondArcStart,
  saveGameState,
  loadGameState,
  clearProgress: gameStateManager.clearProgress ? gameStateManager.clearProgress.bind(gameStateManager) : () => console.error('clearProgress не доступен'),
  clearChat,
  boostyNotification,
  languageManager,
  addNewPost: function (image, caption, likes) {
    const captionObj = typeof caption === 'string' ? { ru: caption, en: caption } : caption;
    const newPost = { image, caption: captionObj, likes: likes || 0, chapter: gameStateManager.gameState.currentChapter };
    gameStateManager.addPost(newPost);
    if (document.querySelector('[data-screen="puregram"].active')) {
      screenManager.loadPuregramPosts();
    }
  },
};

// Инициализация игры
function initGame() {
  window.game.languageManager = languageManager;
  updateClock();
  setInterval(updateClock, 60000);

  // Инициализация аудио после первого взаимодействия
  const initAudio = () => {
    const audio = new Audio('sounds/msg.mp3');
    audio.play().then(() => audio.pause()).catch(error => console.error('Ошибка инициализации аудио:', error));
    document.removeEventListener('click', initAudio);
  };
  document.addEventListener('click', initAudio);

  if (!gameStateManager.loadProgress()) {
    const startScreen = document.querySelector('.start-screen');
    if (startScreen) startScreen.classList.add('active');
  }

  const startButton = document.querySelector('.start-game-button');
  if (startButton) {
    startButton.addEventListener('click', () => {
      startNewGame();
      const startScreen = document.querySelector('.start-screen');
      if (startScreen) startScreen.classList.remove('active');
      screenManager.showScreen('chat');
      screenManager.showNavigation();
    });
  }

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const screenId = btn.getAttribute('data-screen');
      if (screenId) screenManager.showScreen(screenId);
    });
  });

  const backBtn = document.querySelector('.back-btn');
  if (backBtn) backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screenManager.showScreen('chat');
  });

  const restartChapterBtn = document.querySelector('.start-chapter-over');
  if (restartChapterBtn) {
    restartChapterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Нажата кнопка перезапуска главы');
      chapterLoader.restartChapter(gameStateManager.gameState);
    });
  }

  const restartArcBtn = document.querySelector('.nav-btn--endGame');
  if (restartArcBtn) {
    restartArcBtn.addEventListener('click', startNewGame);
  }

  // Динамическое привязывание обработчика для lang-btn
  const bindLanguageButton = () => {
    const langButton = document.querySelector('.lang-btn');
    if (langButton) {
      langButton.removeEventListener('click', handleLangButtonClick); // Удаляем старый обработчик
      langButton.addEventListener('click', handleLangButtonClick);
      console.log('Обработчик кнопки языка привязан');
      languageManager.updateLanguageButton(); // Обновляем кнопку при привязке
    } else {
      console.warn('Кнопка языка (.lang-btn) не найдена, повторная попытка через 500мс');
      setTimeout(bindLanguageButton, 500);
    }
  };

  function handleLangButtonClick(e) {
    e.preventDefault();
    console.log('Нажата кнопка смены языка');
    languageManager.toggleLanguage();
  }

  bindLanguageButton(); // Вызываем при инициализации
}

// Обновление часов
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.querySelector('.time').textContent = `${hours}:${minutes}`;
}

// Начало новой игры
function startNewGame() {
  gameStateManager.startNewGame();
  messageRenderer.clearChat();
  chapterLoader.loadChapter('chapter1', true);
}

// Сохранение игры
function saveGame() {
  gameStateManager.saveProgress();
  alert('Игра сохранена!');
}

// Загрузка игры
function loadGame() {
  if (gameStateManager.loadProgress()) {
    alert('Игра загружена!');
  } else {
    alert('Нет сохраненной игры!');
  }
}

// Полноэкранное изображение
function openFullscreenImage(src) {
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';
  const img = document.createElement('img');
  img.src = src;
  img.className = 'fullscreen-image';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'fullscreen-close';
  closeBtn.innerHTML = '×';
  closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
}

// Очистка чата
function clearChat() {
  const chat = document.getElementById('chat');
  const choices = document.getElementById('choices');
  if (chat) chat.innerHTML = '';
  if (choices) choices.innerHTML = '';
  gameStateManager.gameState.dialogueEnded = false;
}

// Уведомление Boosty
function boostyNotification() {
  screenManager.showScreen('boosty');
  gameStateManager.gameState.boostyNotification = true;
}

// Инициализация чатов
function initChats() {
  const chatListBtn = document.querySelector('.chat-list-button');
  const chatList = document.querySelector('.chat-list');
  const choicesContainer = document.getElementById('choices');
  let wasChoicesVisible = false;

  chatListBtn.addEventListener('click', () => {
    wasChoicesVisible = choicesContainer.classList.contains('visible');
    if (!chatList.classList.contains('active')) choicesContainer.classList.remove('visible');
    chatList.classList.toggle('active');
    renderChatList();
  });

  chatList.addEventListener('click', (e) => {
    const chatItem = e.target.closest('.chat-item');
    if (chatItem) {
      const chatId = chatItem.dataset.chatId;
      switchChat(chatId);
      if (wasChoicesVisible && gameStateManager.gameState.currentChat === chatId) {
        choicesContainer.classList.add('visible');
        document.getElementById('chat').classList.add('has-choices');
      }
      chatList.classList.remove('active');
    }
  });

  function renderChatList() {
    chatList.innerHTML = '';
    Object.entries(gameStateManager.gameState.chats).forEach(([id, chat]) => {
      if (!chat.isActive) return;
      const chatItem = document.createElement('div');
      chatItem.className = 'chat-item';
      chatItem.dataset.chatId = id;
      const currentLang = gameStateManager.gameState.language || 'ru';
      chatItem.innerHTML = `
        <img src="${chat.avatar}" class="avatar" alt="${chat.name[currentLang]}">
        <div class="chat-info">
          <h2>${chat.name[currentLang]}</h2>
          <p class="online-status">${languageManager.translations[currentLang]['online']}</p>
        </div>
        ${chat.unread > 0 ? '<div class="unread-marker"></div>' : ''}
      `;
      chatList.appendChild(chatItem);
    });
  }

  function switchChat(chatId) {
    gameStateManager.gameState.currentChat = chatId;
    if (gameStateManager.gameState.dialogueEnded && !chatList.classList.contains('active')) {
      choicesContainer.classList.add('visible');
      document.getElementById('chat').classList.add('has-choices');
    }
  }
}

// Запуск игры
window.addEventListener('DOMContentLoaded', () => {
  initGame();
  initChats();
});