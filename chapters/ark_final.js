export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Well, it's so late already. Time to go to sleep! I'm going, and you shouldn't stay up too late either",
      msg2: "Yeaaah, you're right. I'll go to bed soon too"
    } : {
      msg1: "Ладно, уже так поздно. Спать пора! Я пойду, и ты долго не сиди",
      msg2: "Дааа, ты права. Пойду тогда тоже понемногу"
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "sent",
        text: texts.msg2,
        delay: 2500
      }
    ];
  },

  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      title: "First Arc Completed!",
      message: "Your choices have determined your path...",
      thanks: "Thank you for playing!",
      next: "Next"
    } : {
      title: "Первая арка завершена!",
      message: "Ваши выборы определили ваш путь...",
      thanks: "Спасибо за игру!",
      next: "Далее"
    };

    // Create and show overlay
    const overlay = document.createElement('div');
    overlay.className = 'arc-completion';
    
    const content = document.createElement('div');
    content.className = 'arc-completion-content';
    content.innerHTML = `
      <h2>${texts.title}</h2>
      <p>${texts.message}</p>
      <p>${texts.thanks}</p>
      <button class="choice-btn next-btn">${texts.next}</button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Handle next button click using global game object
    const nextButton = content.querySelector('.next-btn');
    nextButton.addEventListener('click', () => {
      overlay.remove();
      // Сохраняем состояние перед переходом
      window.game.saveGameState(gameState);
      // Определяем следующую главу
      const nextChapter = window.game.determineSecondArcStart(gameState) 
          ? 'arc2_placeholder' 
          : 'start';
      // Загружаем следующую главу
      window.game.loadChapter(nextChapter);
    });

    return []; // No choices needed
  },

  isPrintable() {
    return false;
  }
};