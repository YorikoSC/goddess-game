export class ChapterLoader {
  constructor(messageRenderer, gameStateManager) {
    this.messageRenderer = messageRenderer;
    this.gameStateManager = gameStateManager;
    this.currentMessages = [];
    this.currentChoices = [];
  }

  async loadChapter(chapterId, isRestart = false) {
    try {
      if (!chapterId) {
        console.warn('chapterId не указан, используется chapter1');
        chapterId = 'chapter1';
      }
      const arc = this.gameStateManager.gameState.arc || 1;
      const chapterPath = `/chapters/arc${arc}/${chapterId}.js`;
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

      this.gameStateManager.gameState.currentChapter = chapterId;
      this.gameStateManager.saveProgress();

      await this.renderChapter(messages, choices);
    } catch (error) {
      console.error(`Ошибка загрузки главы ${chapterId}:`, error);
      this.messageRenderer.addMessage('system', 'Не удалось загрузить главу. Попробуйте начать новую игру.');
      this.gameStateManager.gameState.currentChapter = 'chapter1';
    }
  }

  async renderChapter(messages, choices) {
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    console.log(`Рендеринг главы, сообщений=${messages.length}`);

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const text = typeof message.text === 'object' ? message.text[currentLang] || message.text.ru || '' : message.text || '';
      const description = typeof message.description === 'object' ? description[currentLang] || message.description.ru || '' : message.description || '';

      console.log(`Рендеринг сообщения ${i + 1}/${messages.length}: ${text}, задержка: ${message.delay || 1500}ms`);
      this.messageRenderer.addMessage(message.type, text, message.src, description);

      if (message.onAfter) {
        message.onAfter();
      }

      await new Promise(resolve => setTimeout(resolve, message.delay || 1500));
      console.log(`Задержка ${message.delay || 1500}ms завершена для сообщения ${i + 1}`);

      if (message.showChoices || (choices.length > 0 && i === messages.length - 1)) {
        console.log('Прерываем цикл для показа выборов');
        break;
      }
    }

    if (choices.length > 0) {
      console.log('Рендерим варианты выбора');
      this.messageRenderer.renderChoices(choices);
    }

    requestAnimationFrame(() => {
      this.messageRenderer.chatContainer.scrollTop = this.messageRenderer.chatContainer.scrollHeight;
      console.log('Прокрутка выполнена');
    });
  }

  restartChapter(gameState) {
    const chapterId = gameState.currentChapter || 'chapter1';
    console.log(`Перезапуск главы: ${chapterId}`);
    this.loadChapter(chapterId, true);
  }

  updateLanguage() {
    this.messageRenderer.clearChat();
    console.log('Чат очищен для смены языка');

    const chapterId = this.gameStateManager.gameState.currentChapter || 'chapter1';
    console.log(`Смена языка: перезагружаем главу ${chapterId} с начала`);

    this.loadChapter(chapterId, true);
  }
}