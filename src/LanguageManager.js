// LanguageManager.js
export class LanguageManager {
  constructor(gameStateManager, chapterLoader, screenManager) {
    this.gameStateManager = gameStateManager;
    this.chapterLoader = chapterLoader;
    this.screenManager = screenManager;
    this.currentLang = this.gameStateManager.gameState.language;
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
        'boostyText': 'Спасибо, что играете в мою игру! Я прилагаю все усилия для скорейшего продолжения истории! Вы можете поддержать меня на Boosty - это поможет в развитии проекта!',
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
        'boostyText': 'Thank you for playing my game! I\'m doing my best to continue the story as soon as possible! You can support me on Boosty - this will help in the development of the project!',
        'boostyButton': 'Support on Boosty',
        'boostyAdditionalText': 'Start new game'
      }
    };
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
    this.gameStateManager.gameState.language = this.currentLang;
    this.updateTexts();
    this.chapterLoader.updateLanguage(); // Обновляем чат
    this.screenManager.updatePostsLanguage(); // Обновляем посты в PureGram
    this.gameStateManager.saveProgress();
  }

  updateTexts() {
    document.querySelector('.endgame-content h2').textContent = this.translations[this.currentLang]['end-chapter'];
    document.querySelector('.endgame-content p:nth-child(2)').textContent = this.translations[this.currentLang]['thanks'];
    document.querySelector('.endgame-content p:nth-child(3)').textContent = this.translations[this.currentLang]['to-be-continued'];
    document.querySelector('.start-new-chapter').textContent = this.translations[this.currentLang]['new-chapter'];
    document.querySelector('.nav-btn--endGame').title = this.translations[this.currentLang]['new-game'];
    document.querySelector('.start-chapter-over').title = this.translations[this.currentLang]['restart-chapter'];
    document.querySelector('.lang-btn').title = this.translations[this.currentLang]['change-lang'];
    document.querySelector('.online-status').textContent = this.translations[this.currentLang]['online'];
    document.querySelector('.boosty-overlay-text').textContent = this.translations[this.currentLang]['boostyText'];
    document.querySelector('.boosty-overlay-button').textContent = this.translations[this.currentLang]['boostyButton'];
    document.querySelector('.boosty-overlay-additional-text').textContent = this.translations[this.currentLang]['boostyAdditionalText'];
  }
}