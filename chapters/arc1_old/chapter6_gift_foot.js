// chapters/chapter6_gift_foot.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I promise, I'll do everything I can!",
      msg2: "I bet you will 😂",
      msg3: "Where shall we study?"
    } : {
      msg1: "Обещаю, я сделаю всё, что смогу!",
      msg2: "Еще бы ты не сделал 😂",
      msg3: "Где будем заниматься?"
    };
    
    return [
      {
        type: "sent",
        text: texts.msg1,
        delay: 500
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 1500
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 2500,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "We can do it at your place, if that's more convenient for you.",
      result1a: "Perfect! No one will be at my home... We can study in peace 😊",
      result1b: "I'd offer you something sweet, but... you know, there'll be a different kind of dessert",
      choice2: "Let's go to the library. It's quiet and we can focus.",
      result2a: "Alright, the library it is. Tomorrow at 4:00 PM? 🕓",
      result2b: "Just don't forget your economics notes! I really need them.",
      result2c: "If you forget, you'll have to admire your own feet, haha. I'm serious",
      result2d: "I understand, honestly! I promise I won't forget"
    } : {
      choice1: "Можно у тебя, если тебе так удобнее.",
      result1a: "Отлично! У меня как раз никого не будет дома... Сможем спокойно позаниматься 😊",
      result1b: "Я бы предложила тебе что-то сладкое, но... знаешь, будет другой вид десерта",
      choice2: "Давай в библиотеке. Там тихо и можно сосредоточиться.",
      result2a: "Ладно, пусть будет библиотека. Завтра в 16:00? 🕓",
      result2b: "Только не забудь свои конспекты по экономике! Они мне очень нужны.",
      result2c: "Если забудешь, придётся любоваться своими собственными ступнями, хаха. Я серьёзно",
      result2d: "Я понял, честно! Обещаю, не забуду"
    };
    
    return [
      {
        id: "her_place",
        text: texts.choice1,
        action: (state) => { state.choices['chapter6_gift_foot'] = true;},
        result: [
          {
            type: "received",
            text: texts.result1a,
            delay: 1000
          },
          {
            type: "received",
            text: texts.result1b,
            delay: 3000,
            nextChapter: "warm_good_night"
          }
        ]
      },
      {
        id: "library",
        text: texts.choice2,
        action: (state) => { state.choices['chapter6_gift_foot'] = true;},
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
          },
          {
            type: "received",
            text: texts.result2c,
            delay: 4000
          },
          {
            type: "sent",
            text: texts.result2d,
            delay: 6000,
            nextChapter: "warm_good_night"
          }
        ]
      }
    ];
  }
};
