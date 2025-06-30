import { gameState, saveStateAtChoice } from './gameState.js';
import { showScreen, showNavigation, hideNavigation, showEndgameScreen } from '../ui/screens.js';
import { addMessage, displayMessages, renderChoices, playMessageSound } from '../ui/chat.js';
import { clearImageCarousel } from '../js/imageCarousel.js'; // Предполагаем, что существует

export async function loadChapter(chapterId) {
    document.body.classList.add('loading-chapter');
    document.querySelector('.phone').classList.add('no-transition');
    if (!chapterId) return false;

    clearImageCarousel();

    let chapterPath;
    if (chapterId.startsWith('special_')) chapterPath = `./chapters/special/${chapterId}.js`;
    else if (gameState.arc === 1) chapterPath = `./chapters/arc1/${chapterId}.js`;
    else if (gameState.arc === 2) chapterPath = `./chapters/arc2/${chapterId}.js`;

    try {
        const chapterModule = await import(chapterPath);
        if (!chapterModule?.default) return false;

        saveStateAtChoice();
        gameState.currentChapter = chapterId;
        renderChapter(chapterModule.default, false);
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки главы ${chapterId}:`, error);
        boostyNotification();
        return false;
    } finally {
        setTimeout(() => {
            document.body.classList.remove('loading-chapter');
        }, 300);
    }
}

export async function loadChapterInstant(chapterId) {
    if (!chapterId) chapterId = getFirstChapterOfCurrentArc();
    try {
        clearChat();
        gameState.isBusy = false;
        gameState.dialogueEnded = false;
        gameState.generateMessage = false;

        let chapterPath;
        if (chapterId.startsWith('special_')) chapterPath = `./chapters/special/${chapterId}.js`;
        else if (gameState.arc === 1) chapterPath = `./chapters/arc1/${chapterId}.js`;
        else if (gameState.arc === 2) chapterPath = `./chapters/arc2/${chapterId}.js`;

        const chapterModule = await import(chapterPath);
        if (!chapterModule?.default) return false;

        const messages = chapterModule.default.getText(gameState);
        const choices = chapterModule.default.getChoices ? chapterModule.default.getChoices(gameState) : [];

        const chatContainer = document.getElementById('chat');
        const choicesContainer = document.getElementById('choices');

        chatContainer.innerHTML = '';
        choicesContainer.innerHTML = '';

        if (chapterModule.default.before) chapterModule.default.before();
        if (messages && messages.length > 0) {
            if (messages[0].type === "monolog-placeholder") {
                renderChapter(chapterModule.default, true);
            } else {
                messages.forEach(message => {
                    if (message.type === 'photo') {
                        addMessage('photo', message.text, chatContainer, message.src, message.description, 'received');
                    } else {
                        addMessage(message.type, message.text, chatContainer);
                    }
                });
                if (choices.length > 0) renderChoices(choices, choicesContainer);
            }
        } else if (choices.length > 0) {
            renderChoices(choices, choicesContainer);
        }
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки главы ${chapterId}:`, error);
        return false;
    }
}

export function renderChapter(chapter, instant = false) {
    const messages = chapter.getText(gameState);
    const choices = chapter.getChoices ? chapter.getChoices(gameState) : [];

    if (messages && messages.length === 1 && messages[0].type === "monolog-placeholder") {
        const chatWrapper = document.querySelector('.chat-wrapper');
        chatWrapper.innerHTML = '';
        const monologContainer = document.createElement('div');
        monologContainer.className = 'monolog-placeholder';
        const textDiv = document.createElement('div');
        textDiv.className = 'monolog-content';
        textDiv.innerHTML = messages[0].content.split('\n\n').join('<br><br>');
        monologContainer.appendChild(textDiv);
        const button = document.createElement('button');
        button.className = 'monolog-button';
        button.textContent = messages[0].buttonText || "Продолжить...";
        button.addEventListener('click', async () => {
            chatWrapper.innerHTML = '<div class="chat-messages" id="chat"></div><div class="choices" id="choices"></div>';
            if (messages[0].nextChapter) await loadChapter(messages[0].nextChapter);
        });
        monologContainer.appendChild(button);
        chatWrapper.appendChild(monologContainer);
        return;
    }

    const chatContainer = document.getElementById('chat');
    const choicesContainer = document.getElementById('choices');

    choicesContainer.innerHTML = '';

    if (chapter.before) chapter.before();
    if (instant) {
        messages?.forEach(message => addMessage(message.type, message.text, chatContainer));
        if (choices?.length > 0) renderChoices(choices, choicesContainer);
    } else {
        if (messages?.length > 0) {
            gameState.isBusy = true;
            displayMessages(messages, chatContainer, () => {
                gameState.isBusy = false;
                if (choices?.length > 0) renderChoices(choices, choicesContainer);
            }, chapter);
        } else if (choices?.length > 0) {
            renderChoices(choices, choicesContainer);
        }
    }
}

export function restartChapter() {
    if (gameState.isBusy) return;
    gameState.boostyNotification = false;
    chapterPosts = [];
    localStorage.removeItem('chapterPosts');
    if (gameState.lastCheckpoint && gameState.lastCheckpoint.chapter) {
        gameState.currentChapter = gameState.lastCheckpoint.chapter;
        gameState.choices = JSON.parse(JSON.stringify(gameState.lastCheckpoint.choices));
        if (gameState.lastCheckpoint.arc) gameState.arc = gameState.lastCheckpoint.arc;
    } else {
        gameState.currentChapter = getFirstChapterOfCurrentArc();
        const arcPrefix = gameState.arc === 1 ? '' : 'arc2_';
        for (const key in gameState.choices) if (key.startsWith(arcPrefix)) delete gameState.choices[key];
    }
    clearChat();
    clearImageCarousel();
    loadChapterInstant(gameState.currentChapter);
    showScreen('chat');
    showNavigation();
}