// chapters/chapter6_study_together.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Great idea! It will be more effective to prepare together.",
      msg2: "Awesome! I knew you'd agree! 📚",
      msg3: "So where? Quick, choose, haha. At my place or in the library?"
    } : {
      msg1: "Отличная идея! Вместе будет эффективнее готовиться.",
      msg2: "Супер! Я знала, что ты согласишься! 📚",
      msg3: "Так где? Быстрее выбирай давай, хаха. У меня дома или в библиотеке?"
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
      choice1: "Let's go to the library. It's quiet there and we can concentrate.",
      result1a: "Alright, let's do the library. Tomorrow at 4:00 PM? 🕓",
      result1b: "Don't forget your economics notes! I really need them.",
      choice2: "We can do it at your place, if that's more convenient for you.",
      result2a: "Perfect! There's no one at my home anyway... We can study in peace 😊",
      result2b: "And I'll make something delicious! You like chocolate cookies, right?"
    } : {
      choice1: "Давай в библиотеке. Там тихо и можно сосредоточиться.",
      result1a: "Ладно, пусть будет библиотека. Завтра в 16:00? 🕓",
      result1b: "Только не забудь свои конспекты по экономике! Они мне очень нужны.",
      choice2: "Можно у тебя, если тебе так удобнее.",
      result2a: "Отлично! У меня как раз никого не будет дома... Сможем спокойно позаниматься 😊",
      result2b: "И я приготовлю что-нибудь вкусное! Ты ведь любишь шоколадное печенье?"
    };
    
    return [
      {
        id: "choose_library",
        text: texts.choice1,
        action: (state) => { state.choices['chapter6_study_together'] = true;},
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
            nextChapter: "cold_good_night"
          }
        ]
      },
      {
        id: "choose_her_place",
        text: texts.choice2,
        action: (state) => { state.choices['chapter6_study_together'] = true;},
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
            nextChapter: "warm_good_night"
          }
        ]
      }
    ];
  }
};
