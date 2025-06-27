import { gameState } from './gameState.js';

export const languageManager = {
  /**
   * Установить язык
   * @param {'ru'|'en'} lang
   */
  setLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    gameState.language = lang;
    // Здесь можно добавить вызов функции обновления UI
    console.log(`Язык установлен: ${lang}`);
  },

  /**
   * Переключить язык
   */
  toggleLanguage() {
    gameState.language = gameState.language === 'ru' ? 'en' : 'ru';
    // Здесь можно добавить вызов функции обновления UI
    console.log(`Язык переключён: ${gameState.language}`);
  }
};