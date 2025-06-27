import { gameState } from './gameState.js';

export const saveManager = {
  saveProgress() {
    const progress = {
      chapter: gameState.currentChapter,
      arc: gameState.arc,
      language: gameState.language,
      choices: gameState.choices,
      lastCheckpoint: gameState.lastCheckpoint
    };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    console.log('Прогресс сохранён:', progress);
  },

  loadProgress() {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      Object.assign(gameState, progress);
      console.log('Прогресс загружен:', progress);
      return true;
    }
    return false;
  },

  clearProgress() {
    localStorage.removeItem('gameProgress');
    gameState.lastCheckpoint = { chapter: 'chapter1', choices: {}, arc: 1 };
    console.log('Прогресс очищен');
  },

  autoSave() {
    this.saveProgress();
  }
};