export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Listen, you won’t believe how wild the photoshoot was today!",
      msg2: "What happened there?",
      msg3: "The photographer kept staring, especially when I put on that short dress.",
      msg4: "He said I’m perfect for his next project. Kinda flattering, don’t you think?"
    } : {
      msg1: "Слушай, фотосессия сегодня была что-то с чем-то!",
      msg2: "Что там случилось?",
      msg3: "Фотограф всё время пялился, особенно когда я надела то короткое платье.",
      msg4: "Сказал, что я идеально подхожу для его следующего проекта. Льстит, правда?"
    };
    return [
      { type: "received", text: texts.msg1, delay: 1000 },
      { type: "sent", text: texts.msg2, delay: 2500 },
      { type: "received", text: texts.msg3, delay: 4000 },
      { type: "received", text: texts.msg4, delay: 5500, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Was he flirting with you? Spill the details!",
      result1a: "Not outright, but his eyes were all over me.",
      result1b: "You jealous yet? Should I keep going?",
      choice2: "Sounds like he was just doing his job, but you were clearly the star.",
      result2a: "Maybe, but he was definitely into it.",
      result2b: "The photos are gonna be fire, I’ll show you tomorrow."
    } : {
      choice1: "Он что, флиртовал с тобой? Расскажи всё!",
      result1a: "Не прямолинейно, но глазами точно раздевал.",
      result1b: "Уже ревнуешь? Продолжать?",
      choice2: "Похоже, он просто делал свою работу, но ты явно была звездой.",
      result2a: "Может, но ему явно нравилось.",
      result2b: "Фотки будут огонь, завтра покажу."
    };
    return [
      {
        id: "question_photographer",
        text: texts.choice1,
        result: [
          { type: "received", text: texts.result1a, delay: 1000 },
          { type: "received", text: texts.result1b, delay: 2500, nextChapter: "chapter3" }
        ]
      },
      {
        id: "professional_opinion",
        text: texts.choice2,
        result: [
          { type: "received", text: texts.result2a, delay: 1000 },
          { type: "received", text: texts.result2b, delay: 2500, nextChapter: "chapter3" }
        ]
      }
    ];
  }
};