export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Oh yeah, massive! She’s like, Lina, swap him for this beast! Kidding, obvs, you’re my lil champ! 😉",
    } : {
      msg1: "Огромный! Она такая Лина меняй своего на крупный калибр! Шутка, ясное дело, ты мой маленький чемпион! 😉",
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
      choice1: "Swap me? That’s not cool, Lina...",
      msg2: "Oh, don’t be a drama queen! Just girl talk, keke. You’re still my fave, even with that baby dick! 😏",
      choice2: "This is messed up... I don’t know how to feel about this.",
    } : {
      choice1: "Менять меня? Это не прикол, Лина...",
      msg2: "Да не ной, не будь такой истеричкой! Просто девчачьи тёрки, кек. Ты всё равно номер один для меня, с маленьким хуем или без! 😏",
      choice2: "Это пиздец... Я хз, что с этим делать.",
    };

    return [
      {
        id: "choice1",
        choice: texts.choice1,
        delay: 1500,
        result: [
          {
            type: "received",
            text: texts.msg2,
            delay: 1700
          },
          {
            id: "choice2",
            choice: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_2'
          },
        ]
      }
    ];
  }
};
