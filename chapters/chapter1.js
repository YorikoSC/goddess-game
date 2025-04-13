export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Hey sweetie! 💋 Check out my new post on PureGram!",
      msg2: "Hi! I'm checking it now...",
      msg3: "Well? Did you like the décolleté? 😇",
      msg4: "Honestly, I want your opinion! 💄"
    } : {
      msg1: "Привет, сладкий! 💋 Посмотри мой новый пост в PureGram!",
      msg2: "Привет! Уже бегу смотреть...",
      msg3: "Ну как? Особенно понравилось декольте? 😇",
      msg4: "Честно-честно, хочу твоё мнение! 💄"
    };
    
    return [
      {
        type: "received",
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
        delay: 5500
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Wow, isn't the décolleté too deep?",
      result1a: "Oh come on! Let everyone be jealous of my style 💅",
      result1b: "By the way, about the photographer... I need to talk to you about him later 😏",
      choice2: "You look beautiful!",
      result2a: "Yeah, the décolleté turned out really well 💋",
      result2b: "I think the photographer was shamelessly staring there... But I'll tell you about that later 😈"
    } : {
      choice1: "Ого, а не слишком глубокое декольте?",
      result1a: "Да ладно тебе! Пусть все завидуют моему стилю 💅",
      result1b: "Кстати, насчёт фотографа... Мне надо будет потом с тобой посоветоваться 😏",
      choice2: "Выглядишь прекрасно!",
      result2a: "Ага, особенно декольте удалось 💋",
      result2b: "Кажется, фотограф бесстыдно засматривался туда... Но об этом позже 😈"
    };
    
    return [
      {
        id: "question_decollate",
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
        nextChapter: "chapter2"
      },
      {
        id: "compliment",
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
        nextChapter: "chapter2"
      }
    ];
  }
};