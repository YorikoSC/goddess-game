export default {
  translations: {
    ru: {
      mc5: "Марк? Ты с ним встречаешься? Это из-за меня?",
      lina8: "Может, и да, может, нет. Он не торопится, как ты. Загадки — это моё, малыш.",
      choice2a: "Лина, я ревную, не надо с Марком.",
      choice2b: "Забудь его, я докажу, что лучше.",
      choice2c: "Серьёзно? Что он тебе сказал?",
      lina2a: "Ревнуешь? Мило, но не мешай мне решать.",
      lina2b: "Докажешь? Ха, попробуй, слабак.",
      lina2c: "Сказал? Что он хочет меня. А ты что сделаешь?",
      mc6: "Лина, ты меня добиваешь этими загадками.",
      lina9: "Добиваю? Это начало. У тебя куча ТГ-каналов со ступнями, пиздабол!"
    },
    en: {
      mc5: "Mark? You're meeting him? Because of me?",
      lina8: "Maybe yes, maybe no. He's not rushed like you. Mysteries are mine, babe.",
      choice2a: "Lina, I'm jealous, no Mark.",
      choice2b: "Forget him, I'll prove I'm better.",
      choice2c: "Seriously? What did he say?",
      lina2a: "Jealous? Cute, but don't interfere.",
      lina2b: "Prove it? Ha, try it, weakling.",
      lina2c: "Said? He wants me. What'll you do?",
      mc6: "Lina, you're killing me with these mysteries.",
      lina9: "Killing you? Just the start. You've got tons of TG feet channels, liar!"
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "sent", text: texts.mc5, delay: 1500 },
      { type: "received", text: texts.lina8, delay: 3000, showChoices: true }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "jealous",
        text: texts.choice2a,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "jealous";
        },
        result: [
          { type: "received", text: texts.lina2a, delay: 1000 },
          { type: "sent", text: texts.mc6, delay: 2700 },
          { type: "received", text: texts.lina9, delay: 4400, nextChapter: "chapter9_submissive_part3" }
        ]
      },
      {
        id: "prove_better",
        text: texts.choice2b,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "prove_better";
        },
        result: [
          { type: "received", text: texts.lina2b, delay: 1000 },
          { type: "sent", text: texts.mc6, delay: 2700 },
          { type: "received", text: texts.lina9, delay: 4400, nextChapter: "chapter9_submissive_part3" }
        ]
      },
      {
        id: "ask_details",
        text: texts.choice2c,
        action: (gameState) => {
          gameState.choices.chapter9_mark = "ask_details";
        },
        result: [
          { type: "received", text: texts.lina2c, delay: 1000 },
          { type: "sent", text: texts.mc6, delay: 2700 },
          { type: "received", text: texts.lina9, delay: 4400, nextChapter: "chapter9_submissive_part3" }
        ]
      }
    ];
  }
};