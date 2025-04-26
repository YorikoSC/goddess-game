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
      // Удаляем оверлей
      overlay.remove();
      
      // Очищаем состояние игры
      gameState.choices = {};
      gameState.arc = 1;
      gameState.isBusy = false;
      gameState.dialogueEnded = false;
      gameState.isChapterEnding = false;
      gameState.generateMessage = false;
      gameState.currentChapter = null;
      gameState.previousChapter = null;
      
      // Очищаем сохранения и чат
      if (window.clearProgress) {
        window.clearProgress();
      }
      if (window.clearChat) {
        window.clearChat();
      }
      
      // Показываем экран чата
      const chatScreen = document.querySelector('[data-screen="chat"]');
      if (chatScreen) {
        document.querySelectorAll('.screen').forEach(screen => {
          screen.classList.remove('active');
        });
        chatScreen.classList.add('active');
      }
      
      // Загружаем первую главу
      if (window.loadChapter) {
        window.loadChapter('chapter1');
      }
      
      // Показываем навигацию
      if (window.showNavigation) {
        window.showNavigation();
      }
    });

    return [];
  },

  isPrintable() {
    return false;
  }
};