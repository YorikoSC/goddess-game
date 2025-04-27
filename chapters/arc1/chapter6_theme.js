// chapters/chapter6_theme.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Let's go with something stylish after all. The 90s style sounds interesting!",
      msg2: "Great! I can already imagine it: high-waisted jeans, bright colors, large accessories... 👖✨",
      msg3: "By the way, the photographer said he could give us a discount if we come next Saturday. Are you free?"
    } : {
      msg1: "Давай всё-таки что-то стильное. В стиле 90-х звучит интересно!",
      msg2: "Отлично! Я уже представляю: джинсы с высокой талией, яркие цвета, крупные аксессуары... 👖✨",
      msg3: "Кстати, фотограф сказал, что может сделать нам скидку, если мы придём в следующую субботу. Ты свободен?"
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
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Yes, I'm free on Saturday. What time shall we meet?",
      result1a: "Great! Let's meet at 1:00 PM at the studio. I'll send you the address tomorrow 📍",
      result1b: "Can't wait! It's going to be so much fun! 🎉",
      choice2: "Can I first watch how you do a photoshoot? I'm not sure I'm ready to participate right away.",
      result2a: "Of course you can! I understand your nervousness 😊",
      result2b: "Come to my shoot tomorrow, you'll see how it works. Then you can decide if you want to participate yourself."
    } : {
      choice1: "Да, в субботу я свободен. Во сколько встречаемся?",
      result1a: "Супер! Давай в 13:00 у студии. Я скину тебе адрес завтра 📍",
      result1b: "Не могу дождаться! Это будет так весело! 🎉",
      choice2: "А можно мне сначала посмотреть, как ты фотографируешься? Не уверен, что готов сразу участвовать.",
      result2a: "Конечно можно! Я понимаю твоё волнение 😊",
      result2b: "Приходи завтра на мою съёмку, посмотришь как это происходит. А потом решишь, хочешь ли участвовать сам."
    };
    
    return [
      {
        id: "agree_ask_time",
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
        id: "watch_first",
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
        nextChapter: "ark_final"
      }
    ];
  }
};
