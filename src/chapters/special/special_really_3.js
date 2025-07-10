export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Okay, okay, sorry, babe! We got carried away. But real talk, Amina’s guy’s dick is insane, and we were joking about how you’d react seeing it! 😈",
    } : {
      msg1: "Окей, окей, сорри, милый! Мы заигрались. Но если честно, у Амины парень с таким хером, что мы начали ржать и думать, как бы ты отреагировал, если б увидел! 😈",
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
      choice1: "Wait, you showed Amina my dick pic? That’s fucked up! What else did you say?",
    } : {
      choice1: "Отреагировал? В смысле? Ты думаешь, мне бы это понравилось?",
    };

    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        nextChapter: 'special_really_3a'
          }
        ];
      }
  }
