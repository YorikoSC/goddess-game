// chapters/chapter5_relief.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I'm glad you refused. I don't like that photographer.",
      msg2: "Aha! So you are jealous after all! Caught you! 😂",
      msg3: "To be honest, I'm not interested in him at all. Too self-absorbed."
    } : {
      msg1: "Я рад, что ты отказалась. Этот фотограф мне не нравится.",
      msg2: "Ага! Значит, всё-таки ревнуешь! Попался! 😂",
      msg3: "Если честно, он мне совсем не интересен. Слишком самовлюблённый."
    };
    
    return [
      {
        type: "sent",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 2500
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 4000
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I'm not jealous, just concerned about you.",
      result1a: "Of course! Keep telling yourself that 😄",
      result1b: "But you know... I appreciate your concern. Really ❤️",
      choice2: "Okay, maybe I'm a little jealous. I like you.",
      result2a: "Wow! I wasn't expecting such a confession... 😳",
      result2b: "You know, I like you too. I've wanted to tell you for a while..."
    } : {
      choice1: "Я не ревную, просто беспокоюсь о тебе.",
      result1a: "Ну конечно! Продолжай себя в этом убеждать 😄",
      result1b: "Но знаешь... мне приятно твоё беспокойство. Правда ❤️",
      choice2: "Хорошо, может быть, немного ревную. Ты мне нравишься.",
      result2a: "Ого! Я не ожидала такого признания... 😳",
      result2b: "Знаешь, ты мне тоже очень нравишься. Давно хотела тебе сказать..."
    };
    
    return [
      {
        id: "not_jealous",
        text: texts.choice1,
        result: [
          {
            type: "received",
            text: texts.result1a,
            delay: 1000
          },
          {
            type: "received",
            text: texts.result1b,
            delay: 2500
          }
        ],
        nextChapter: "chapter6_denial"
      },
      {
        id: "admit_jealousy",
        text: texts.choice2,
        result: [
          {
            type: "received",
            text: texts.result2a,
            delay: 1000
          },
          {
            type: "received",
            text: texts.result2b,
            delay: 2500
          }
        ],
        nextChapter: "chapter6_compliment"
      }
    ];
  }
};
