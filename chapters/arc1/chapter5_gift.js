// chapters/chapter5_gift.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Hmm... A gift? I don't know...",
      msg2: "Alright, I'll help. What kind of gift are we talking about?",
      msg3: "Sweetie! 🍬 Whatever you want, that's what it'll be!",
      msg4: "So, do we have a deal? Tomorrow at the library at 5:00 PM?"
    } : {
      msg1: "Хмм... Подарок? Я не знаю...",
      msg2: "Ладно, я помогу. О каком подарке идёт речь?",
      msg3: "Сладкий! 🍬 Что захочешь, то и будет!",
      msg4: "Так что, договорились? Завтра в библиотеке в 17:00?"
    };
    
    return [
      {
        type: "sent",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "sent",
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
        delay: 5500,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I want photos from your photoshoot... you know, the spicy ones 😏",
      result1a: "Wow! What demands you have! 😳",
      result1b: "Well... if you help me well with economics, then why not? We'll see what I can do 😉",
      result1c: "Great! Thanks in advance) I'll make time.",
      choice2: "Um... could I get photos of your, um... feet after university? If it's not too much trouble...",
      result2a: "My WHAT? 😲",
      result2b: "You certainly surprise me! I never would have thought... Okay, if you really help me with economics, then maybe 🙈"
    } : {
      choice1: "Я хочу фото с твоей фотосессии... ну, знаешь, откровенные 😏",
      result1a: "Ого! Какие у тебя запросы! 😳",
      result1b: "Ну... если хорошо поможешь мне с экономикой, то почему бы и нет? Посмотрим, что я смогу сделать 😉",
      result1c: "Отлично! Заранее спасибо) Я выделю время.",
      choice2: "Эм... можно мне фото твоих, эм... ступней после универа? Если не сложно...",
      result2a: "Моих ЧТО? 😲",
      result2b: "Ты меня точно удивляешь! Никогда бы не подумала... Ладно, если реально поможешь мне с экономикой, то может быть 🙈"
    };
    
    return [
      {
        id: "ask_spicy_photos",
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
            type: "sent",
            text: texts.result1c,
            delay: 4000,
            nextChapter: "chapter6_gift_intim"
          }
        ]
      },
      {
        id: "ask_feet_photos",
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
            nextChapter: "chapter6_gift_foot"
          }
        ]
      }
    ];
  }
};
