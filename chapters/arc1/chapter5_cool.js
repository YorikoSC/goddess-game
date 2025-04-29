// chapters/chapter5_cool.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "A friend from university? Is that about me?",
      msg2: "You're perceptive! 😉 Of course it's about you.",
      msg3: "So... does this mean we have a date? Since I already told the photographer I'm dating you..."
    } : {
      msg1: "Друг из университета? Это про меня?",
      msg2: "А ты догадливый! 😉 Конечно про тебя.",
      msg3: "Так что... получается, у нас с тобой свидание? Раз я уже сказала фотографу, что встречаюсь с тобой..."
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
      choice1: "Yes, let's meet. Where shall we go?",
      result1a: "Wow! Wasn't expecting such decisiveness! 😍",
      result1b: "Maybe to that new restaurant on the embankment? They say it has a very romantic atmosphere...",
      choice2: "Are you just using me as an excuse?",
      result2a: "There you go again, misunderstanding everything! 🙄",
      result2b: "I really would like to spend time with you... If you don't mind, of course."
    } : {
      choice1: "Да, давай встретимся. Куда пойдём?",
      result1a: "Ого! Не ожидала такой решительности! 😍",
      result1b: "Может, в тот новый ресторан на набережной? Говорят, там очень романтичная атмосфера...",
      choice2: "Ты меня просто используешь как отговорку?",
      result2a: "Ну вот, опять ты всё неправильно понял! 🙄",
      result2b: "Я действительно хотела бы провести с тобой время... Если ты, конечно, не против."
    };
    
    return [
      {
        id: "agree_to_date",
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
        id: "question_motive",
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
            nextChapter: "chapter6_misunderstanding"
          }
        ]
      }
    ];
  }
};
