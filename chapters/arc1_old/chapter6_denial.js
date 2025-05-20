// chapters/chapter6_denial.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I really am just concerned about you. I don't want anyone to hurt you.",
      msg2: "That's very sweet of you. Really! 💕",
      msg3: "You know, there aren't many people who genuinely care about me..."
    } : {
      msg1: "Я действительно просто беспокоюсь о тебе. Не хочу, чтобы кто-то тебя обидел.",
      msg2: "Это очень мило с твоей стороны. Правда! 💕",
      msg3: "Знаешь, не так много людей, которые искренне беспокоятся обо мне..."
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
      choice1: "I'll always be there if you need me. You can count on me.",
      result1a: "Thank you! That means so much to me... 🥺",
      result1b: "Maybe we could go somewhere this weekend? Just the two of us, without any photographers?",
      choice2: "You matter to me... more than just a friend.",
      result2a: "Wow! I wasn't expecting such a confession... 😳",
      result2b: "You know, I like you too. I've wanted to tell you for a while..."
    } : {
      choice1: "Я всегда буду рядом, если понадоблюсь. Можешь на меня рассчитывать.",
      result1a: "Спасибо! Это так много для меня значит... 🥺",
      result1b: "Может, сходим куда-нибудь на выходных? Просто вдвоем, без всяких фотографов?",
      choice2: "Ты мне небезразлична... больше, чем просто друг.",
      result2a: "Ого! Я не ожидала такого признания... 😳",
      result2b: "Знаешь, ты мне тоже очень нравишься. Давно хотела тебе сказать..."
    };
    
    return [
      {
        id: "always_there",
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
            nextChapter: "chapter6_date_plan"
          }
        ]
      },
      {
        id: "more_than_friend",
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
            nextChapter: "chapter6_compliment"
          }
        ]
      }
    ];
  }
};
