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
      msg2: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
      choice2: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
    } : {
      choice1: "Отреагировал? В смысле? Ты думаешь, мне бы это понравилось?",
      msg2: "Ну кек, мы подумали, может, тебе бы зашло! Амина такая - а вдруг он в куколды хочет? ",
      choice2: "В куколды?! Ты сейчас серьёзно? Я в шоке, что ты такое вообще сказала... Она ж всем разболтает про это..",
    };

    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        result: [
          {
            type: "received",
            text: texts.msg2,
            delay: 1700
          },
          {
            id: "choice2",
            text: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_4'
          },
        ]
      }
    ];
  }
};
