// chapters/chapter4_jealous.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I'm not jealous. I'm just concerned about you.",
      msg2: "Sure, of course 😏 Your ears are turning red even through messages!",
      msg3: "If you want to know, he invited me to dinner after the photoshoot..."
    } : {
      msg1: "Я не ревную. Просто беспокоюсь о тебе.",
      msg2: "Ну-ну, конечно 😏 Твои уши краснеют даже через сообщения!",
      msg3: "Если хочешь знать, он пригласил меня на ужин после фотосессии..."
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
      choice1: "And you agreed?",
      result1a: "What if I did? 🤔",
      result1b: "Just kidding! Of course not. I said I already had plans.",
      choice2: "That's your business. You're a free woman.",
      result2a: "Wow! You're so... calm 😐",
      result2b: "If you're interested, I declined. Said I was meeting a friend from university..."
    } : {
      choice1: "И ты согласилась?",
      result1a: "А что, если да? 🤔",
      result1b: "Шучу! Конечно нет. Я сказала, что у меня уже есть планы.",
      choice2: "Это твоё дело. Ты свободная девушка.",
      result2a: "Ого! Какой ты... спокойный 😐",
      result2b: "Если тебе интересно, я отказалась. Сказала, что встречаюсь с другом из университета..."
    };
    
    return [
      {
        id: "ask_if_agreed",
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
            nextChapter: "chapter5_relief"
          }
        ]
      },
      {
        id: "act_cool",
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
            nextChapter: "chapter5_cool"
          }
        ]
      }
    ];
  }
};
