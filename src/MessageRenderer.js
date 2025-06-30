export class MessageRenderer {
  constructor(chatContainer, choicesContainer, gameStateManager) {
    this.chatContainer = chatContainer;
    this.choicesContainer = choicesContainer;
    this.gameStateManager = gameStateManager;
  }

  addMessage(type, text, image, description) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;

    // Извлекаем текст и описание для текущего языка
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    const messageText = typeof text === 'object' ? text[currentLang] || text.ru || '' : text || '';
    const messageDescription = typeof description === 'object' ? description[currentLang] || description.ru || '' : description || '';

    // Формируем содержимое сообщения
    if (messageText) {
      messageDiv.innerHTML = `
        <div class="message-text">${messageText}</div>
        ${image ? `<img src="${image}" class="chat-image" alt="Message Image" onclick="window.game.openFullscreenImage('${image}')">` : ''}
      `;
    } else if (image) {
      messageDiv.innerHTML = `
        <img src="${image}" class="chat-image" alt="Message Image" onclick="window.game.openFullscreenImage('${image}')">
        ${messageDescription ? `<div class="message-description">${messageDescription}</div>` : ''}
      `;
    } else {
      messageDiv.textContent = messageText;
    }

    this.chatContainer.appendChild(messageDiv);

    // Прокрутка к последнему сообщению
    requestAnimationFrame(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    });

    // Воспроизведение звука для полученных сообщений (не системных)
    if (type === 'received' && messageText !== 'system') {
      this.playMessageSound();
    }
  }

  playMessageSound() {
    const audio = new Audio('sounds/msg.mp3');
    audio.play().catch(error => console.error('Ошибка воспроизведения звука:', error));
  }

  renderChoices(choices) {
    this.choicesContainer.innerHTML = '';
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.className = 'choice-button';
      button.textContent = typeof choice.text === 'object' ? choice.text[currentLang] || choice.text.ru : choice.text;
      button.addEventListener('click', () => {
        this.handleChoice(choice);
      });
      this.choicesContainer.appendChild(button);
    });
    this.choicesContainer.classList.add('visible');
    this.chatContainer.classList.add('has-choices'); // Добавляем класс для сдвига чата
    requestAnimationFrame(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight; // Прокрутка после показа вариантов
    });
  }

  handleChoice(choice) {
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    const choiceText = typeof choice.text === 'object' ? choice.text[currentLang] || choice.text.ru : choice.text;
    console.log(`Выбран вариант: ${choiceText}`);

    // Добавляем текст выбранного варианта как отправленное сообщение
    this.addMessage('sent', choiceText);

    if (choice.result && Array.isArray(choice.result)) {
      this.renderResult(choice.result);
    } else if (choice.next) {
      window.game.loadChapter(choice.next);
    }

    this.choicesContainer.innerHTML = '';
    this.choicesContainer.classList.remove('visible');
    this.chatContainer.classList.remove('has-choices'); // Удаляем класс после выбора
    requestAnimationFrame(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight; // Прокрутка после выбора
    });
  }

  async renderResult(results) {
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    for (const result of results) {
      const text = typeof result.text === 'object' ? result.text[currentLang] || result.text.ru || '' : result.text || '';
      const description = typeof result.description === 'object' ? result.description[currentLang] || result.description.ru || '' : result.description || '';
      this.addMessage(result.type, text, result.src, description);
      await new Promise(resolve => setTimeout(resolve, result.delay || 1500));

      if (result.nextChapter) {
        window.game.loadChapter(result.nextChapter);
      }
    }
  }

  clearChat() {
    if (this.chatContainer && this.choicesContainer) {
      this.chatContainer.innerHTML = '';
      this.choicesContainer.innerHTML = '';
      this.choicesContainer.classList.remove('visible');
      this.chatContainer.classList.remove('has-choices'); // Удаляем класс при очистке
    }
  }
}