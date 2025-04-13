// chapters/chapter3_neutral.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I'll be waiting! I'm sure the photos turned out great.",
      msg2: "By the way, I was thinking about trying myself as a model. What do you think?",
      msg3: "I already have a few offers from small clothing brands...",
      msg4: "But I'm not sure if I should accept 🤔"
    } : {
      msg1: "Буду ждать! Уверен, фотографии получились отличные.",
      msg2: "Кстати, я думала о том, чтобы попробовать себя в роли модели. Как считаешь?",
      msg3: "У меня уже есть несколько предложений от небольших брендов одежды...",
      msg4: "Но я не уверена, стоит ли соглашаться 🤔"
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
        delay: 5500
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Of course you should! You have excellent model qualities.",
      result1a: "Really? Thanks for the support! 🥰",
      result1b: "Then I think I'll accept that offer from the swimwear brand...",
      choice2: "What about your studies? You have exams coming up...",
      result2a: "You're right... I should probably finish the semester first 📚",
      result2b: "Although... maybe you just don't want other guys looking at me? 😉"
    } : {
      choice1: "Конечно стоит! У тебя отличные данные для модели.",
      result1a: "Правда? Спасибо за поддержку! 🥰",
      result1b: "Тогда я, пожалуй, соглашусь на предложение от того бренда купальников...",
      choice2: "А учёба? У тебя же скоро экзамены...",
      result2a: "Ты прав... Наверное, стоит сначала закончить семестр 📚",
      result2b: "Хотя... может, ты просто не хочешь, чтобы другие парни на меня смотрели? 😉"
    };
    
    return [
      {
        id: "encourage_modeling",
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
        nextChapter: "chapter4_supportive"
      },
      {
        id: "remind_studies",
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
        nextChapter: "chapter4_concerned"
      }
    ];
  }
};
