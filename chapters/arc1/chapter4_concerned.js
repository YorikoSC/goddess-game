// chapters/chapter4_concerned.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "It's not about other guys. I just don't want your studies to suffer.",
      msg2: "Yeah, sure! I can see right through you 👀",
      msg3: "But you're right. Exams first, everything else later.",
      msg4: "Speaking of studies... Can you help me prepare for the economics test?"
    } : {
      msg1: "Дело не в других парнях. Просто не хочу, чтобы учёба пострадала.",
      msg2: "Да-да, конечно! Я же вижу тебя насквозь 👀",
      msg3: "Но вообще ты прав. Сначала экзамены, потом всё остальное.",
      msg4: "Кстати о учёбе... Поможешь мне подготовиться к тесту по экономике?"
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
      choice1: "Of course! When would be convenient to meet?",
      result1a: "Maybe tomorrow evening? No one will be at my place... 😏",
      result1b: "Or we could go to the library. It's quiet there and we can focus",
      result1c: "We can study peacefully, without distractions!",
      choice2: "Sorry, I can't right now. I have a lot going on myself, and I was planning to take on a part-time job.",
      result2a: "You're such a meanie 😒",
      result2b: "Let's do this.",
      result2c: "You help me, and I'll give you a gift!"
    } : {
      choice1: "Конечно! Когда удобно встретиться?",
      result1a: "Может, завтра вечером? У меня дома никого не будет... 😏",
      result1b: "Либо можем в библиотеку пойти. Там тихо и можно сосредоточиться",
      result1c: "Сможем спокойно позаниматься, без отвлечений!",
      choice2: "Прости, я не могу сейчас. У меня самого много дел, еще на подработку хотел пойти.",
      result2a: "Вот ты бяка 😒",
      result2b: "Давай так.",
      result2c: "Ты мне помогаешь, с меня подарок!"
    };
    
    return [
      {
        id: "agree_to_help",
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
          },
          {
            type: "received",
            text: texts.result1c,
            delay: 4000
          }
        ],
        nextChapter: "chapter6_study_together"
      },
      {
        id: "decline_to_help",
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
            delay: 1500
          },
          {
            type: "received",
            text: texts.result2c,
            delay: 1500
          }
        ],
        nextChapter: "chapter5_gift"
      }
    ];
  }
};
