export default {
  translations: {
    ru: {
      choice2a: "Я лучше Марка, докажу!",
      choice2b: "Не надо с ним, я ревную!",
      choice2c: "Что он тебе сказал, Лина?",
      lina2a: "Докажешь? Ха, попробуй, бунтарь.",
      lina2b: "Ревнуешь? Не мешай мне решать.",
      lina2c: "Сказал? Что хочет меня. А ты что сделаешь?",
      mc6: "Ты меня бесишь этими загадками.",
      lina10: "Бешу? Это начало. У тебя куча ТГ-каналов со ступнями, пиздабол!"
    },
    en: {
      choice2a: "I'm better than Mark, I'll prove it!",
      choice2b: "Don't go with him, I'm jealous!",
      choice2c: "What did he say to you, Lina?",
      lina2a: "Prove it? Ha, try, rebel.",
      lina2b: "Jealous? Don't interfere with my decisions.",
      lina2c: "Said? He wants me. And what will you do?",
      mc6: "You're driving me crazy with these mysteries.",
      lina10: "Driving you crazy? This is just the beginning. You have a bunch of TG channels with feet, bullshit!"
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "received", text: texts.lina9, delay: 1500, showChoices: true }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "prove_better",
        text: texts.choice2a,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "prove_better";
        },
        result: [
          { type: "sent", text: texts.choice2a, delay: 1000 },
          { type: "received", text: texts.lina2a, delay: 2700 },
          { type: "sent", text: texts.mc6, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_resist_part3" }
        ]
      },
      {
        id: "jealous",
        text: texts.choice2b,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "jealous";
        },
        result: [
          { type: "sent", text: texts.choice2b, delay: 1000 },
          { type: "received", text: texts.lina2b, delay: 2700 },
          { type: "sent", text: texts.mc6, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_resist_part3" }
        ]
      },
      {
        id: "ask_details",
        text: texts.choice2c,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "ask_details";
        },
        result: [
          { type: "sent", text: texts.choice2c, delay: 1000 },
          { type: "received", text: texts.lina2c, delay: 2700 },
          { type: "sent", text: texts.mc6, delay: 4400 },
          { type: "received", text: texts.lina10, delay: 6100, nextChapter: "chapter9_resist_part3" }
        ]
      }
    ];
  }
};