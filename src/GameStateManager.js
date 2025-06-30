export class GameStateManager {
  constructor() {
    this.gameState = {
      currentChapter: null,
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
      chats: {
        lina: {
          name: { ru: 'Лина', en: 'Lina' },
          avatar: 'img/lina_avatar.jpg',
          unread: 0,
          isActive: true,
        },
        amina: {
          name: { ru: 'Амина', en: 'Amina' },
          avatar: 'img/amina_avatar.jpg',
          unread: 0,
          isActive: false,
        },
      },
      currentChat: 'lina',
    };
    this.chapterPosts = JSON.parse(localStorage.getItem('chapterPosts')) || [];
    this.allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
  }

  saveProgress() {
    const progress = {
      chapter: this.gameState.currentChapter,
      arc: this.gameState.arc,
      language: this.gameState.language,
      choices: this.gameState.choices,
      lastCheckpoint: this.gameState.lastCheckpoint,
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
    console.log('Прогресс очищен');
    this.gameState.lastCheckpoint = {
      chapter: 'chapter1',
      choices: {},
      arc: 1,
    };
  }

  startNewGame() {
    this.gameState.choices = {};
    this.gameState.arc = 1;
    this.gameState.isBusy = false;
    this.gameState.dialogueEnded = false;
    this.gameState.isChapterEnding = false;
    this.gameState.generateMessage = false;
    this.gameState.currentChapter = null;
    this.gameState.boostyNotification = false;
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