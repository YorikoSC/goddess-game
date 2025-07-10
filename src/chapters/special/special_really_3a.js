export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
    } : {
      msg1: "Ну кек, мы подумали, может, тебе бы зашло! Амина такая - а вдруг он в куколды хочет? 😏",
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
      choice2: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
    } : {
      choice2: "В куколды?! Ты сейчас серьёзно? Я в шоке, что ты такое вообще сказала... Она ж всем разболтает про это..",
    };

    return [
        {
            id: "choice2",
            text: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_4'
          },
        ];
      }
    }
