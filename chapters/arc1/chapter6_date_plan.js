// chapters/chapter6_date_plan.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "The restaurant sounds great! What time works for you?",
      msg2: "How about 7:00 PM? It will be a beautiful sunset 🌅",
      msg3: "I'm so glad we'll finally spend time together outside the university!"
    } : {
      msg1: "Ресторан звучит отлично! Во сколько тебе удобно?",
      msg2: "Давай в 19:00? Как раз будет красивый закат 🌅",
      msg3: "Я так рада, что мы наконец-то проведём время вместе вне университета!"
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
        delay: 6000
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I'm excited too. I've been wanting to ask you out for a while.",
      result1a: "Really? Why didn't you ask me before? 🤔",
      result1b: "Well, it doesn't matter. The main thing is that we're finally going!",
      choice2: "I hope we won't be interrupted by calls...",
      result2a: "Here you go again! 😄 Don't worry, I'll turn off my phone.",
      result2b: "So nothing will distract us from each other..."
    } : {
      choice1: "Я тоже очень рад. Давно хотел пригласить тебя куда-нибудь.",
      result1a: "Правда? А почему не пригласил? 🤔",
      result1b: "Ладно, неважно. Главное, что мы наконец-то идём!",
      choice2: "Надеюсь, нам никто не будет нам мешать заонками...",
      result2a: "Опять ты за своё! 😄 Не волнуйся, я выключу телефон.",
      result2b: "Так что ничего не будет отвлекать нас друг от друга..."
    };
    
    return [
      {
        id: "wanted_to_ask",
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
        id: "no_interruptions",
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
