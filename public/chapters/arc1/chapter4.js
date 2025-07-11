export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "The shoot today was something else. That photographer was all over me.",
      msg2: "He kept going on about how I’m perfect for his private project.",
      msg3: "He even invited me to dinner after. You cool with that, right?"
    } : {
      msg1: "Съёмка сегодня была что-то с чем-то. Фотограф от меня не отходил.",
      msg2: "Всё твердил, что я идеально подхожу для его личного проекта.",
      msg3: "Он даже пригласил меня на ужин после. Ты не против, правда?"
    };
    return [
      { type: "received", text: texts.msg1, delay: 1000 },
      { type: "received", text: texts.msg2, delay: 2500 },
      { type: "received", text: texts.msg3, delay: 4000, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Go have fun, Lina. I’m okay with it.",
      result1a: "Wow, you’re actually cool with it? I like this side of you.",
      result1b: "Maybe I’ll spoil you if you keep being this easygoing.",
      choice2: "He’s crossing a line. You shouldn’t go.",
      result2a: "You’re jealous, huh? That’s cute - means you’re scared to lose me.",
      result2b: "But don’t even think about telling me what to do - I’m the boss!"
    } : {
      choice1: "Развлекайся, Лина. Я не против.",
      result1a: "Серьёзно, ты не против? Мне нравится эта твоя сторона.",
      result1b: "Пожалуй, буду баловать тебя, если и дальше будешь таким покладистым.",
      choice2: "Он перегибает. Не ходи с ним!",
      result2a: "Ревнуешь, да? Это хорошо - значит боишься потерять.",
      result2b: "Но даже не думай указывать мне что делать - я главная!"
    };
    return [
      {
        id: "accept_cuckold",
        text: texts.choice1,
        action: (state) => { state.choices.chapter4 = "accept"; },
        result: [
          { type: "received", text: texts.result1a, delay: 1000 },
          { type: "received", text: texts.result1b, delay: 2500, nextChapter: "chapter5_submissive" }
        ]
      },
      {
        id: "jealous",
        text: texts.choice2,
        action: (state) => { state.choices.chapter4 = "jealous"; },
        result: [
          { type: "received", text: texts.result2a, delay: 1000 },
          { type: "received", text: texts.result2b, delay: 2500, nextChapter: "chapter5_resist" }
        ]
      }
    ];
  }
};