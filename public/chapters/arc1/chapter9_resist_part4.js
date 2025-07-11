export default {
  translations: {
    ru: {
      mc9: "Буду, но без Марка, ясно?",
      lina12: "Без Марка? Если облажаешься, устрою форс-футджоб, ахах!",
      mc10: "Форс-футджоб? Ты больная!",
      lina13: "Больная? Ты с каналами больной, я дразню. Спи, упрямец.",
      mc11: "Спокойной, Лина. Завтра докажу.",
      lina14: "Докажи. Я всегда выигрываю. 😘",
      mc12: "Посмотрим, кто победит.",
      lina15: "Ха, жду с нетерпением, мой бунтарь.",
      mc13: "Лина, ты меня держишь в напряжении.",
      lina16: "Напряжение — это хорошо. Спи, гордый.",
      mc14: "Спи, Лина. Завтра буду.",
      lina17: "Спи, мой независимый. Не подведи.",
      mc15: "Не подведу, обещаю.",
      lina18: "Обещаешь? Увидишь, что я задумала.",
      mc16: "Лина, ты пугаешь, но я в деле.",
      lina19: "Пугаю? Это часть игры. Спокойной.",
      mc17: "Спокойной, Лина. Завтра всё решим.",
      lina20: "Решим, если не струсишь. Спи.",
      mc18: "Спи, Лина. Я не струшу.",
      lina21: "Не струсишь? Ха, посмотрим. Спокойной.",
      saveTrigger: "Будь уверена, я докажу, что не трус. Спокойной ночи."
    },
    en: {
        mc9: "I will, but without Mark, understood?",
        lina12: "Without Mark? If you mess up, I'll force a foot job, haha!",
        mc10: "Force a foot job? You're crazy!",
        lina13: "Crazy? You're the one with foot channels, I'm teasing. Sleep tight, stubborn one.",
        mc11: "Good night, Lina. Tomorrow I'll prove myself.",
        lina14: "Prove it. I always win. 😘",
        mc12: "We'll see who wins.",
        lina15: "Haha, can't wait, my rebel.",
        mc13: "Lina, you're keeping me on edge.",
        lina16: "Edge is good. Sleep well, proud one.",
        mc14: "Sleep well, Lina. I'll be there tomorrow.",
        lina17: "Sleep tight, my independent one. Don't let me down.",
        mc15: "I won't let you down, I promise.",
        lina18: "Promise? You'll see what I have planned.",
        mc16: "Lina, you're scaring me, but I'm in.",
        lina19: "Scaring? It's part of the game. Good night.",
        mc17: "Good night, Lina. We'll settle everything tomorrow.",
        lina20: "Settle if you don't chicken out. Sleep tight.",
        mc18: "Sleep well, Lina. I won't chicken out.",
        lina21: "Won't chicken out? Haha, we'll see. Good night.",
        saveTrigger: "Rest assured, I'll prove I'm not a coward. Good night."
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "sent", text: texts.mc9, delay: 1500 },
      { type: "received", text: texts.lina12, delay: 3000 },
      { type: "sent", text: texts.mc10, delay: 4500 },
      { type: "received", text: texts.lina13, delay: 6000 },
      { type: "sent", text: texts.mc11, delay: 7500 },
      { type: "received", text: texts.lina14, delay: 9000 },
      { type: "sent", text: texts.mc12, delay: 10500 },
      { type: "received", text: texts.lina15, delay: 12000 },
      { type: "sent", text: texts.mc13, delay: 13500 },
      { type: "received", text: texts.lina16, delay: 15000 },
      { type: "sent", text: texts.mc14, delay: 16500 },
      { type: "received", text: texts.lina17, delay: 18000 },
      { type: "sent", text: texts.mc15, delay: 19500 },
      { type: "received", text: texts.lina18, delay: 21000 },
      { type: "sent", text: texts.mc16, delay: 22500 },
      { type: "received", text: texts.lina19, delay: 24000 },
      { type: "sent", text: texts.mc17, delay: 25500 },
      { type: "received", text: texts.lina20, delay: 27000 },
      { type: "sent", text: texts.mc18, delay: 28500 },
      { type: "received", text: texts.lina21, delay: 30000 },
      { type: "received", text: texts.saveTrigger, delay: 31500, showChoices: true }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "i_will_prove",
        text: texts.saveTrigger,
        action: (gameState) => {
          gameState.choices.chapter9_saved = "i_will_prove";
        },
        result: [
          { nextChapter: "ark_final" }
        ]
      }
    ];
  }
};