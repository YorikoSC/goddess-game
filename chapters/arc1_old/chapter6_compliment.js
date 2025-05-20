// chapters/chapter6_compliment.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Really? I didn't expect that response...",
      msg2: "What did you expect? That I would reject you? 😄",
      msg3: "We spend so much time together at university... I thought you noticed my signs of attention long ago."
    } : {
      msg1: "Правда? Я не ожидал такого ответа...",
      msg2: "А чего ты ожидал? Что я тебя отвергну? 😄",
      msg3: "Мы столько времени проводим вместе в университете... Я думала, ты давно заметил мои знаки внимания."
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
      choice1: "Maybe we could go somewhere together this weekend?",
      result1a: "I'd love to! Maybe to the restaurant on the embankment, and then a walk along the river? 🌃",
      result1b: "They say it's very romantic there, especially in the evening...",
      choice2: "I just didn't think everything would happen so quickly...",
      result2a: "Haha, I didn't expect it either! 💫 I can feel you blushing even through the screen!",
      result2b: "That's not true! I'm not blushing, I'm just a little embarrassed... if that's the case, let's spend more time together.",
      result2c: "Maybe we could start doing homework together? How about tomorrow?"
    } : {
      choice1: "Может, сходим куда-нибудь вместе на выходных?",
      result1a: "С удовольствием! Может, в ресторан на набережной, а потом прогуляемся вдоль реки? 🌃",
      result1b: "Говорят, там очень романтично, особенно вечером...",
      choice2: "Я просто не думал, что все будет так быстро...",
      result2a: "Хаха, я тоже не ожидала! 💫 Даже сквозь экран чувствую, как ты покраснел!",
      result2b: "Неправда! Я не покраснел, я просто немного смутился... раз так, давай проводить больше времени вместе.",
      result2c: "Может тогда начнем вместе делать домашние задания? Как насчет завтра?"
    };
    
    return [
      {
        id: "weekend_date",
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
        id: "surprised_reaction",
        text: texts.choice2,
        result: [
          {
            type: "received",
            text: texts.result2a,
            delay: 1000
          },
          {
            type: "sent",
            text: texts.result2b,
            delay: 2500
          },
          {
            type: "received",
            text: texts.result2c,
            delay: 4000,
            nextChapter: "chapter6_study_together"
          }
        ]
      }
    ];
  }
};
