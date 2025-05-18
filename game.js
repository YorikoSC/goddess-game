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
  boostyNotification: false, // Флаг активности окна бусти
  lastCheckpoint: {
      chapter: null,
      choices: {}
  }
};

let savedState = null; // Переменная для хранения состояния

function getFirstChapterOfCurrentArc() {
    if (gameState.arc === 1) {
        return 'chapter1';
    } else if (gameState.arc === 2) {
        return 'arc2_date_monolog';
    }
    return 'chapter1'; // fallback
}

function saveStateAtChoice() {
    gameState.lastCheckpoint = {
        chapter: gameState.currentChapter,
        choices: JSON.parse(JSON.stringify(gameState.choices)),
        arc: gameState.arc
    };
    console.log('Сохранена точка возврата:', gameState.lastCheckpoint);
    
    // Сохраняем контрольную точку в localStorage
    autoSave();
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
                'online': 'онлайн',
                'boostyText': ""
                        + "Спасибо, что играете в мою игру! "
                        + "Я прилагаю все усилия для скорейшего продолжения истории! "
                        + "Вы можете поддержать меня на Boosty - это поможет в развитии проекта!"
                    + "",
                'boostyButton': 'Поддержать на Boosty',
                'boostyAdditionalText': 'Начать новую игру'
            },
            en: {
                'end-chapter': 'End of Chapter One',
                'thanks': 'Thanks for playing!',
                'to-be-continued': 'To be continued...',
                'new-chapter': 'Start New Chapter',
                'new-game': 'Start New Game',
                'restart-chapter': 'Restart Chapter',
                'change-lang': 'Change Language',
                'online': 'online',
                'boostyText': ""
                        + "Thank you for playing my game! "
                        + "I'm doing my best to continue the story as soon as possible! "
                        + "You can support me on Boosty - this will help in the development of the project!"
                    + "",
                'boostyButton': 'Support on Boosty',
                'boostyAdditionalText': 'Start new game'
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
            if (restartChapterBtn) {
            restartChapterBtn.addEventListener('click', () => {
            if (gameState.isBusy) return;
            restartChapter();
            });
            }
            
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

            const boostyText = document.querySelector('.boosty-overlay-text');
            if (boostyText) {
                boostyText.textContent = this.translations[this.currentLang]['boostyText'];
            }
            const boostyButton = document.querySelector('.boosty-overlay-button');
            if (boostyButton) {
                boostyButton.textContent = this.translations[this.currentLang]['boostyButton'];
            }
            const boostyAdditionalText = document.querySelector('.boosty-overlay-additional-text');
            if (boostyAdditionalText) {
                boostyAdditionalText.textContent = this.translations[this.currentLang]['boostyAdditionalText'];
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
            <div class="pg-post-like-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
                <span class="pg-post-likes">${post.likes}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-chat-action" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-send-action" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
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
    document.body.classList.add('loading-chapter');
    document.querySelector('.phone').classList.add('no-transition');
    if (!chapterId) {
        console.error('loadChapter: chapterId is undefined');
        return false;
    }

    clearImageCarousel();
    
    // Объявляем chapterPath в начале функции
    let chapterPath;
    
    try {
        console.log(`Loading chapter: ${chapterId}`);

        if (chapterId.startsWith('special_')) {
            // Для специальных глав
            chapterPath = `./chapters/special/${chapterId}.js`;
        } else if (gameState.arc === 1) {
            chapterPath = `./chapters/arc1/${chapterId}.js`;
        } else if (gameState.arc === 2) {
            chapterPath = `./chapters/arc2/${chapterId}.js`;
        }
        
        console.log('Loading from path:', chapterPath);
        
        // Добавляем проверку URL перед загрузкой
        const fullUrl = new URL(chapterPath, window.location.href).href;
        console.log('Full URL:', fullUrl);
        
        const chapterModule = await import(chapterPath);
        
        if (!chapterModule?.default) {
            console.error(`Ошибка: глава ${chapterId} не найдена`);
            return false;
        }
        
        // Сохраняем точку возврата перед загрузкой новой главы
        // Тут же можно сделать проверку, является ли глава новой аркой
        saveStateAtChoice();

        gameState.currentChapter = chapterId;
        autoSave();
        renderChapter(chapterModule.default, false);
        
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки главы ${chapterId}:`, error);
        if (chapterPath) {
            console.error('Полный путь:', new URL(chapterPath, window.location.href).href);
        }
        // Показать уведомление бусти, если произошла ошибка при загрузке главы
        boostyNotification();
        return false;
    }
    setTimeout(() => {
        document.body.classList.remove('loading-chapter');
    }, 300);
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
                // Добавляем обработку фото-сообщений
                if (message.type === 'photo') {
                    addMessage(message.photoSent ? 'sent' : 'received', message.description, container, message.src);
                } else {
                    addMessage(message.type, message.text, container);
                }
                
                if (message.nextChoice && chapter) {
                    const nextChoice = chapter.getChoicesByKey(message.nextChoice, gameState);
                    if (nextChoice) {
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
    if (type === 'monolog') {
        msg.className = 'message message-monolog';
    }
    
    const messageId = `msg_${Date.now()}`;
    msg.dataset.messageId = messageId;
    
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
    
    // Добавляем обработку изображений
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.className = 'chat-image';
        img.alt = ''; // Добавляем alt для доступности
        img.addEventListener('click', () => {
            openFullscreenImage(img.src);
        });
        msg.appendChild(img);
    }
    container.appendChild(msg);
    
    if (type === 'received') {
        playMessageSound();
    }
    
    setTimeout(() => {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'auto' 
        });
    }, 100);
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
            const chatWrapper = document.querySelector('.chat-wrapper');
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

    if (chapter.before) {
        chapter.before();
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

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.type === 'photo' ? choice.description : choice.text;
        
        button.addEventListener('click', async () => {
            if (gameState.isBusy) return;
            
            // Убираем классы при выборе
            chatContainer.classList.remove('has-choices');
            container.classList.remove('visible');
            
            if (choice.type === 'photo') {
                addMessage('sent', choice.text, chatContainer, choice.src);
            } else {
                addMessage('sent', choice.text, chatContainer);
            }
            
            if (choice.result && choice.result.length > 0) {
                gameState.isBusy = true;
                await displayMessages(choice.result, chatContainer, () => {
                    gameState.isBusy = false;
                    if (choice.action) {
                        choice.action(gameState);
                    }
                    if (choice.result[choice.result.length - 1].nextChapter) {
                        loadChapter(choice.result[choice.result.length - 1].nextChapter);
                    }
                });
            } else {
                if (choice.action) {
                    choice.action(gameState);
                }
                if (choice.nextChapter) {
                    loadChapter(choice.nextChapter);
                }
            }
            
            container.innerHTML = '';
        });
        
        container.appendChild(button);
    });
}

function boostyNotification() {
    showScreen('boosty');
    gameState.boostyNotification = true;
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
    saveProgress();
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

    // Блокируем остальные экраны пока активно окно бусти
    if (gameState.boostyNotification) {
        screenId = 'boosty';
    }
    
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
  gameState.boostyNotification = false;
  
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
      choices: gameState.choices,
      lastCheckpoint: gameState.lastCheckpoint // Важно: добавляем lastCheckpoint в обычное сохранение
    };
    
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    console.log('Прогресс сохранен:', progress);
  }
  
  function clearProgress() {
      localStorage.removeItem('gameProgress');
      console.log('Прогресс очищен');
      
      // Сбрасываем также контрольную точку
      gameState.lastCheckpoint = {
          chapter: 'chapter1',
          choices: {},
          arc: 1
      };
  }
  
  function autoSave() {
      if (!gameState.currentChapter) return;
      
      const progress = {
          chapter: gameState.currentChapter,
          arc: gameState.arc,
          language: gameState.language,
          choices: gameState.choices,
          lastCheckpoint: gameState.lastCheckpoint
      };
      
      localStorage.setItem('gameProgress', JSON.stringify(progress));
      console.log('Автосохранение выполнено:', progress);
  }

// Загрузка прогресса из localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            
            // Восстанавливаем состояние
            gameState.currentChapter = progress.chapter || 'chapter1';
            gameState.arc = progress.arc || 1;
            gameState.language = progress.language || 'ru';
            gameState.choices = progress.choices || {};
            
            // Важно: правильно восстанавливаем контрольную точку
            if (progress.lastCheckpoint) {
                gameState.lastCheckpoint = {
                    chapter: progress.lastCheckpoint.chapter,
                    choices: progress.lastCheckpoint.choices || {},
                    arc: progress.lastCheckpoint.arc || progress.arc || 1
                };
            } else {
                gameState.lastCheckpoint = {
                    chapter: progress.chapter || 'chapter1',
                    choices: progress.choices || {},
                    arc: progress.arc || 1
                };
            }
            
            console.log('Прогресс загружен:', progress);
            console.log('Восстановлена контрольная точка:', gameState.lastCheckpoint);
            
            // Загружаем главу мгновенно (без анимации)
            loadChapterInstant(gameState.currentChapter);
            
            return true;
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            return false;
        }
    }
    return false;
}

// Функция перезапуска текущей главы
function restartChapter() {
    console.log('Restarting chapter with lastCheckpoint:', gameState.lastCheckpoint);
    if (gameState.isBusy) return;
    
    // Сбрасываем окно бусти, если открыто
    gameState.boostyNotification = false;

    // Используем последнюю контрольную точку, если она существует
    if (gameState.lastCheckpoint && gameState.lastCheckpoint.chapter) {
        // Восстанавливаем состояние из контрольной точки
        gameState.currentChapter = gameState.lastCheckpoint.chapter;
        gameState.choices = JSON.parse(JSON.stringify(gameState.lastCheckpoint.choices));
        
        // Если контрольная точка включает arc, восстанавливаем его
        if (gameState.lastCheckpoint.arc) {
            gameState.arc = gameState.lastCheckpoint.arc;
        }
    } else {
        // Если нет контрольной точки, используем первую главу арки
        const firstChapter = getFirstChapterOfCurrentArc();
        gameState.currentChapter = firstChapter;
        
        // Сбрасываем только выборы текущей арки
        const arcPrefix = gameState.arc === 1 ? '' : 'arc2_';
        for (const key in gameState.choices) {
            if (key.startsWith(arcPrefix)) {
                delete gameState.choices[key];
            }
        }
    }
    
    // Очищаем чат
    clearChat();
    clearImageCarousel();
    
    // Загружаем главу из контрольной точки
    console.log('Loading checkpoint chapter:', gameState.currentChapter);
    loadChapterInstant(gameState.currentChapter);
    
    // Показываем экран чата
    showScreen('chat');
    showNavigation();
}

// Обновленная функция мгновенной загрузки главы
async function loadChapterInstant(chapterId) {
    if (!chapterId) {
        console.error('loadChapterInstant: chapterId is undefined');
        chapterId = getFirstChapterOfCurrentArc();
    }
    try {
        // Останавливаем все текущие операции
        clearChat();
        gameState.isBusy = false;
        gameState.dialogueEnded = false;
        gameState.generateMessage = false;

        let chapterPath;
        if (chapterId.startsWith('special_')) {
            // Для специальных глав
            chapterPath = `./chapters/special/${chapterId}.js`;
        } else if (gameState.arc === 1) {
            chapterPath = `./chapters/arc1/${chapterId}.js`;
        } else if (gameState.arc === 2) {
            chapterPath = `./chapters/arc2/${chapterId}.js`;
        }
        
        console.log('Loading chapter instant from path:', chapterPath);

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

        if (chapterModule.default.before) {
            chapterModule.default.before();
        }
        if (messages && messages.length > 0) {
            if (messages[0].type === "monolog-placeholder") {
                // Если это монолог, используем renderChapter с флагом instant
                renderChapter(chapterModule.default, true);
            } else {
                // Мгновенно добавляем все обычные сообщения
                messages.forEach(message => {
                    const msg = document.createElement('div');
                    msg.className = message.type === 'sent' ? 'message message-sent' : 'message message-received';
                    if (message.type === 'monolog') {
                        msg.className = 'message message-monolog';
                    }
                    msg.textContent = message.text;
                    if (message.type === 'photo') {
                        msg.className = message.photoSent ? 'message message-sent' : 'message message-received';
                        const img = document.createElement('img');
                        img.src = message.src;
                        img.className = 'chat-image';
                        img.alt = ''; // Добавляем alt для доступности
                        img.addEventListener('click', () => {
                            openFullscreenImage(img.src);
                        });
                        msg.appendChild(img);
                    }
                    chatContainer.appendChild(msg);
                });

                // Добавляем варианты выбора
                if (choices && choices.length > 0) {
                    renderChoices(choices, choicesContainer);
                }
            }
        } else if (choices && choices.length > 0) {
            renderChoices(choices, choicesContainer);
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

    // Пытаемся загрузить сохранённую игру ПЕРЕД началом новой
    if (!loadProgress()) {
        // Если сохранения нет, показываем стартовый экран
        const startScreen = document.querySelector('.start-screen');
        if (startScreen) {
            startScreen.classList.add('active');
        }
    }

    const startButton = document.querySelector('.start-game-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Начало новой игры');
            
            const startScreen = document.querySelector('.start-screen');
            if (startScreen) {
                startScreen.classList.remove('active');
            }

             // Проверяем, есть ли сохранение
             const hasProgress = loadProgress();
        
        if (!hasProgress) {
            // Очищаем только при НАМЕРЕННОМ начале новой игры
            gameState.choices = {};
            gameState.arc = 1;
            gameState.isBusy = false;
            gameState.dialogueEnded = false;
            gameState.isChapterEnding = false;
            gameState.boostyNotification = false;
            
            clearProgress();
            clearChat();

            loadChapter('chapter1');
        }
            
            const chatScreen = document.querySelector('[data-screen="chat"]');
            if (chatScreen) {
                chatScreen.classList.add('active');
            }
            
            showNavigation();
            
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
    restartChapterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        restartChapter();
    });
}

    const restartArcBtn = document.querySelector('.nav-btn--endGame');
    if (restartArcBtn) {
        restartArcBtn.addEventListener('click', () => {
            if (gameState.isBusy) return;

            startNewGame();
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
    clearProgress, // Добавляем в экспорт, если нужно
    clearChat,
    boostyNotification,
    languageManager: null
};

// Запускаем игру после загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  initGame();
});