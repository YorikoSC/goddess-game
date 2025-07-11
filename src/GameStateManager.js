export class GameStateManager {
  constructor() {
    this.gameState = {
      currentChapter: 'chapter1',
      choices: {},
      arc: 1,
      language: 'ru',
      isBusy: false,
      dialogueEnded: false,
      isChapterEnding: false,
      generateMessage: false,
      previousChapter: null,
      boostyNotification: false,
      lastCheckpoint: {
        chapter: null,
        choices: {},
      },
      lastChoiceIndex: null,
      chats: {
        lina: {
          name: { ru: 'Лина', en: 'Lina' },
          avatar: 'img/lina_avatar.webp',
          unread: 0,
          isActive: true,
        },
        amina: {
          name: { ru: 'Амина', en: 'Amina' },
          avatar: 'img/amina_avatar.webp',
          unread: 0,
          isActive: false,
        },
      },
      currentChat: 'lina',
    };
    this.chapterPosts = JSON.parse(localStorage.getItem('chapterPosts')) || [];
    this.allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
    console.log('GameStateManager инициализирован, clearProgress доступен:', typeof this.clearProgress === 'function');
  }

  saveProgress() {
    const progress = {
      chapter: this.gameState.currentChapter,
      arc: this.gameState.arc,
      language: this.gameState.language,
      choices: this.gameState.choices,
      lastCheckpoint: this.gameState.lastCheckpoint,
      lastChoiceIndex: this.gameState.lastChoiceIndex,
    };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    console.log('Прогресс сохранен:', progress);
  }

  loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        this.gameState.currentChapter = progress.chapter || 'chapter1';
        this.gameState.arc = progress.arc || 1;
        this.gameState.language = progress.language || 'ru';
        this.gameState.choices = progress.choices || {};
        this.gameState.lastCheckpoint = progress.lastCheckpoint || {
          chapter: 'chapter1',
          choices: {},
          arc: 1,
        };
        this.gameState.lastChoiceIndex = progress.lastChoiceIndex || null;
        console.log('Прогресс загружен:', progress);
        return true;
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        return false;
      }
    }
    return false;
  }

  clearProgress() {
    localStorage.removeItem('gameProgress');
    localStorage.removeItem('chapterPosts');
    localStorage.removeItem('allPosts');
    this.chapterPosts = [];
    this.allPosts = [];
    this.gameState.lastCheckpoint = {
      chapter: 'chapter1',
      choices: {},
      arc: 1,
    };
    this.gameState.lastChoiceIndex = null;
    console.log('Прогресс очищен');
  }

  startNewGame() {
    this.gameState.choices = {};
    this.gameState.arc = 1;
    this.gameState.isBusy = false;
    this.gameState.dialogueEnded = false;
    this.gameState.isChapterEnding = false;
    this.gameState.generateMessage = false;
    this.gameState.currentChapter = 'chapter1';
    this.gameState.boostyNotification = false;
    this.gameState.lastChoiceIndex = null;
    this.clearProgress();
    this.chapterPosts = [];
    this.allPosts = [];
    localStorage.removeItem('chapterPosts');
    localStorage.removeItem('allPosts');
  }

  addPost(post) {
    this.chapterPosts.unshift(post);
    this.allPosts.unshift(post);
    localStorage.setItem('chapterPosts', JSON.stringify(this.chapterPosts));
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts));
  }
}