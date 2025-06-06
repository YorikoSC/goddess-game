import { initImageCarousel, clearImageCarousel } from './js/imageCarousel.js';

// game.js - основной файл игры

// Глобальный объект игры для доступа из HTML
import { determineSecondArcStart, saveGameState, loadGameState } from './ArcManager.js';
window.game = {
    startSecondArc: async function() {
        console.log('Starting second arc function called'); // Добавим лог
        const nextChapter = determineSecondArcStart(gameState);
        if (nextChapter) {
            console.log(`Loading next chapter: ${nextChapter}`); // Добавим лог
            await loadChapter(nextChapter);
            return true;
        }
        return false;
    }
};

// Состояние игры
const gameState = {
  currentChapter: null,
  choices: {}, // Сохранение выборов игрока
  arc: 1, // Текущая арка (1 или 2)
  language: 'ru', // Текущий язык
  isBusy: false, // Индикатор занятости (блокировка взаимодействия)
  dialogueEnded: false, // Флаг завершения диалога
  isChapterEnding: false, // Флаг окончания главы
  generateMessage: false, // Флаг генерации сообщений
  previousChapter: null, // Добавляем новое поле
  lastCheckpoint: {
      chapter: null,
      choices: {}
  }
};

let savedState = null; // Переменная для хранения состояния

function saveStateAtChoice() {
    gameState.lastCheckpoint = {
        chapter: gameState.currentChapter,
        choices: JSON.parse(JSON.stringify(gameState.choices)),
        arc: gameState.arc
    };
    console.log('Сохранена точка возврата:', gameState.lastCheckpoint);
}

export class LanguageManager {
    constructor() {
        this.currentLang = 'ru';
        this.translations = {
            ru: {
                'end-chapter': 'Конец первой главы',
                'thanks': 'Спасибо за игру!',
                'to-be-continued': 'Продолжение следует...',
                'new-chapter': 'Начать новую главу',
                'new-game': 'Начать новую игру',
                'restart-chapter': 'Начать главу заново',
                'change-lang': 'Поменять язык',
                'online': 'онлайн'
            },
            en: {
                'end-chapter': 'End of Chapter One',
                'thanks': 'Thanks for playing!',
                'to-be-continued': 'To be continued...',
                'new-chapter': 'Start New Chapter',
                'new-game': 'Start New Game',
                'restart-chapter': 'Restart Chapter',
                'change-lang': 'Change Language',
                'online': 'online'
            }
        };

        this.currentChapter = null;
        this.chapterTranslations = {
            ru: {},
            en: {}
        };

        // Инициализируем начальный язык
        this.initLanguage();
    }

    initLanguage() {
        const langBtn = document.querySelector('.lang-btn');
        if (langBtn) {
            // Устанавливаем начальные значения
            langBtn.textContent = this.currentLang.toUpperCase();
            langBtn.dataset.lang = this.currentLang;
            // Добавляем обработчик события
            langBtn.addEventListener('click', () => this.toggleLanguage());
            // Обновляем все тексты при инициализации
            this.updateTexts();
        }
    }

    toggleLanguage() {
        console.log('Переключение языка с', this.currentLang);
        this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
        console.log('на', this.currentLang);
        
        const langBtn = document.querySelector('.lang-btn');
        if (langBtn) {
            langBtn.textContent = this.currentLang.toUpperCase();
            langBtn.dataset.lang = this.currentLang;
        }
        
        // Очищаем чат перед сменой языка
        const chatContainer = document.getElementById('chat');
        const choicesContainer = document.getElementById('choices');
        if (chatContainer) chatContainer.innerHTML = '';
        if (choicesContainer) choicesContainer.innerHTML = '';
        
        // Обновляем тексты интерфейса
        this.updateTexts();
        
        // Обновляем язык в gameState
        gameState.language = this.currentLang;
        
        // Перезагружаем текущую главу с новым языком
        if (gameState.currentChapter) {
            loadChapter(gameState.currentChapter);
        }
    }

    setChapterTranslations(translations) {
        if (translations.ru && translations.en) {
            this.chapterTranslations = translations;
            this.currentChapter = gameState.currentChapter;
        }
    }

    updateTexts() {
        try {
            console.log('Обновление текстов на язык:', this.currentLang);
            
            // Обновляем тексты в endgame-screen
            const endGameH2 = document.querySelector('.endgame-content h2');
            if (endGameH2) endGameH2.textContent = this.translations[this.currentLang]['end-chapter'];
            
            const endGameP1 = document.querySelector('.endgame-content p:nth-child(2)');
            if (endGameP1) endGameP1.textContent = this.translations[this.currentLang]['thanks'];
            
            const endGameP2 = document.querySelector('.endgame-content p:nth-child(3)');
            if (endGameP2) endGameP2.textContent = this.translations[this.currentLang]['to-be-continued'];
            
            const newChapterBtn = document.querySelector('.start-new-chapter');
            if (newChapterBtn) newChapterBtn.textContent = this.translations[this.currentLang]['new-chapter'];
            
            // Обновляем заголовки кнопок
            const newGameBtn = document.querySelector('.nav-btn--endGame');
            if (newGameBtn) newGameBtn.title = this.translations[this.currentLang]['new-game'];
            
            const restartChapterBtn = document.querySelector('.start-chapter-over');
            if (restartChapterBtn) restartChapterBtn.title = this.translations[this.currentLang]['restart-chapter'];
            
            const langBtn = document.querySelector('.lang-btn');
            if (langBtn) langBtn.title = this.translations[this.currentLang]['change-lang'];
            
            // Обновляем статус онлайн
            const onlineStatus = document.querySelector('.online-status');
            if (onlineStatus) onlineStatus.textContent = this.translations[this.currentLang]['online'];
            
            // Обновляем тексты текущей главы
            if (this.currentChapter && this.chapterTranslations[this.currentLang]) {
                // Обновляем сообщения в чате
                const chatMessages = document.querySelectorAll('.chat-messages .message');
                chatMessages.forEach(msg => {
                    const messageId = msg.dataset.messageId;
                    if (messageId && this.chapterTranslations[this.currentLang][messageId]) {
                        msg.textContent = this.chapterTranslations[this.currentLang][messageId];
                    }
                });

                // Обновляем варианты ответов
                const choices = document.querySelectorAll('.choice-btn');
                choices.forEach(choice => {
                    const choiceId = choice.dataset.choiceId;
                    if (choiceId && this.chapterTranslations[this.currentLang][choiceId]) {
                        choice.textContent = this.chapterTranslations[this.currentLang][choiceId];
                    }
                });

                const backBtn = document.querySelector('.back-btn');
                if (backBtn) {
                    backBtn.title = window.game.languageManager.translations[window.game.languageManager.currentLang]['back-button'] || 'Назад';
                    backBtn.setAttribute('aria-label', window.game.languageManager.translations[window.game.languageManager.currentLang]['back-button'] || 'Назад');
                    
                    backBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        showScreen('chat');
                    });
                    
                    window.game.languageManager.updateBackButton = function() {
                        const translation = this.translations[this.currentLang]['back-button'] || 'Назад';
                        backBtn.title = translation;
                        backBtn.setAttribute('aria-label', translation);
                    };
                }

            }

            console.log('Тексты успешно обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении текстов:', error);
        }
    }
}

// Обновление часов на телефоне
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.querySelector('.time').textContent = `${hours}:${minutes}`;
}

// Функция для заполнения экрана PureGram
function loadPuregramPosts() {
    console.log('Загрузка постов PureGram');
    const postsContainer = document.getElementById('posts');
    if (!postsContainer) {
        console.error('Контейнер для постов не найден');
        return;
    }
    
    // Очищаем контейнер
    postsContainer.innerHTML = '';
    
    // Добавляем посты
    const posts = [
        {
            image: 'img/lina_post1.jpg',
            caption: 'Мой новый фотосет 💫',
            likes: 256
        },
        {
            image: 'img/lina_post2.jpg',
            caption: 'Прогулка по городу ☀️',
            likes: 178
        },
        {
            image: 'img/lina_post3.jpg',
            caption: 'Фото с новой фотосессии 📸',
            likes: 321
        }
    ];
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// Вспомогательная функция для создания элемента поста
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'pg-post';
    
    postElement.innerHTML = `
        <div class="pg-post-header">
            <img src="img/lina_avatar.jpg" class="pg-avatar" alt="Lina">
            <span>Lina</span>
        </div>
        <div class="pg-post-image">
            <img src="${post.image}" alt="Post" class="post-image">
        </div>
        <div class="pg-post-actions">
            <button class="like-btn" data-liked="false">❤️ ${post.likes}</button>
            <button>💬</button>
            <button>📤</button>
        </div>
        <div class="pg-post-caption">
            <p>${post.caption}</p>
        </div>
    `;
    
    return postElement;
}

// Функция открытия изображения в полноэкранном режиме
function openFullscreenImage(src) {
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';

  const img = document.createElement('img');
  img.src = src;
  img.className = 'fullscreen-image';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'fullscreen-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);

  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}


// Загрузка главы
async function loadChapter(chapterId) {
    if (!chapterId) {
        console.error('loadChapter: chapterId is undefined');
        return false;
    }

    clearImageCarousel();
    try {
        console.log(`Loading chapter: ${chapterId}`);
        
        let chapterPath;
        // Обработка разных форматов путей
        if (chapterId.startsWith('arc2/')) {
            // Для вложенных путей второй арки (arc2/way_to_NTR/...)
            chapterPath = `./chapters/${chapterId}.js`;
            gameState.arc = 2;
        } else if (chapterId.startsWith('arc2_after_date')) {
            // Для глав из папки after_date
            chapterPath = `./chapters/arc2/after_date/${chapterId}.js`;
            gameState.arc = 2;
        } else if (chapterId.startsWith('arc2_')) {
            // Для остальных глав второй арки
            chapterPath = `./chapters/arc2/${chapterId}.js`;
            gameState.arc = 2;
        } else {
            // Для глав первой арки
            chapterPath = `./chapters/arc1/${chapterId}.js`;
        }
        
        console.log('Loading from path:', chapterPath);
        const chapterModule = await import(chapterPath);
        
        if (!chapterModule?.default) {
            console.error(`Ошибка: глава ${chapterId} не найдена`);
            return false;
        }
        
        gameState.currentChapter = chapterId;
        renderChapter(chapterModule.default, false);
        
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки главы ${chapterId}:`, error);
        return false;
    }
}

// Управление состоянием кнопок
function disabledButtons(disabled) {
  document.querySelector('.nav-btn--endGame').disabled = disabled;
  document.querySelector('.start-chapter-over').disabled = disabled;
  document.querySelector('.lang-btn').disabled = disabled;
}

// Воспроизведение звука сообщения
function playMessageSound() {
  const sound = document.getElementById('sound');
  sound.currentTime = 0;
  sound.play().catch(e => console.log('Автовоспроизведение звука не разрешено'));
}

// Отображение сообщений с задержкой
function displayMessages(messages, container, onComplete, chapter) {
    if (!messages || messages.length === 0) {
        if (onComplete) {
            gameState.generateMessage = false;
            disabledButtons(gameState.generateMessage);
            onComplete();
        }
        return;
    }
    
    const messagePromises = messages.map((message, index) => {
        return new Promise(resolve => {
            setTimeout(() => {
                addMessage(message.type, message.text, container);
                
                if (message.nextChoice && chapter) {
                    const nextChoice = chapter.getChoicesByKey(message.nextChoice, gameState);
                    if (nextChoice) {
                        // Вместо добавления текста в чат, отображаем варианты выбора
                        const choicesContainer = document.getElementById('choices');
                        renderChoices([{
                            text: nextChoice.text,
                            result: nextChoice.result
                        }], choicesContainer);
                    }
                }
                
                resolve();
            }, message.delay || 1000);
        });
    });
    
    Promise.all(messagePromises).then(() => {
        gameState.generateMessage = false;
        disabledButtons(gameState.generateMessage);
        
        if (onComplete) onComplete();
    });
}

// Добавление сообщения в чат
function addMessage(type, text, container, image) {
    const msg = document.createElement('div');
    msg.className = type === 'sent' ? 'message message-sent' : 'message message-received';
    
    const messageId = `msg_${Date.now()}`;
    msg.dataset.messageId = messageId;
    
    // Если есть текст, обрабатываем его
    if (text) {
        if (window.game.languageManager && window.game.languageManager.chapterTranslations) {
            const currentLang = window.game.languageManager.currentLang;
            const translations = window.game.languageManager.chapterTranslations[currentLang];
            if (translations && translations[messageId]) {
                text = translations[messageId];
            }
        }
        msg.textContent = text;
    }
    
    // Если есть изображение, добавляем его
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.onerror = () => console.error("Не удалось загрузить изображение:", image);
        container.appendChild(img);
    }
    
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    
    // Воспроизводим звук сообщения, если это входящее сообщение
    if (type === 'received') {
        playMessageSound();
    }
}
// Отображение содержимого главы
function renderChapter(chapter, instant = false) {
    // Get messages and choices first
    const messages = chapter.getText(gameState);
    const choices = chapter.getChoices ? chapter.getChoices(gameState) : [];

    // Handle monolog message type first
    if (messages && messages.length > 0 && messages[0].type === "monolog-placeholder") {
        const monolog = messages[0];
        
        // Clear entire chat wrapper
        const chatWrapper = document.querySelector('.chat-wrapper');
        chatWrapper.innerHTML = '';

        // Create monolog container
        const monologContainer = document.createElement('div');
        monologContainer.className = 'monolog-placeholder';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'monolog-content';
        textDiv.innerHTML = monolog.content.split('\n\n').join('<br><br>');
        monologContainer.appendChild(textDiv);
        
        const button = document.createElement('button');
        button.className = 'monolog-button';
        button.textContent = monolog.buttonText || "Продолжить...";
        
        button.addEventListener('click', async () => {
            // Восстанавливаем структуру чата перед загрузкой следующей главы
            chatWrapper.innerHTML = `
                <div class="chat-messages" id="chat"></div>
                <div class="choices" id="choices"></div>
            `;
            
            if (monolog.nextChapter) {
                await loadChapter(monolog.nextChapter);
            }
        });
        
        monologContainer.appendChild(button);
        chatWrapper.appendChild(monologContainer);
        return;
    }

    // Get containers after getMessage call
    const chatContainer = document.getElementById('chat');
    const choicesContainer = document.getElementById('choices');

    if (!chatContainer || !choicesContainer) {
        console.error('Контейнеры чата не найдены');
        return;
    }

    // Clear choices container
    choicesContainer.innerHTML = '';

    // Handle regular messages
    if (instant) {
        messages?.forEach(message => {
            addMessage(message.type, message.text, chatContainer);
        });
        if (choices?.length > 0) {
            renderChoices(choices, choicesContainer);
        }
    } else {
        if (messages?.length > 0) {
            gameState.isBusy = true;
            displayMessages(messages, chatContainer, () => {
                gameState.isBusy = false;
                if (choices?.length > 0) {
                    renderChoices(choices, choicesContainer);
                }
            }, chapter); // Передаем объект chapter
        } else if (choices?.length > 0) {
            renderChoices(choices, choicesContainer);
        }
    }
}

// Отображение вариантов выбора
function renderChoices(choices, container) {
    if (!container || !choices) return;
    
    container.innerHTML = '';
    const chatContainer = document.getElementById('chat');

    // Добавляем класс для чата сразу
    chatContainer.classList.add('has-choices');
    
    // Показываем контейнер выбора
    container.classList.add('visible');

    // Сохраняем точку возврата перед отображением выборов
    saveStateAtChoice();

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        
        button.addEventListener('click', async () => {
            if (gameState.isBusy) return;
            
            // Убираем классы при выборе
            chatContainer.classList.remove('has-choices');
            container.classList.remove('visible');
            
            addMessage('sent', choice.text, chatContainer);
            
            if (choice.result && choice.result.length > 0) {
                gameState.isBusy = true;
                await displayMessages(choice.result, chatContainer, () => {
                    gameState.isBusy = false;
                    if (choice.result[choice.result.length - 1].nextChapter) {
                        loadChapter(choice.result[choice.result.length - 1].nextChapter);
                    }
                });
            } else if (choice.nextChapter) {
                loadChapter(choice.nextChapter);
            }
            
            container.innerHTML = '';
        });
        
        container.appendChild(button);
    });
}

// Проверка завершения арки
function checkArcCompletion() {
  if (gameState.currentChapter === 'start' || !gameState.currentChapter) {
    return null;
  }

  if (gameState.arc === 1) {
    if (determineSecondArcStart(gameState)) {
      return 'endgame';
    }
  }
  
  if (gameState.arc === 2) {
    const isFinalChapter = gameState.currentChapter === 'arc2_final';
    if (isFinalChapter) {
      return 'endgame';
    }
  }

  return null;
}

// Отображение экрана окончания главы
function showEndgameScreen() {
    document.querySelector('[data-screen="endgame"]').classList.add('active');
    document.querySelector('[data-screen="chat"]').classList.remove('active');
    hideNavigation();
    
    // Удаляем старый обработчик, если он есть
    const startButton = document.querySelector('.start-new-chapter');
    startButton.replaceWith(startButton.cloneNode(true));
    
    // Добавляем новый обработчик
    document.querySelector('.start-new-chapter').addEventListener('click', async () => {
        document.querySelector('[data-screen="endgame"]').classList.remove('active');
        document.querySelector('[data-screen="chat"]').classList.add('active');
        showNavigation();
        
        // Очищаем чат перед началом новой арки
        clearChat();
        
        // Проверяем текущую арку
        if (gameState.arc === 1) {
            // Если первая арка завершена, начинаем вторую
            gameState.arc = 2;
            await loadChapter('arc2_date_monolog');
        } else if (gameState.arc === 2) {
            // Если вторая арка завершена, показываем финальный экран
            // Здесь можно добавить логику для финала игры
            console.log('Игра завершена');
        }
    });
}
// Очистка прогресса игры в localStorage
function clearProgress() {
    localStorage.removeItem('gameProgress');
    console.log('Прогресс игры очищен');
    
    // Также очищаем сохранённое состояние из ArcManager если используется
    if (window.game.saveGameState) {
      window.game.saveGameState(null);
    }
  }
// Скрытие навигации
function hideNavigation() {
  document.querySelector('.nav').style.display = 'none';
}

// Показ навигации
function showNavigation() {
  document.querySelector('.nav').style.display = 'flex';
}

// Функция для переключения между экранами
function showScreen(screenId) {
    console.log('Показываем экран:', screenId);
    
    const currentActiveScreen = document.querySelector('.screen.active');
    if (currentActiveScreen) {
        currentActiveScreen.classList.remove('active');
    }
    
    const targetScreen = document.querySelector(`.screen[data-screen="${screenId}"]`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        if (screenId === 'puregram') {
            loadPuregramPosts();
        }
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.screen === screenId);
        });
    }
}

// Начало новой игры
function startNewGame() {
  gameState.choices = {};
  gameState.arc = 1;
  gameState.isBusy = false;
  gameState.dialogueEnded = false;
  gameState.isChapterEnding = false;
  gameState.generateMessage = false;
  gameState.currentChapter = null;
  
  clearProgress();
  
  clearChat();
  
  showScreen('chat');
  
  showNavigation();
  
  loadChapter('chapter1');
}

// Очистка чата
function clearChat() {
  document.getElementById('chat').innerHTML = '';
  document.getElementById('choices').innerHTML = '';
  gameState.dialogueEnded = false;
}

// Сохранение прогресса в localStorage
function saveProgress() {
  const progress = {
    chapter: gameState.currentChapter,
    arc: gameState.arc,
    language: gameState.language,
    choices: gameState.choices
  };
  
  localStorage.setItem('gameProgress', JSON.stringify(progress));
  console.log('Прогресс сохранен:', progress);
}

// Загрузка прогресса из localStorage
function loadProgress() {
  const savedState = loadGameState();
  
  if (savedState) {
    gameState.language = savedState.language || 'ru';
    gameState.arc = savedState.arc || 1;
    gameState.currentChapter = savedState.currentChapter || 'chapter1';
    gameState.choices = savedState.choices || {};
    
    console.log('Прогресс загружен через ArcManager:', savedState);
    
    loadChapter(gameState.currentChapter);
    
    return true;
  }
  
  const savedProgress = localStorage.getItem('gameProgress');
  
  if (savedProgress) {
    try {
      const progress = JSON.parse(savedProgress);
      gameState.currentChapter = progress.chapter || 'chapter1';
      gameState.arc = progress.arc || 1;
      gameState.language = progress.language || 'ru';
      gameState.choices = progress.choices || {};
      
      loadChapter(gameState.currentChapter);
      
      return true;
    } catch (error) {
      console.error('Ошибка при разборе сохраненного прогресса:', error);
      return false;
    }
  } else {
    console.log('Сохраненный прогресс не найден');
    return false;
  }
}


// Функция загрузки предыдущей главы
async function loadPreviousChapter() {
    try {
        if (!gameState.previousChapter) {
            console.error('Предыдущая глава не найдена');
            return false;
        }

        console.log(`Загрузка предыдущей главы: ${gameState.previousChapter}`);
        
        // Определяем путь к файлу главы в зависимости от арки
        let chapterPath;
        if (gameState.previousChapter.startsWith('arc2_')) {
            chapterPath = `./chapters/arc2/${gameState.previousChapter}.js`;
        } else {
            chapterPath = `./chapters/arc1/${gameState.previousChapter}.js`;
        }

        const chapterModule = await import(chapterPath);
        
        if (!chapterModule?.default) {
            console.error(`Ошибка: глава ${gameState.previousChapter} не найдена`);
            return false;
        }

        gameState.currentChapter = gameState.previousChapter;
        renderChapter(chapterModule.default, false);
        
        return true;
    } catch (error) {
        console.error('Ошибка загрузки предыдущей главы:', error);
        return false;
    }
}

// Функция перезапуска текущей главы
function restartChapter() {
    // Останавливаем все текущие процессы
    gameState.isBusy = false;
    gameState.dialogueEnded = false;
    gameState.generateMessage = false;
    
    if (gameState.lastCheckpoint.chapter) {
        // Восстанавливаем состояние
        gameState.currentChapter = gameState.lastCheckpoint.chapter;
        gameState.choices = JSON.parse(JSON.stringify(gameState.lastCheckpoint.choices));
        gameState.arc = gameState.lastCheckpoint.arc;
        
        // Принудительно очищаем чат и карусель
        clearChat();
        clearImageCarousel();
        
        // Загружаем главу мгновенно
        loadChapterInstant(gameState.lastCheckpoint.chapter);
    } else {
        console.log('Нет сохраненной точки возврата');
    }
}

// Обновленная функция мгновенной загрузки главы
async function loadChapterInstant(chapterId) {
    try {
        // Останавливаем все текущие операции
        clearChat();
        gameState.isBusy = false;
        gameState.dialogueEnded = false;
        gameState.generateMessage = false;

        let chapterPath;
        if (chapterId.startsWith('arc2_')) {
            chapterPath = `./chapters/arc2/${chapterId}.js`;
        } else {
            chapterPath = `./chapters/arc1/${chapterId}.js`;
        }

        const chapterModule = await import(chapterPath);
        
        if (!chapterModule?.default) {
            console.error(`Ошибка: глава ${chapterId} не найдена`);
            return false;
        }

        const messages = chapterModule.default.getText(gameState);
        const choices = chapterModule.default.getChoices ? chapterModule.default.getChoices(gameState) : [];
        
        const chatContainer = document.getElementById('chat');
        const choicesContainer = document.getElementById('choices');

        // Очищаем контейнеры перед добавлением нового содержимого
        chatContainer.innerHTML = '';
        choicesContainer.innerHTML = '';

        if (messages && messages.length > 0) {
            if (messages[0].type === "monolog-placeholder") {
                // Если это монолог, используем renderChapter с флагом instant
                renderChapter(chapterModule.default, true);
            } else {
                // Мгновенно добавляем все обычные сообщения
                messages.forEach(message => {
                    const msg = document.createElement('div');
                    msg.className = message.type === 'sent' ? 'message message-sent' : 'message message-received';
                    msg.textContent = message.text;
                    chatContainer.appendChild(msg);
                });

                // Добавляем варианты выбора
                if (choices && choices.length > 0) {
                    renderChoices(choices, choicesContainer);
                }
            }
        }
        
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки главы ${chapterId}:`, error);
        return false;
    }
}

// Инициализация игры
function initGame() {
    window.game.languageManager = new LanguageManager();
    
    updateClock();
    setInterval(updateClock, 60000);

    const startButton = document.querySelector('.start-game-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Начало новой игры');
            
            const startScreen = document.querySelector('.start-screen');
            if (startScreen) {
                startScreen.classList.remove('active');
            }
            
            gameState.choices = {};
            gameState.arc = 1;
            gameState.isBusy = false;
            gameState.dialogueEnded = false;
            gameState.isChapterEnding = false;
            
            clearProgress();
            clearChat();
            
            const chatScreen = document.querySelector('[data-screen="chat"]');
            if (chatScreen) {
                chatScreen.classList.add('active');
            }
            
            showNavigation();
            
            loadChapter('chapter1'); // Проверяем, что имя файла соответствует реальному файлу
        });
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const screenId = this.getAttribute('data-screen');
            if (screenId) {
                console.log('Переключение на экран:', screenId);
                showScreen(screenId);
                
                if (screenId === 'puregram') {
                    loadPuregramPosts();
                }
            }
        });
    });

    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showScreen('chat');
        });
    }

    const restartChapterBtn = document.querySelector('.start-chapter-over');
    if (restartChapterBtn) {
        restartChapterBtn.addEventListener('click', () => {
            if (gameState.isBusy) return;
            restartChapter();
        });
    }

    const restartArcBtn = document.querySelector('.nav-btn--endGame');
    if (restartArcBtn) {
        restartArcBtn.addEventListener('click', () => {
            if (gameState.isBusy) return;
            
            gameState.choices = {};
            gameState.arc = 1;
            gameState.isBusy = false;
            gameState.dialogueEnded = false;
            gameState.isChapterEnding = false;
            gameState.generateMessage = false;
            gameState.currentChapter = null;
            gameState.previousChapter = null;
            
            clearProgress();
            clearChat();
            
            const chatScreen = document.querySelector('[data-screen="chat"]');
            if (chatScreen) {
                chatScreen.classList.add('active');
            }
            
            loadChapter('chapter1');
            
            showNavigation();
        });
    }

    hideNavigation();
}

// Функция сохранения игры
function saveGame() {
  saveProgress();
  alert('Игра сохранена!');
}

// Функция загрузки сохраненной игры
function loadGame() {
  if (loadProgress()) {
    alert('Игра загружена!');
  } else {
    alert('Нет сохраненной игры!');
  }
}

// Экспортируем функции для доступа из HTML и других модулей
window.game = {
    ...window.game,
    showScreen,
    startNewGame,
    saveGame,
    loadGame,
    loadChapter,
    openFullscreenImage,
    determineSecondArcStart,
    saveGameState,
    loadGameState,
    languageManager: null
};

// Запускаем игру после загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  initGame();
})