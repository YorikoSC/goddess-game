export default {
  translations: {
    ru: {
      mc7: "Блин, Лина, это не то, что ты думаешь!",
      choice3a: "Это просто для прикола, твои ноги лучшие!",
      choice3b: "Ладно, попался, но я исправлюсь.",
      choice3c: "Давай сменим тему, это не важно.",
      lina3a: "Лучшие? Мило, но не сравнивай с другими!",
      lina3b: "Исправишься? Ха, докажи, мой слабый.",
      lina3c: "Сменить тему? Окей, но я всё вижу.",
      mc8: "Прости, Лина, я только тебя хочу.",
      lina10: "Хочешь? Завтра в 7 у меня, не опаздывай."
    },
    en: {
        mc7: "Damn, Lina, it's not what you think!",
        choice3a: "It's just for fun, your feet are the best!",
        choice3b: "Okay, caught, but I'll change.",
        choice3c: "Let's change the topic, it's not important.",
        lina3a: "The best? Cute, but don't compare with others!",
        lina3b: "Change? Ha, prove it, my weak one.",
        lina3c: "Change the topic? Okay, but I see everything.",
        mc8: "Sorry, Lina, I only want you.",
        lina10: "Want me? Tomorrow at 7, my place, don't be late."
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "sent", text: texts.mc7, delay: 1500, showChoices: true }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "best_feet",
        text: texts.choice3a,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "best_feet";
        },
        result: [
          { type: "sent", text: texts.choice3a, delay: 1000 },
          { type: "received", text: texts.lina3a, delay: 2700 },
          { type: "sent", text: texts.mc8, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_submissive_part4" }
        ]
      },
      {
        id: "will_change",
        text: texts.choice3b,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "will_change";
        },
        result: [
          { type: "sent", text: texts.choice3b, delay: 1000 },
          { type: "received", text: texts.lina3b, delay: 2700 },
          { type: "sent", text: texts.mc8, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_submissive_part4" }
        ]
      },
      {
        id: "change_topic",
        text: texts.choice3c,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "change_topic";
        },
        result: [
          { type: "sent", text: texts.choice3c, delay: 1000 },
          { type: "received", text: texts.lina3c, delay: 2700 },
          { type: "sent", text: texts.mc8, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_submissive_part4" }
        ]
      }
    ];
  }
};