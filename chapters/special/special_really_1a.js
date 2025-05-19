export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Oh, don’t be a drama queen! Just girl talk, keke. You’re still my fave, even with that baby dick! 😏",
    } : {
      msg1: "Да не ной, не будь такой истеричкой! Просто девчачьи тёрки, кек. Ты всё равно номер один для меня, с маленьким хуем или без! 😏",
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice2: "This is messed up... I don’t know how to feel about this.",
    } : {
      choice2: "Это пиздец... Я хз, что с этим делать.",
    };

    return [
          {
            id: "choice2",
            text: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_2'
          }
        ];
      }
  }
