import { gameState } from '../core/gameState.js';
import { showScreen } from './screens.js';

export let chapterPosts = JSON.parse(localStorage.getItem('chapterPosts')) || [];
export let allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
const defaultPosts = [/* как в старом файле */];

export function addMessage(type, text, container, image, description, messageType, chatId = 'lina') {
    if (chatId !== gameState.currentChat) {
        markChatUnread(chatId);
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'photo' ? `message message-${messageType || 'received'}` : `message message-${type}`;
    if (type === 'photo') {
        messageDiv.innerHTML = `
            ${text ? `<div class="message-text">${text}</div>` : ''}
            <img src="${image}" class="chat-image" alt="Message Image" onclick="window.game.openFullscreenImage('${image}')">
            ${description ? `<div class="message-description">${description}</div>` : ''}
        `;
    } else {
        messageDiv.textContent = text || '';
    }
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

export function displayMessages(messages, container, onComplete, chapter) {
    if (!messages || !messages.length) {
        if (onComplete) {
            gameState.generateMessage = false;
            onComplete();
        }
        return;
    }
    const messagePromises = messages.map((message, index) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (message.type === 'received' || message.type === 'photo') playMessageSound();
                if (message.type === 'photo') {
                    addMessage('photo', message.text, container, message.src, message.description, 'received');
                    if (message.onAfter) message.onAfter();
                } else {
                    addMessage(message.type, message.text, container);
                }
                if (message.nextChoice && chapter) {
                    const nextChoice = chapter.getChoicesByKey(message.nextChoice, gameState);
                    if (nextChoice) renderChoices([{ text: nextChoice.text, result: nextChoice.result }], document.getElementById('choices'));
                }
                resolve();
            }, message.delay || 1000);
        });
    });
    Promise.all(messagePromises).then(() => {
        gameState.generateMessage = false;
        if (onComplete) onComplete();
    });
}

export function renderChoices(choices, container) {
    if (!container || !choices) return;
    container.innerHTML = '';
    const chatContainer = document.getElementById('chat');
    chatContainer.classList.add('has-choices');
    container.classList.add('visible');
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.buttonText || choice.text;
        button.addEventListener('click', async () => {
            if (gameState.isBusy) return;
            chatContainer.classList.remove('has-choices');
            container.classList.remove('visible');
            if (choice.type === 'photo') {
                addMessage('photo', choice.text, chatContainer, choice.src, choice.description, 'sent');
            } else {
                addMessage('sent', choice.text, chatContainer);
            }
            if (choice.result && choice.result.length > 0) {
                gameState.isBusy = true;
                await displayMessages(choice.result, chatContainer, () => {
                    gameState.isBusy = false;
                    if (choice.action) choice.action(gameState);
                    if (choice.result[choice.result.length - 1].nextChapter) loadChapter(choice.result[choice.result.length - 1].nextChapter);
                });
            } else if (choice.action) choice.action(gameState);
            else if (choice.nextChapter) loadChapter(choice.nextChapter);
            container.innerHTML = '';
        });
        container.appendChild(button);
    });
}

export function playMessageSound() {
    const sound = document.getElementById('sound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Автовоспроизведение не разрешено'));
}

export function initChats() {
    const chatListBtn = document.querySelector('.chat-list-button');
    const chatList = document.querySelector('.chat-list');
    const choicesContainer = document.getElementById('choices');
    let wasChoicesVisible = false;

    chatListBtn.addEventListener('click', () => {
        wasChoicesVisible = choicesContainer.classList.contains('visible');
        if (!chatList.classList.contains('active')) choicesContainer.classList.remove('visible');
        chatList.classList.toggle('active');
        renderChatList();
    });

    chatList.addEventListener('click', (e) => {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const chatId = chatItem.dataset.chatId;
            switchChat(chatId);
            if (wasChoicesVisible && gameState.currentChat === chatId) choicesContainer.classList.add('visible');
            chatList.classList.remove('active');
        }
    });
}

function renderChatList() {
    const chatList = document.querySelector('.chat-list');
    chatList.innerHTML = '';
    Object.entries(gameState.chats).forEach(([id, chat]) => {
        if (!chat.isActive) return;
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.dataset.chatId = id;
        chatItem.innerHTML = `
            <img src="${chat.avatar}" class="avatar" alt="${chat.name[gameState.language]}">
            <div class="chat-info">
                <h2>${chat.name[gameState.language]}</h2>
                <p class="online-status">online</p>
            </div>
            ${chat.unread > 0 ? '<div class="unread-marker"></div>' : ''}
        `;
        chatList.appendChild(chatItem);
    });
}

function switchChat(chatId) {
    if (gameState.currentChat !== chatId) gameState.currentChat = chatId;
    if (gameState.dialogueEnded && !document.querySelector('.chat-list').classList.contains('active')) {
        document.getElementById('choices').classList.add('visible');
    }
}

function markChatUnread(chatId) {
    if (chatId !== gameState.currentChat) gameState.chats[chatId].unread++;
}