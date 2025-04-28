export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "My personal protector! How sweet 🥰",
      msg2: "You know, I like that you care about me so much..."
    } : {
      msg1: "Мой персональный защитник! Как мило 🥰",
      msg2: "Знаешь, мне нравится, что ты так заботишься обо мне..."
    };

    // Возвращаем пустой массив, все сообщения будут в результатах выборов
    return [];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I'll always protect you.",
      result1: "My hero! 💖",
      choice2: "That's what friends are for, right?",
      result2: "Friends... sure. 😏"
    } : {
      choice1: "Я всегда буду тебя защищать.",
      result1: "Мой герой! 💖",
      choice2: "Для этого и нужны друзья, верно?",
      result2: "Друзья... конечно. 😏"
    };
    
    return [
      {
        id: "promise_protection",
        text: texts.choice1,
        result: [
          {
            type: "received",
            text: texts.result1,
            delay: 4000,
            nextChapter: "warm_good_night"
          }
        ]
      },
      {
        id: "just_friends",
        text: texts.choice2,
        result: [
          {
            type: "received",
            text: texts.result2,
            delay: 4000,
            nextChapter: "warm_good_night"
          }
        ]
      }
    ];
  }
};