// warm_good_night.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg_1: "You’ve been so obedient today... I’m pleased 😘",
      msg_2: "Yeaaah, you always know how to make me happy.",
      }:{
      msg_1: "Ты был таким послушным сегодня... Я довольна 😘",
      msg_2: "Дааа, ты всегда знаешь, как меня порадовать.",
    };
    return [
      { type: "received", text: texts.msg_1, delay: 1000 },
      { type: "sent", text: texts.msg_2, delay: 2500, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice_1: "Sweet dreams, my mistress!",
      result_1: "Good boy! See you tomorrow 💫",
      choice_2: "I hope I’ve earned a reward...",
      result_2a: "Oh, you have... But I’ll decide what it is 😏",
      result_2b: "Sweet dreams, my favorite servant! ❤️",
    } : {
      choice_1: "Сладких снов, моя госпожа!",
      result_1: "Хороший мальчик! Увидимся завтра 💫",
      choice_2: "Надеюсь, я заслужил награду...",
      result_2a: "О, ты заслужил... Но я решу, что именно 😏",
      result_2b: "Сладких снов, мой любимый слуга! ❤️",
    };
    return [
      {
        id: "sweet_dreams",
        text: texts.choice_1,
        result: [
          { type: "received", text: texts.result_1, delay: 1000, nextChapter: "Chapter7_intro" }
        ]
      },
      {
        id: "ask_reward",
        text: texts.choice_2,
        action: (state) => { state.choices.warm_good_night = "reward_asked"; },
        result: [
          { type: "received", text: texts.result_2a, delay: 1000 },
          { type: "received", text: texts.result_2b, delay: 2500, nextChapter: "Chapter7_intro" }
        ]
      }
    ];
  }
};