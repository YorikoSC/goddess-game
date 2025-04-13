export default {
  getText(gameState) {
    return []; // Empty since we'll show overlay instead
  },

  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      title: "Arc 2 is under development",
      message: "Thank you for playing!",
      explore: "You can explore other story paths",
      restart: "Start Arc Again"
    } : {
      title: "Арка 2 находится в разработке",
      message: "Спасибо за игру!",
      explore: "Вы можете исследовать другие варианты развития событий",
      restart: "Начать арку заново"
    };

    // Create and show overlay
    const overlay = document.createElement('div');
    overlay.className = 'arc-completion';
    
    const content = document.createElement('div');
    content.className = 'arc-completion-content';
    content.innerHTML = `
      <h2>${texts.title}</h2>
      <p>${texts.message}</p>
      <p>${texts.explore}</p>
      <button class="choice-btn restart-btn">${texts.restart}</button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Handle restart button click
    const restartButton = content.querySelector('.restart-btn');
    restartButton.addEventListener('click', () => {
      overlay.remove();
      // Сбрасываем выборы игрока
      gameState.choices = {};
      loadChapter('start');
    });

    return [];
  },

  isPrintable() {
    return false;
  }
};