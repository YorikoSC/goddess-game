// chapters/chapter6_priority.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "This is just a hobby. You're more important to me! 💕",
      msg2: "Besides, I always have more fun with you than with those pretentious photographers."
    } : {
      msg1: "Это просто хобби. Ты для меня важнее! 💕",
      msg2: "К тому же, с тобой мне всегда интереснее, чем с этими напыщенными фотографами."
    };
    
    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 2500
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "What about your photoshoots and modeling career?",
      result1a: "This is just a hobby. You're more important to me! 💕",
      result1b: "Besides, I always have more fun with you than with those pretentious photographers."
    } : {
      choice1: "А как же твои фотосессии и карьера модели?",
      result1a: "Это просто хобби. Ты для меня важнее! 💕",
      result1b: "К тому же, с тобой мне всегда интересное, чем с этими напыщенными фотографами."
    };
    
    return [
      {
        id: "ask_about_career",
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
        nextChapter: "chapter6_date_plan"
      }
    ];
  }
};
