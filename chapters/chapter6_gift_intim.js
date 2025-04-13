// chapters/chapter6_gift_intim.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Haha!",
      msg2: "Where shall we study?"
    } : {
      msg1: "Хаха!",
      msg2: "Где будем заниматься?"
    };
    
    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 500
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 1500
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "We can do it at your place, if that's more convenient for you.",
      result1a: "Perfect! No one will be at my home... We can study in peace 😊",
      result1b: "And I'll make something delicious! You like chocolate cookies, right?",
      choice2: "Let's go to the library. It's quiet and we can focus.",
      result2a: "Alright, the library it is. Tomorrow at 4:00 PM? 🕓",
      result2b: "Just don't forget your economics notes! I really need them."
    } : {
      choice1: "Можно у тебя, если тебе так удобнее.",
      result1a: "Отлично! У меня как раз никого не будет дома... Сможем спокойно позаниматься 😊",
      result1b: "И я приготовлю что-нибудь вкусное! Ты ведь любишь шоколадное печенье?",
      choice2: "Давай в библиотеке. Там тихо и можно сосредоточиться.",
      result2a: "Ладно, пусть будет библиотека. Завтра в 16:00? 🕓",
      result2b: "Только не забудь свои конспекты по экономике! Они мне очень нужны."
    };
    
    return [
      {
        id: "her_place",
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
        nextChapter: "warm_good_night"
      },
      {
        id: "library",
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
        nextChapter: "warm_good_night"
      }
    ];
  }
};
