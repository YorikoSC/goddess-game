// warm_good_night.js
export default {
  translations: {
    ru: {
      msg_1: "Ты был таким послушным сегодня... Я довольна 😘",
      msg_2: "Дааа, ты всегда знаешь, как меня порадовать.",
      choice_1: "Сладких снов, моя госпожа!",
      result_1: "Хороший мальчик! Увидимся завтра 💫",
      choice_2: "Надеюсь, я заслужил награду...",
      result_2a: "О, ты заслужил... Но я решу, что именно 😏",
      result_2b: "Сладких снов, мой любимый слуга! ❤️"
    },
    en: {
      msg_1: "You’ve been so obedient today... I’m pleased 😘",
      msg_2: "Yeaaah, you always know how to make me happy.",
      choice_1: "Sweet dreams, my mistress!",
      result_1: "Good boy! See you tomorrow 💫",
      choice_2: "I hope I’ve earned a reward...",
      result_2a: "Oh, you have... But I’ll decide what it is 😏",
      result_2b: "Sweet dreams, my favorite servant! ❤️"
    }
  },
  getText(gameState) {
    return [
      { type: "received", text: this.translations[gameState.language].msg_1, delay: 1000 },
      { type: "sent", text: this.translations[gameState.language].msg_2, delay: 2500, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const lang = gameState.language || 'ru';
    return [
      {
        id: "sweet_dreams",
        text: this.translations[lang].choice_1,
        result: [
          { type: "received", text: this.translations[lang].result_1, delay: 1000, nextChapter: "ark_final" }
        ]
      },
      {
        id: "ask_reward",
        text: this.translations[lang].choice_2,
        result: [
          { type: "received", text: this.translations[lang].result_2a, delay: 1000 },
          { type: "received", text: this.translations[lang].result_2b, delay: 2500, nextChapter: "ark_final" }
        ]
      }
    ];
  }
};