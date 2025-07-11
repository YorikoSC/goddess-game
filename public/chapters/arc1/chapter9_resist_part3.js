export default {
  translations: {
    ru: {
      choice3a: "Это просто прикол, твои ноги лучшие!",
      choice3b: "Попался, но я не такой, исправлюсь.",
      choice3c: "Смени тему, это не твоё дело.",
      lina3a: "Лучшие? Не сравнивай с другими, упрямец!",
      lina3b: "Исправишься? Докажи, мой гордый.",
      lina3c: "Не моё дело? Окей, но я всё вижу.",
      mc7: "Блин, Лина, это не то, что ты думаешь!",
      lina11: "Хочешь? Завтра в 7 у меня, не опаздывай."
    },
    en: {
      choice3a: "It's just for fun, your feet are the best!",
      choice3b: "Caught, but I'm not like that, I'll change.",
      choice3c: "Change the topic, it's not your business.",
      lina3a: "The best? Don't compare with others, stubborn!",
      lina3b: "Change? Prove it, my proud one.",
      lina3c: "Not my business? Okay, but I see everything.",
      mc7: "Damn, Lina, it's not what you think!",
      lina11: "Want me? Tomorrow at 7, my place, don't be late."
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
        id: "for_fun",
        text: texts.choice3a,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "for_fun";
        },
        result: [
          { type: "received", text: texts.lina3a, delay: 1000 },
          { type: "received", text: texts.lina11, delay: 2700, nextChapter: "chapter9_resist_part4" }
        ]
      },
      {
        id: "caught_change",
        text: texts.choice3b,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "caught_change";
        },
        result: [
          { type: "received", text: texts.lina3b, delay: 1000 },
          { type: "received", text: texts.lina11, delay: 2700, nextChapter: "chapter9_resist_part4" }
        ]
      },
      {
        id: "change_topic",
        text: texts.choice3c,
        action: (gameState) => {
          gameState.choices.chapter9_tg = "change_topic";
        },
        result: [
          { type: "received", text: texts.lina3c, delay: 1000 },
          { type: "received", text: texts.lina11, delay: 2700, nextChapter: "chapter9_resist_part4" }
        ]
      }
    ];
  }
};