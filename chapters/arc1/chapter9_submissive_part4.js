export default {
  translations: {
    ru: {
      mc9: "Буду, Лина, обещаю.",
      lina11: "Обещаешь? Если облажаешься, устрою тебе форс-футджоб, ахах!",
      mc10: "Форс-футджоб? Ты серьёзно?",
      lina12: "Шучу, или нет? Приходи и узнаешь. Спокойной, слабак.",
      mc11: "Спокойной, Лина. Завтра докажу.",
      lina13: "Докажи. Я всегда выигрываю. 😘",
      mc12: "Посмотрим, кто победит.",
      lina14: "Ха, жду с нетерпением, мой послушный.",
      mc13: "Лина, ты меня держишь в напряжении.",
      lina15: "Напряжение — это хорошо. Спи, малыш.",
      mc14: "Спи, Лина. Завтра буду.",
      lina16: "Спи, мой слабый. Не подведи.",
      mc15: "Не подведу, обещаю.",
      lina17: "Обещаешь? Увидишь, что я задумала.",
      mc16: "Лина, ты меня пугаешь, но я в деле.",
      lina18: "Пугаю? Это часть игры. Спокойной.",
      mc17: "Спокойной, Лина. Завтра всё решим.",
      lina19: "Решим, если будешь послушным. Спи.",
      mc18: "Спи, Лина. Я готов.",
      lina20: "Готов? Ха, докажи. Спокойной.",
      saveTrigger: "Я докажу, моя госпожа, спокойной ночи."
    },
    en: {
      mc9: "I'll be there, Lina, I promise.",
      lina11: "Promise? If you flop, I'll force a footjob, haha!",
      mc10: "Forced footjob? You serious?",
      lina12: "Joking, or am I? Come and find out. Night, weakling.",
      mc11: "Night, Lina. I'll prove it tomorrow.",
      lina13: "Prove it. I always win. 😘",
      mc12: "We'll see who wins.",
      lina14: "Ha, can't wait, my obedient.",
      mc13: "Lina, you keep me on edge.",
      lina15: "Edge is good. Sleep, babe.",
      mc14: "Sleep, Lina. I'll be there.",
      lina16: "Sleep, my weak one. Don't fail.",
      mc15: "Won't fail, I promise.",
      lina17: "Promise? You'll see what I've planned.",
      mc16: "Lina, you scare me, but I'm in.",
      lina18: "Scare you? That's the game. Night.",
      mc17: "Night, Lina. We'll settle tomorrow.",
      lina19: "Settle if you're obedient. Sleep.",
      mc18: "Sleep, Lina. I'm ready.",
      lina20: "Ready? Ha, prove it. Night.",
      saveTrigger: "I'll prove it, my mistress, good night."
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "sent", text: texts.mc9, delay: 1500 },
      { type: "received", text: texts.lina11, delay: 3000 },
      { type: "sent", text: texts.mc10, delay: 4500 },
      { type: "received", text: texts.lina12, delay: 6000 },
      { type: "sent", text: texts.mc11, delay: 7500 },
      { type: "received", text: texts.lina13, delay: 9000 },
      { type: "sent", text: texts.mc12, delay: 10500 },
      { type: "received", text: texts.lina14, delay: 12000 },
      { type: "sent", text: texts.mc13, delay: 13500 },
      { type: "received", text: texts.lina15, delay: 15000 },
      { type: "sent", text: texts.mc14, delay: 16500 },
      { type: "received", text: texts.lina16, delay: 18000 },
      { type: "sent", text: texts.mc15, delay: 19500 },
      { type: "received", text: texts.lina17, delay: 21000 },
      { type: "sent", text: texts.mc16, delay: 22500 },
      { type: "received", text: texts.lina18, delay: 24000 },
      { type: "sent", text: texts.mc17, delay: 25500 },
      { type: "received", text: texts.lina19, delay: 27000 },
      { type: "sent", text: texts.mc18, delay: 28500 },
      { type: "received", text: texts.lina20, delay: 30000 },
      { type: "received", text: texts.saveTrigger, delay: 31500, showChoices: true }
    ];
  },

  getChoices(gameState) {
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