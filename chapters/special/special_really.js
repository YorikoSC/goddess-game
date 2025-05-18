export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Ugh, fine, you got me! We were comparing our guys’ dicks, happy now? 😂",
    } : {
      msg1: "Уф, ладно, спалил! Мы сравнивали члены наших парней, доволен? 😂",
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      }
      getChoices (gameState){
        const texts = gameState.language === 'en' ? {
            choice1: "Comparing?! Are you serious? What did Amina say about mine?",
            msg2: "Chill, babe, don’t get your panties in a twist! It’s my fave little toy, okay? Just messin with ya, my sweet boy! 😘",
            msg3: "She was dying, said it’s tiny but adorable. But hers? Fuck, her guy’s packing a cannon! We lost it! 😈",
            choice2: "A cannon? So it’s that much bigger?",
          } : {
            choice1: "Сравнивали?! Ты гонишь! И что Амина сказала про мой?",
            msg2: "Да ладно, не мурчи! Он мой любимый игрушечный малыш, ясно? Просто дразню, мой сладкий мальчик! 😘",
            msg15: "Она угорала, сказала, что он крошечный, но милый. А её? Сука, у её парня просто конский хер",
            choice2: "Конский? То есть он намного больше?",
          };
    return [
            {
                id: "choice1",
                text: texts.choice1,
                delay: 1500
            },
                result: [
            {
                type: "received",
                text: texts.msg2,
                delay: 1700
            },
            {
                type: "received",
                text: texts.msg3,
                delay: 1900
            },
            {
                id: "choice2",
                text: texts.choice2,
                delay: 2100,
                nextChapter: 'special_really_1'
            },
                ]
            },
        ];
  },
