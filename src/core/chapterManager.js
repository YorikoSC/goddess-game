import { gameState } from './gameState.js';

export const chapterManager = {
  /**
   * Загрузка главы по её идентификатору
   * @param {string} chapterId
   */
  async loadChapter(chapterId) {
    gameState.currentChapter = chapterId;
    // Здесь должна быть логика загрузки и отображения главы
    // Например: await fetchChapterData(chapterId);
    // renderChapter(chapterId);
    // Пока оставим заглушку
    console.log(`Глава ${chapterId} загружена`);
  },

  /**
   * Мгновенная загрузка главы (без анимаций и задержек)
   * @param {string} chapterId
   */
  async loadChapterInstant(chapterId) {
    gameState.currentChapter = chapterId;
    // Здесь логика мгновенной загрузки
    console.log(`Глава ${chapterId} мгновенно загружена`);
  },

  /**
   * Получить первую главу текущей арки
   * @returns {string}
   */
  getFirstChapterOfCurrentArc() {
    if (gameState.arc === 1) {
      return 'chapter1';
    }
    // Добавить логику для других арок
    return 'chapter1'; // fallback
  }
};