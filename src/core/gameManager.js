import { gameState } from './gameState.js';
import { chapterManager } from './chapterManager.js';
import { saveManager } from './saveManager.js';

export const gameManager = {
  startNewGame() {
    gameState.choices = {};
    gameState.arc = 1;
    gameState.isBusy = false;
    gameState.dialogueEnded = false;
    gameState.isChapterEnding = false;
    gameState.generateMessage = false;
    gameState.currentChapter = null;
    gameState.boostyNotification = false;
    gameState.lastCheckpoint = { chapter: 'chapter1', choices: {}, arc: 1 };
    saveManager.clearProgress();
    // Можно добавить очистку UI и запуск первой главы
    chapterManager.loadChapter('chapter1');
  },

  startSecondArc() {
    // Здесь должна быть логика определения следующей главы второй арки
    // Например:
    // const nextChapter = determineSecondArcStart(gameState);
    // if (nextChapter) chapterManager.loadChapter(nextChapter);
    // else ... (обработка ошибки)
    // Пока оставим заглушку
    console.log('Запуск второй арки');
  },

  restartChapter() {
    if (gameState.currentChapter) {
      chapterManager.loadChapter(gameState.currentChapter);
    }
  },

  clearProgress() {
    saveManager.clearProgress();
    gameState.choices = {};
    gameState.arc = 1;
    gameState.currentChapter = null;
    gameState.lastCheckpoint = { chapter: null, choices: {}, arc: 1 };
  }
};