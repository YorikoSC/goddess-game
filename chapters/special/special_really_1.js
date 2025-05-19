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
    } : {
      choice1: "Менять меня? Это не прикол, Лина...",
    };

    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        nextChapter: "special_really_1a"
      }
        ];
      }
  }
