// game.js - основной файл игры

// Глобальный объект игры для доступа из HTML
import { determineSecondArcStart, saveGameState, loadGameState } from './ArcManager.js';
window.game = {};

// Состояние игры
const gameState = {
  currentChapter: null,
  choices: {}, // Сохранение выборов игрока
  arc: 1, // Текущая арка (1 или 2)
  language: 'ru', // Текущий язык
  isBusy: false, // Индикатор занятости (блокировка взаимодействия)
  dialogueEnded: false, // Флаг завершения диалога
  isChapterEnding: false, // Флаг окончания главы
  generateMessage: false // Флаг генерации сообщений
};

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
  const postsContainer = document.getElementById('posts');
  
  // Очищаем контейнер перед добавлением новых постов
  postsContainer.innerHTML = '';
  
  // Массив с данными о постах (пример)
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
  
  // Создаем элементы для каждого поста
  posts.forEach(post => {
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
        <p>${post.caption.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')}</p>
      </div>
    `;
    
    postsContainer.appendChild(postElement);
  });
  
  // Добавляем обработчики событий для лайков
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const isLiked = e.target.dataset.liked === 'true';
      const likesCount = parseInt(e.target.textContent.match(/\d+/)[0]);

      e.target.dataset.liked = !isLiked;
      e.target.textContent = `❤️ ${isLiked ? likesCount - 1 : likesCount + 1}`;
      e.target.style.color = isLiked ? '#fff' : '#ff0055';
    });
  });
  
  // Добавляем возможность просмотра изображений в полноэкранном режиме
  document.querySelectorAll('.post-image').forEach(img => {
    img.addEventListener('click', () => {
      openFullscreenImage(img.src);
    });
  });
  
  // Добавляем обработчики хэштегов
  document.querySelectorAll('.hashtag').forEach(hashtag => {
    hashtag.addEventListener('click', () => {
      alert(`Searching for ${hashtag.textContent}`);
      // Здесь можно реализовать функциональность поиска по хэштегам
    });
  });
}

// Функция открытия изображения в полноэкранном режиме
function openFullscreenImage(src) {
  // Создаем оверлей
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';

  // Создаем элемент изображения
  const img = document.createElement('img');
  img.src = src;
  img.className = 'fullscreen-image';

  // Создаем кнопку закрытия
  const closeBtn = document.createElement('button');
  closeBtn.className = 'fullscreen-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Добавляем элементы в оверлей
  overlay.appendChild(closeBtn);
  overlay.appendChild(img);

  // Добавляем оверлей в body
  document.body.appendChild(overlay);

  // Закрываем при клике вне изображения
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

// Загрузка главы
async function loadChapter(chapterId) {
    try {
        console.log(`Попытка загрузки главы: ${chapterId}, состояние isBusy:`, gameState.isBusy);
        
        gameState.isBusy = false;
        
        const chapterModule = await import(`./chapters/${chapterId}.js`);
        const chapter = chapterModule.default;
        
        if (!chapter) {
            console.error(`Ошибка: глава ${chapterId} не найдена`);
            return false;
        }
        
        gameState.currentChapter = chapterId;
        console.log(`Глава ${chapterId} успешно загружена`);
        
        if (chapter.translations) {
            // Если в главе есть переводы, устанавливаем их
            window.game.languageManager.setChapterTranslations(chapter.translations);
            
            // Очищаем чат и перерендериваем с новым языком
            const chatContainer = document.getElementById('chat');
            chatContainer.innerHTML = '';
            
            // Получаем сообщения для текущего языка
            const messages = chapter.getText(gameState);
            if (messages && messages.length > 0) {
                displayMessages(messages, chatContainer, () => {
                    const choices = chapter.getChoices ? chapter.getChoices(gameState) : [];
                    if (choices && choices.length > 0) {
                        renderChoices(choices, document.getElementById('choices'));
                    }
                });
            }
        } else {
            // Рендерим главу как обычно
            renderChapter(chapter);
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
  
  // Создаем массив промисов для каждого сообщения
  const messagePromises = messages.map((message, index) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Создаем элемент сообщения
        addMessage(message.type, message.text, container);
        resolve();
      }, message.delay || 1000);
    });
  });
  
  // Обрабатываем все промисы последовательно
  Promise.all(messagePromises).then(() => {
    // Устанавливаем флаг generateMessage в false после добавления всех сообщений
    gameState.generateMessage = false;
    disabledButtons(gameState.generateMessage);
    
    if (onComplete) onComplete();
  });
}

// Добавление сообщения в чат
function addMessage(type, text, container) {
    const msg = document.createElement('div');
    msg.className = type === 'sent' ? 'message message-sent' : 'message message-received';
    
    // Добавляем ID сообщения для перевода
    const messageId = `msg_${Date.now()}`;
    msg.dataset.messageId = messageId;
    
    // Если есть переводы, используем текст для текущего языка
    if (window.game.languageManager && window.game.languageManager.chapterTranslations) {
        const currentLang = window.game.languageManager.currentLang;
        const translations = window.game.languageManager.chapterTranslations[currentLang];
        if (translations && translations[messageId]) {
            text = translations[messageId];
        }
    }
    
    msg.textContent = text;
    container.appendChild(msg);
    
    // Проверяем, содержит ли текст плейсхолдер для фото
    if (text.includes('{photo_name_')) {
        // Извлекаем номер фото из плейсхолдера
        const photoRegex = /{photo_name_(\d+)}/;
        const match = text.match(photoRegex);
        
        if (match && match[1]) {
            const photoNumber = match[1];
            const photoName = `photo_name_${photoNumber}.jpg`; // Предполагаем, что фотографии называются photo_name_1.jpg, photo_name_2.jpg и т.д.
            
            // Заменяем плейсхолдер пустой строкой
            const textWithoutPhoto = text.replace(photoRegex, '');
            
            // Если есть текст до или после фото, добавляем его
            if (textWithoutPhoto.trim() !== '') {
                msg.textContent = textWithoutPhoto;
            }
            
            // Создаем и добавляем изображение
            const img = document.createElement('img');
            img.src = `./img/photos/${photoName}`;
            img.alt = `Photo ${photoNumber}`;
            img.className = 'message-image';
            img.addEventListener('click', () => {
                openFullscreenImage(img.src);
            });
            
            msg.appendChild(img);
        } else {
            // Если регулярное выражение не сработало, просто показываем текст как есть
            msg.textContent = text;
        }
    } else {
        // Нет плейсхолдера для фото, просто устанавливаем текст
        msg.textContent = text;
    }
    
    // Сохраняем текст для перевода
    if (window.game.languageManager) {
        window.game.languageManager.chapterTranslations.ru[messageId] = text;
        // Здесь должен быть английский вариант текста из главы
        window.game.languageManager.chapterTranslations.en[messageId] = text;
    }
    
    // Проигрываем звук для полученных сообщений
    if (type === 'received') {
        playMessageSound();
    }
    
    // Прокручиваем вниз
    setTimeout(() => {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

// Отображение содержимого главы
function renderChapter(chapter) {
    if (!chapter || typeof chapter.getText !== 'function') {
        console.error('Неверный формат главы');
        return;
    }

    const chatContainer = document.getElementById('chat');
    const choicesContainer = document.getElementById('choices');
    
    // Очищаем контейнер выборов
    choicesContainer.innerHTML = '';
    
    // Получаем выборы
    const choices = chapter.getChoices ? chapter.getChoices(gameState) : [];
    
    // Проверяем, является ли это стартовой главой
    if (gameState.currentChapter === 'start') {
        console.log('Рендеринг стартовой главы');
        renderChoices(choices, choicesContainer);
        return;
    }
    
    // Для обычных глав получаем сообщения
    const messages = chapter.getText(gameState);
    
    // Обрабатываем сообщения и выборы
    if (messages && messages.length > 0) {
        gameState.isBusy = true;
        displayMessages(messages, chatContainer, () => {
            gameState.isBusy = false;
            if (choices && choices.length > 0) {
                renderChoices(choices, choicesContainer);
            }
        });
    } else if (choices && choices.length > 0) {
        renderChoices(choices, choicesContainer);
    }
}

// Отображение вариантов выбора
function renderChoices(choices, container) {
    container.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.className = 'choice-btn';
        
        // Добавляем ID выбора для перевода
        const choiceId = `choice_${gameState.currentChapter}_${index}`;
        choiceButton.dataset.choiceId = choiceId;
        
        choiceButton.textContent = choice.text;
        choiceButton.dataset.choice = index;
        
        // Сохраняем текст для перевода
        if (window.game.languageManager) {
            window.game.languageManager.chapterTranslations.ru[choiceId] = choice.text;
            // Здесь должен быть английский вариант текста из главы
            window.game.languageManager.chapterTranslations.en[choiceId] = choice.text;
        }
        
        choiceButton.addEventListener('click', async () => {
            if (gameState.isBusy || gameState.dialogueEnded) return;
            
            gameState.isBusy = true;
            container.innerHTML = '';
            
            // Для стартового сообщения не добавляем его в чат
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
  // Не проверяем завершение арки, если это стартовая глава
  if (gameState.currentChapter === 'start' || !gameState.currentChapter) {
    return null;
  }

  // Проверка завершения первой арки
  if (gameState.arc === 1) {
    // Более строгая проверка завершения арки 1
    const requiredChapters = ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'];
    const completedChapters = requiredChapters.filter(chapter => 
      gameState.choices[chapter] && Object.keys(gameState.choices[chapter]).length > 0
    );

    if (completedChapters.length === requiredChapters.length) {
      gameState.arc = 2;
      return determineArc2StartingChapter();
    }
  }
  
  // Проверка завершения второй арки
  if (gameState.arc === 2) {
    // Аналогичная проверка для арки 2
    const isFinalChapter = gameState.currentChapter.includes('_final');
    if (isFinalChapter) {
      return 'endgame'; // Специальное значение для финала
    }
  }

  return null;
}

// Определение начальной главы второй арки
function determineArc2StartingChapter() {
  return determineSecondArcStart(gameState);
}

// Отображение экрана окончания главы
function showEndgameScreen() {
  document.querySelector('[data-screen="endgame"]').classList.add('active');
  document.querySelector('[data-screen="chat"]').classList.remove('active');
  
  // Скрываем навигацию
  hideNavigation();
  
  // Настройка кнопки для начала новой главы
  document.querySelector('.start-new-chapter').addEventListener('click', () => {
    startSecondArc();
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

// Начало второй арки
function startSecondArc() {
  document.querySelector('[data-screen="endgame"]').classList.remove('active');
  document.querySelector('[data-screen="chat"]').classList.add('active');
  
  // Показываем навигацию
  showNavigation();
  
  // Очищаем чат
  document.getElementById('chat').innerHTML = '';
  
  // Загружаем первую главу второй арки
  const startingChapter = determineArc2StartingChapter();
  loadChapter(startingChapter);
  
  gameState.isBusy = false;
  gameState.dialogueEnded = false;
  gameState.isChapterEnding = false;
}

// Функция для переключения между экранами
function showScreen(screenId) {
  // Получаем активный экран перед изменениями
  const currentActiveScreen = document.querySelector('.screen.active');
  
  // Если мы покидаем экран endgame, показываем навигацию снова
  if (currentActiveScreen && currentActiveScreen.dataset.screen === 'endgame') {
    showNavigation();
  }
  
  // Если мы покидаем экран чата, мы можем захотеть отменить продолжающийся вывод сообщений
  if (currentActiveScreen && currentActiveScreen.dataset.screen === 'chat' && screenId !== 'chat') {
    // Сбрасываем состояние чата, если мы переходим от него
    gameState.isBusy = false;
    gameState.dialogueEnded = false;
  }
  
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Показываем выбранный экран - используем более надежный селектор и проверяем его существование
  const targetScreen = document.querySelector(`.screen[data-screen="${screenId}"]`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    
    // Обновляем кнопки навигации
    if (screenId !== 'endgame') {
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
      });
    }
    
    // Если мы показываем экран endgame, скрываем навигацию
    if (screenId === 'endgame') {
      hideNavigation();
    }
    
    // Если переключаемся на PureGram, загружаем посты
    if (screenId === 'puregram') {
      loadPuregramPosts();
    }
  } else {
    console.error(`Экран с именем "${screenId}" не найден`);
  }
}

// Начало новой игры
function startNewGame() {
  // Очищаем состояние игры
  gameState.choices = {};
  gameState.arc = 1;
  gameState.isBusy = false;
  gameState.dialogueEnded = false;
  gameState.isChapterEnding = false;
  gameState.generateMessage = false;
  gameState.currentChapter = null;
  
  // Очищаем сохраненный прогресс
  clearProgress();
  
  // Очищаем чат
  clearChat();
  
  // Возвращаемся на экран чата
  showScreen('chat');
  
  // Показываем навигацию
  showNavigation();
  
  // Загружаем start.js
  loadChapter('start');
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
  // Сначала пробуем загрузить через ArcManager
  const savedState = loadGameState();
  
  if (savedState) {
    // Используем сохранение из ArcManager
    gameState.language = savedState.language || 'ru';
    gameState.arc = savedState.arc || 1;
    gameState.currentChapter = savedState.currentChapter || 'start';
    gameState.choices = savedState.choices || {};
    
    console.log('Прогресс загружен через ArcManager:', savedState);
    
    // Загружаем текущую главу
    loadChapter(gameState.currentChapter);
    
    return true;
  }
  
  // Если не нашли через ArcManager, используем старый метод (для обратной совместимости)
  const savedProgress = localStorage.getItem('gameProgress');
  
  if (savedProgress) {
    try {
      // Оставшийся код без изменений...
      // ...
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

// Инициализация игры
function initGame() {
    // Создаем экземпляр LanguageManager и сохраняем его в глобальном объекте game
    window.game.languageManager = new LanguageManager();
    
    // Обновляем время
    updateClock();
    setInterval(updateClock, 60000);
    
    // Настраиваем кнопки навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            showScreen(screenId);
        });
    });

    // Настраиваем кнопку "Начать новую игру"
    document.querySelector('.nav-btn--endGame').addEventListener('click', () => {
        startNewGame();
    });

    // Настраиваем кнопку "Начать главу заново"
    document.querySelector('.start-chapter-over').addEventListener('click', async () => {
        if (gameState.isBusy) return;
        
        gameState.isBusy = true;
        
        // Очищаем чат
        clearChat();
        
        // Сохраняем текущую главу
        const currentChapter = gameState.currentChapter;
        
        // Сбрасываем выборы только для текущей главы
        if (gameState.choices[currentChapter]) {
            delete gameState.choices[currentChapter];
        }
        
        // Перезагружаем текущую главу
        await loadChapter(currentChapter);
        
        gameState.isBusy = false;
    });

    // Экспортируем функции для доступа из HTML
    window.game.showScreen = showScreen;
    window.game.startNewGame = startNewGame;
    window.game.saveGame = saveGame;
    window.game.loadGame = loadGame;
    window.game.openFullscreenImage = openFullscreenImage;

    // Загружаем начальную главу
    loadChapter('start');
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
    languageManager: null // Будет установлен в initGame
};

// Запускаем игру после загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  initGame();
  // Удаляем автоматический вызов startNewGame()
});