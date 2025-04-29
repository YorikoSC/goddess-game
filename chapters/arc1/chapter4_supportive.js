// chapters/chapter4_supportive.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Swimwear? Sounds interesting! When is the shoot?",
      msg2: "Next week! I'm a bit nervous, to be honest... 😅",
      msg3: "There will be a whole team: makeup artists, stylists, photographers..."
    } : {
      msg1: "Купальники? Звучит интересно! Когда съёмка?",
      msg2: "На следующей неделе! Немного волнуюсь, если честно... 😅",
      msg3: "Там будет целая команда: визажисты, стилисты, фотографы..."
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
      choice1: "You'll do great! Would you like me to come with you for moral support?",
      result1a: "Really? That would be super! 🙏",
      result1b: "Just promise not to laugh if I look ridiculous!",
      choice2: "I'm sure you'll be the star of this photoshoot!",
      result2a: "Thanks for believing in me! ❤️",
      result2b: "By the way, they said I could bring a friend. Would you like to see how it all happens?"
    } : {
      choice1: "Ты справишься! Хочешь, я пойду с тобой для моральной поддержки?",
      result1a: "Правда? Это было бы супер! 🙏",
      result1b: "Только обещай не смеяться, если я буду выглядеть нелепо!",
      choice2: "Уверен, ты будешь звездой этой фотосессии!",
      result2a: "Спасибо за веру в меня! ❤️",
      result2b: "Кстати, они сказали, что можно привести друга. Не хочешь посмотреть, как это происходит?"
    };
    
    return [
      {
        id: "offer_support",
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
            nextChapter: "chapter5_support"
          }
        ]
      },
      {
        id: "encourage",
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
            nextChapter: "chapter5_invite"
          }
        ]
      }
    ];
  }
};
