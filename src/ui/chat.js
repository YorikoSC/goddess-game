import { gameState } from '../core/gameState.js';

/**
 * Добавляет сообщение в чат
 */
export function addMessage(type, text, container, image, description, messageType, chatId = 'lina') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.alt = description || '';
        img.className = 'message-image';
        message.appendChild(img);
    }
    if (text) {
        const textNode = document.createElement('div');
        textNode.className = 'message-text';
        textNode.textContent = text;
        message.appendChild(textNode);
    }
    if (description) {
        const descNode = document.createElement('div');
        descNode.className = 'message-description';
        descNode.textContent = description;
        message.appendChild(descNode);
    }
    if (type === 'received') {
    const sound = document.getElementById('sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}
    message.dataset.type = messageType || '';
    container.appendChild(message);

    // Обновляем счетчик непрочитанных сообщений
    if (gameState.chats[chatId]) {
        gameState.chats[chatId].unread += 1;
    }
}

/**
 * Отображает массив сообщений с задержкой
 */
export function displayMessages(messages, container, onComplete, chapter) {
    let index = 0;
    function showNext() {
        if (index < messages.length) {
            const msg = messages[index];
            addMessage(msg.type, msg.text, container, msg.image, msg.description, msg.messageType, msg.chatId);
            index++;
            setTimeout(showNext, msg.delay || 500);
        } else if (typeof onComplete === 'function') {
            onComplete(chapter);
        }
    }
    showNext();
}

/**
 * Очищает чат
 */
export function clearChat(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Рендерит список чатов
 */
export function renderChatList() {
    // Примерная реализация, зависит от структуры DOM
    const chatList = document.getElementById('chat-list');
    if (!chatList) return;
    chatList.innerHTML = '';
    Object.entries(gameState.chats).forEach(([chatId, chat]) => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item' + (gameState.currentChat === chatId ? ' active' : '');
        chatItem.textContent = chat.name[gameState.language] || chatId;
        chatItem.onclick = () => switchChat(chatId);
        chatList.appendChild(chatItem);
    });
}

/**
 * Переключает активный чат
 */
export function switchChat(chatId) {
    if (gameState.chats[chatId]) {
        gameState.currentChat = chatId;
        renderChatList();
        // Можно добавить обновление сообщений в чате
    }
}