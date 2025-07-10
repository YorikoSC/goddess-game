// chapters/chapter3_jealous.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I don't like this. Maybe you should change photographers?",
      msg2: "Oh, come on! He's just doing his job... in his own way 💁‍♀️",
      msg3: "Besides, he offered me a discount for the next photoshoot...",
      msg4: "...if I come in the same mini skirt 🙈"
    } : {
      msg1: "Мне это не нравится. Может, стоит сменить фотографа?",
      msg2: "Ой, да ладно тебе! Он просто делает свою работу... по-своему 💁‍♀️",
      msg3: "К тому же, он предложил сделать мне скидку на следующую фотосессию...",
      msg4: "...если я приду в той же мини-юбке 🙈"
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
      },
      {
        type: "received",
        text: texts.msg4,
        delay: 5500,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "This is crossing all boundaries! I'll go with you to the next photoshoot.",
      result1a: "Wow! My knight in shining armor! 🛡️",
      result1b: "To be honest, I'll feel safer if you come. Thank you! ❤️",
      choice2: "You enjoy his attention, don't you?",
      result2a: "Are you jealous? 😏",
      result2b: "Don't worry, I'm not interested in him. It's just funny to watch his reaction..."
    } : {
      choice1: "Это уже переходит все границы! Я пойду с тобой на следующую фотосессию.",
      result1a: "Ого! Мой рыцарь в сияющих доспехах! 🛡️",
      result1b: "Если честно, мне будет спокойнее, если ты придёшь. Спасибо! ❤️",
      choice2: "Тебе нравится его внимание, да?",
      result2a: "Ревнуешь что ли? 😏",
      result2b: "Не переживай, он мне не интересен. Просто забавно наблюдать за его реакцией..."
    };
    
    return [
      {
        id: "offer_protection",
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
            nextChapter: "chapter4_protective"
          }
        ]
      },
      {
        id: "question_attention",
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
            nextChapter: "chapter4_jealous"
          }
        ]
      }
    ];
  }
};
