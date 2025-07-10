export const gameState = {
    currentChapter: null,
    choices: {},
    arc: 1,
    language: 'ru',
    isBusy: false,
    dialogueEnded: false,
    isChapterEnding: false,
    generateMessage: false,
    previousChapter: null,
    boostyNotification: false,
    lastCheckpoint: { chapter: null, choices: {}, arc: 1 },
    chats: {
        lina: { name: { ru: "Лина", en: "Lina" }, avatar: "img/lina_avatar.jpg", unread: 0, isActive: true },
        amina: { name: { ru: "Амина", en: "Amina" }, avatar: "img/amina_avatar.jpg", unread: 0, isActive: false },
    },
    currentChat: 'lina',
};

export function getFirstChapterOfCurrentArc() {
    return gameState.arc === 1 ? 'chapter1' : 'arc2_date_monolog';
}

export function saveStateAtChoice() {
    gameState.lastCheckpoint = {
        chapter: gameState.currentChapter,
        choices: JSON.parse(JSON.stringify(gameState.choices)),
        arc: gameState.arc,
    };
    console.log('Сохранена точка возврата:', gameState.lastCheckpoint);
}