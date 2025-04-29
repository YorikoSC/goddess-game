// chapters/chapter4_protective.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "When is the next photoshoot? I'll make time for it.",
      msg2: "This Saturday, at 2:00 PM. The studio is not far from the university.",
      msg3: "By the way, have you ever thought about trying modeling yourself? You have good features! 📏"
    } : {
      msg1: "Когда следующая фотосессия? Я освобожу время.",
      msg2: "В эту субботу, в 14:00. Студия недалеко от университета.",
      msg3: "Кстати, ты не думал сам попробовать себя в качестве модели? У тебя хорошие данные! 📏"
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
        delay: 4000,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Me? No, that's not my thing. I'd rather be your bodyguard.",
      result1a: "My personal protector! How sweet 🥰",
      result1b: "You know, I like that you care about me so much...",
      choice2: "Maybe... Would you like to see me as a model?",
      result2a: "Absolutely! I think you'd be great at it! 🤩",
      result2b: "We could even do a joint photoshoot... What do you say?"
    } : {
      choice1: "Я? Нет, это не моё. Я лучше буду твоим телохранителем.",
      result1a: "Мой персональный защитник! Как мило 🥰",
      result1b: "Знаешь, мне нравится, что ты так заботишься обо мне...",
      choice2: "Может быть... А что, ты бы хотела увидеть меня в роли модели?",
      result2a: "Ещё бы! Думаю, у тебя отлично получилось бы! 🤩",
      result2b: "Можем даже сделать совместную фотосессию... Что скажешь?"
    };
    
    return [
      {
        id: "prefer_bodyguard",
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
            delay: 2500,
            nextChapter: "chapter5_protective"
          }
        ]
      },
      {
        id: "consider_modeling",
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
            delay: 2500,
            nextChapter: "chapter5_joint"
          }
        ]
      }
    ];
  }
};
