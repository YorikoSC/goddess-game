import { initImageCarousel, clearImageCarousel } from './js/imageCarousel.js';

// game.js - основной файл игры

// Глобальный объект игры для доступа из HTML
import { determineSecondArcStart, saveGameState, loadGameState } from './ArcManager.js';
window.game = {
    startSecondArc: function() {
        gameState.arc = 2;
        loadChapter('arc2_date_monolog'); // Изменено с arc2_start на arc2_date_monolog
        
        // Обновляем UI если нужно
        const arcIndicator = document.getElementById('currentArc');
        if (arcIndicator) {
            arcIndicator.textContent = '2';
        }
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
    clearImageCarousel();
    try {
        console.log(`Loading chapter: ${chapterId}`);
        
        // Определяем путь к файлу главы
        let chapterPath;
        if (chapterId.startsWith('arc2_')) {
            chapterPath = `./chapters/arc2/${chapterId}.js`;
            // Устанавливаем номер арки при переходе на вторую арку
            gameState.arc = 2;
        } else {
            chapterPath = `./chapters/arc1/${chapterId}.js`;
        }
        
        const chapterModule = await import(chapterPath);
        
        if (!chapterModule?.default) {
            console.error(`Ошибка: глава ${chapterId} не найдена`);
            return false;
        }
        
        // Сохраняем текущую главу как предыдущую
        if (gameState.currentChapter && chapterId !== gameState.currentChapter) {
            gameState.previousChapter = gameState.currentChapter;
        }
        
        gameState.currentChapter = chapterId;
        renderChapter(chapterModule.default, false);
        
        // Обновляем индикатор арки в UI
        const arcIndicator = document.getElementById('currentArc');
        if (arcIndicator) {
            arcIndicator.textContent = gameState.arc.toString();
        }
        
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
function displayMessages(messages, container, onComplete) {
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
function addMessage(type, text, container) {
    const msg = document.createElement('div');
    msg.className = type === 'sent' ? 'message message-sent' : 'message message-received';
    
    const messageId = `msg_${Date.now()}`;
    msg.dataset.messageId = messageId;
    
    if (window.game.languageManager && window.game.languageManager.chapterTranslations) {
        const currentLang = window.game.languageManager.currentLang;
        const translations = window.game.languageManager.chapterTranslations[currentLang];
        if (translations && translations[messageId]) {
            text = translations[messageId];
        }
    }
    
    msg.textContent = text;
    container.appendChild(msg);
    
    if (text.includes('{photo_name_')) {
        const photoRegex = /{photo_name_(\d+)}/;
        const match = text.match(photoRegex);
        
        if (match && match[1]) {
            const photoNumber = match[1];
            const photoName = `photo_name_${photoNumber}.jpg`;
            
            const textWithoutPhoto = text.replace(photoRegex, '');
            
            if (textWithoutPhoto.trim() !== '') {
                msg.textContent = textWithoutPhoto;
            }
            
            const img = document.createElement('img');
            img.src = `./img/photos/${photoName}`;
            img.alt = `Photo ${photoNumber}`;
            img.className = 'message-image';
            img.addEventListener('click', () => {
                openFullscreenImage(img.src);
            });
            
            msg.appendChild(img);
        } else {
            msg.textContent = text;
        }
    } else {
        msg.textContent = text;
    }
    
    if (window.game.languageManager) {
        window.game.languageManager.chapterTranslations.ru[messageId] = text;
        window.game.languageManager.chapterTranslations.en[messageId] = text; // Английский перевод должен быть добавлен в будущем
    }
    
    if (type === 'received') {
        playMessageSound();
    }
    
    setTimeout(() => {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

// Отображение содержимого главы
function renderChapter(chapter, instant = false) {
    if (!chapter || typeof chapter.getText !== 'function') {
        console.error('Неверный формат главы');
        return;
    }

    // Get messages and choices first
    const messages = chapter.getText(gameState);
    const choices = chapter.getChoices ? chapter.getChoices(gameState) : [];

    // Get containers after getMessage call (in case initImageCarousel changed DOM)
    const chatContainer = document.getElementById('chat');
    const choicesContainer = document.getElementById('choices');

    if (!chatContainer || !choicesContainer) {
        console.error('Контейнеры чата не найдены');
        return;
    }

    // Clear choices container
    choicesContainer.innerHTML = '';

    // Handle monolog message type
    if (messages && messages.length > 0 && messages[0].type === "monolog-placeholder") {
        const monolog = messages[0];
        
        // Clear entire chat wrapper to ensure clean state
        const chatWrapper = document.querySelector('.chat-wrapper');
        chatWrapper.innerHTML = '';

        const monologContainer = document.createElement('div');
        monologContainer.className = 'monolog-placeholder';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'monolog-content';
        textDiv.innerHTML = monolog.content.split('\n\n').join('<br><br>'); // Properly handle paragraphs
        monologContainer.appendChild(textDiv);
        
        const button = document.createElement('button');
        button.className = 'monolog-button';
        button.textContent = monolog.buttonText;
        
        // Show button only after scrolling to bottom
        monologContainer.addEventListener('scroll', () => {
            const nearBottom = monologContainer.scrollHeight - monologContainer.scrollTop <= monologContainer.clientHeight + 50;
            button.classList.toggle('visible', nearBottom);
        });
        
        button.onclick = () => loadChapter(monolog.nextChapter);
        monologContainer.appendChild(button);
        
        // Add monolog container directly to chat wrapper
        chatWrapper.appendChild(monologContainer);
        return;
    }

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
            });
        } else if (choices?.length > 0) {
            renderChoices(choices, choicesContainer);
        }
    }
}

// Отображение вариантов выбора
function renderChoices(choices, container) {
    container.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.className = 'choice-btn';
        
        const choiceId = `choice_${gameState.currentChapter}_${index}`;
        choiceButton.dataset.choiceId = choiceId;
        
        choiceButton.textContent = choice.text;
        choiceButton.dataset.choice = index;
        
        if (window.game.languageManager) {
            window.game.languageManager.chapterTranslations.ru[choiceId] = choice.text;
            window.game.languageManager.chapterTranslations.en[choiceId] = choice.text; // Английский перевод должен быть добавлен
        }
        
        choiceButton.addEventListener('click', async () => {
            if (gameState.isBusy || gameState.dialogueEnded) return;
            
            // Сохраняем состояние перед выбором
            saveStateAtChoice();
            
            gameState.isBusy = true;
            container.innerHTML = '';
            
            if (gameState.currentChapter !== 'start') {
                const chatContainer = document.getElementById('chat');
                addMessage('sent', choice.text, chatContainer);
            }
            
            // Сохраняем выбор
            if (!gameState.choices[gameState.currentChapter]) {
                gameState.choices[gameState.currentChapter] = {};
            }
            gameState.choices[gameState.currentChapter][choice.id] = true;
            
            // Если есть результаты выбора, показываем их
            if (choice.result && Array.isArray(choice.result)) {
                for (const msg of choice.result) {
                    await new Promise(resolve => setTimeout(resolve, msg.delay));
                    addMessage(msg.type, msg.text, document.getElementById('chat'));
                }
            }
            
            // Загружаем следующую главу
            if (choice.nextChapter) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await loadChapter(choice.nextChapter);
            }
            
            gameState.isBusy = false;
        });
        
        container.appendChild(choiceButton);
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
  
  document.querySelector('.start-new-chapter').addEventListener('click', () => {
    window.game.startSecondArc();
  });
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

// Очистка прогресса
function clearProgress() {
  localStorage.removeItem('gameProgress');
  console.log('Прогресс очищен');
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
});