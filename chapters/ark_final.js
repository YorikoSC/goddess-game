import { determineSecondArcStart, saveGameState } from '../ArcManager.js';

export default {
  getText(gameState) {
    // Используем ArcManager для определения следующей арки
    const arcCompleted = determineSecondArcStart(gameState);
    
    const texts = gameState.language === 'en' ? {
      msg1: "First arc completed!",
      msg2: arcCompleted ? "Your choices have determined your path..." : "To be continued...",
      msg3: "Thank you for playing!"
    } : {
      msg1: "Первая арка завершена!",
      msg2: arcCompleted ? "Ваши выборы определили ваш путь..." : "Продолжение следует...",
      msg3: "Спасибо за игру!"
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 2000
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 3000
      }
    ];
  },

  getChoices(gameState) {
    // Сохраняем состояние игры
    saveGameState(gameState);
    
    const texts = gameState.language === 'en' ? {
      choice: "Close"
    } : {
      choice: "Закрыть"
    };

    return [
      {
        id: "end_arc",
        text: texts.choice,
        result: [],
        nextChapter: null
      }
    ];
  },

  isPrintable() {
    return true;
  }
};

