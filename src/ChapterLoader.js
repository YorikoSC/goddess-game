export class ChapterLoader {
  constructor(messageRenderer, gameStateManager) {
    this.messageRenderer = messageRenderer;
    this.gameStateManager = gameStateManager;
    this.currentMessages = [];
    this.currentChoices = [];
  }

  async loadChapter(chapterId, isRestart = false) {
    try {
      const arc = this.gameStateManager.gameState.arc || 1;
      const chapterPath = `./chapters/arc${arc}/${chapterId}.js`;
      console.log(`Попытка загрузки: ${chapterPath}`);
      const chapterModule = await import(chapterPath);
      const chapter = chapterModule.default;
      const messages = chapter.getText(this.gameStateManager.gameState);
      const choices = chapter.getChoices(this.gameStateManager.gameState);

      this.currentMessages = messages;
      this.currentChoices = choices;

      if (isRestart) {
        this.messageRenderer.clearChat();
      }

      await this.renderChapter(messages, choices, isRestart);
    } catch (error) {
      console.error(`Ошибка загрузки главы ${chapterId}:`, error);
      this.messageRenderer.addMessage('system', 'Не удалось загрузить главу. Попробуйте начать новую игру.');
      this.gameStateManager.gameState.currentChapter = null;
    }
  }

  async renderChapter(messages, choices, isRestart = false) {
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    for (const message of messages) {
      const text = typeof message.text === 'object' ? message.text[currentLang] || message.text.ru || '' : message.text || '';
      const description = typeof message.description === 'object' ? message.description[currentLang] || message.description.ru || '' : message.description || '';

      this.messageRenderer.addMessage(message.type, text, message.src, description);
      console.log(`Добавлено сообщение: ${text}`); // Отладка

      if (message.onAfter) {
        message.onAfter();
      }

      await new Promise(resolve => setTimeout(resolve, message.delay || 1500));
    }

    if (choices.length > 0) {
      this.messageRenderer.renderChoices(choices);
    }

    requestAnimationFrame(() => {
      this.messageRenderer.chatContainer.scrollTop = this.messageRenderer.chatContainer.scrollHeight;
      console.log('Прокрутка выполнена'); // Отладка
    });
  }

  restartChapter(gameState) {
    this.loadChapter(gameState.currentChapter, true);
  }

  updateLanguage() {
    this.messageRenderer.clearChat();
    this.renderChapter(this.currentMessages, this.currentChoices, true);
  }
}