export class ChapterLoader {
  constructor(messageRenderer, gameStateManager) {
    this.messageRenderer = messageRenderer;
    this.gameStateManager = gameStateManager;
    this.currentMessages = [];
    this.currentChoices = [];
    this.currentMessageIndex = 0; // Исправлено название поля
  }

  async loadChapter(chapterId, isRestart = false) {
    try {
      if (!chapterId) {
        console.warn('chapterId не указан, используется chapter1');
        chapterId = 'chapter1';
      }
      const arc = this.gameStateManager.gameState.arc || 1;
      const chapterPath = `./chapters/arc${arc}/${chapterId}.js`;
      console.log(`Попытка загрузки: ${chapterPath}`);
      const chapterModule = await import(chapterPath);
      const chapter = chapterModule.default;
      const messages = chapter.getText(this.gameStateManager.gameState);
      const choices = chapter.getChoices(this.gameStateManager.gameState);

      this.currentMessages = messages;
      this.currentChoices = choices;
      this.currentMessageIndex = isRestart ? 0 : this.currentMessageIndex;

      if (isRestart) {
        this.messageRenderer.clearChat();
      }

      this.gameStateManager.gameState.currentChapter = chapterId;
      this.gameStateManager.saveProgress();

      await this.renderChapter(messages, choices, isRestart);
    } catch (error) {
      console.error(`Ошибка загрузки главы ${chapterId}:`, error);
      this.messageRenderer.addMessage('system', 'Не удалось загрузить главу. Попробуйте начать новую игру.');
      this.gameStateManager.gameState.currentChapter = 'chapter1';
    }
  }

  async renderChapter(messages, choices, isRestart = false) {
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    let stopAtIndex = isRestart ? this.gameStateManager.gameState.lastChoiceIndex : null;

    if (isRestart && stopAtIndex !== null) {
      for (let i = 0; i <= stopAtIndex && i < messages.length; i++) {
        const message = messages[i];
        const text = typeof message.text === 'object' ? message.text[currentLang] || message.text.ru || '' : message.text || '';
        const description = typeof message.description === 'object' ? message.description[currentLang] || message.description.ru || '' : message.description || '';

        this.messageRenderer.addMessage(message.type, text, message.src, description);
        console.log(`Добавлено сообщение (перезапуск): ${text}`);

        if (message.onAfter) {
          message.onAfter();
        }
        this.currentMessageIndex = i + 1;
      }

      if (choices.length > 0) {
        this.messageRenderer.renderChoices(choices);
      }
    } else {
      for (let i = this.currentMessageIndex; i < messages.length; i++) {
        const message = messages[i];
        const text = typeof message.text === 'object' ? message.text[currentLang] || message.text.ru || '' : message.text || '';
        const description = typeof message.description === 'object' ? message.description[currentLang] || message.description.ru || '' : message.description || '';

        this.messageRenderer.addMessage(message.type, text, message.src, description);
        console.log(`Добавлено сообщение: ${text}`);

        if (message.onAfter) {
          message.onAfter();
        }

        this.currentMessageIndex = i + 1;
        await new Promise(resolve => setTimeout(resolve, message.delay || 1500));

        if (i === stopAtIndex || (choices.length > 0 && i === messages.length - 1)) {
          break;
        }
      }

      if (choices.length > 0 && this.currentMessageIndex >= messages.length) {
        this.messageRenderer.renderChoices(choices);
      }
    }

    requestAnimationFrame(() => {
      this.messageRenderer.chatContainer.scrollTop = this.messageRenderer.chatContainer.scrollHeight;
      console.log('Прокрутка выполнена');
    });
  }

  restartChapter(gameState) {
    const chapterId = gameState.currentChapter || 'chapter1';
    console.log(`Перезапуск главы: ${chapterId}`);
    this.currentMessageIndex = 0; // Сбрасываем индекс
    this.loadChapter(chapterId, true);
  }

  updateLanguage() {
    this.messageRenderer.clearChat();
    const messages = this.currentMessages;
    const choices = this.currentChoices;
    const stopAtIndex = this.gameStateManager.gameState.lastChoiceIndex || this.currentMessages.length - 1;

    const currentLang = this.gameStateManager.gameState.language || 'ru';
    for (let i = 0; i <= stopAtIndex && i < messages.length; i++) {
      const message = messages[i];
      const text = typeof message.text === 'object' ? message.text[currentLang] || message.text.ru || '' : message.text || '';
      const description = typeof message.description === 'object' ? description[currentLang] || message.description.ru || '' : message.description || '';

      this.messageRenderer.addMessage(message.type, text, message.src, description);
      console.log(`Добавлено сообщение (смена языка): ${text}`);

      if (message.onAfter) {
        message.onAfter();
      }
    }

    if (choices.length > 0 && this.currentMessageIndex >= messages.length) {
      this.messageRenderer.renderChoices(choices);
    }

    requestAnimationFrame(() => {
      this.messageRenderer.chatContainer.scrollTop = this.messageRenderer.chatContainer.scrollHeight;
    });
  }
}