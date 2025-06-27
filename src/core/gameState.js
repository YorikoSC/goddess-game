// Состояние игры и связанные с ним данные

export const gameState = {
  currentChapter: null,
  choices: {}, // Сохранение выборов игрока
  arc: 1, // Текущая арка (1 или 2)
  language: 'ru', // Текущий язык
  isBusy: false, // Индикатор занятости (блокировка взаимодействия)
  dialogueEnded: false, // Флаг завершения диалога
  isChapterEnding: false, // Флаг окончания главы
  generateMessage: false, // Флаг генерации сообщений
  previousChapter: null, // Предыдущая глава
  boostyNotification: false, // Флаг активности окна бусти
  lastCheckpoint: {
    chapter: null,
    choices: {},
    arc: 1
  },
  chats: {
    lina: {
      name: {
        ru: "Лина",
        en: "Lina"
      },
      avatar: "img/lina_avatar.jpg",
      unread: 0,
      isActive: true
    },
    amina: {
      name: {
        ru: "Амина",
        en: "Amina"
      },
      avatar: "img/amina_avatar.jpg",
      unread: 0,
      isActive: false
    }
  },
  currentChat: 'lina',
};