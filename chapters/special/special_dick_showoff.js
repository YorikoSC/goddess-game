export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "OMG, look at this! Your lil guy is so cute, like a tiny shrimp! 😄",
          } : {
            msg1: "О Боже, только посмотрите на это! Твой малыш такой милый, как крошечная креветочка! 😄",
          };
    return [
        {
            type: "recived",
            text: texts.msg1,
            delay:1000,
        }
    ];
},
    getChoices (gameState){
        const texts = gameState.language === 'en' ? {
            choice1: "Wait, cute?! Lina, that’s not what I was going for!",
            msg7: "Chill, babe, don’t get your panties in a twist! It’s my fave little toy, okay? Just messin with ya, my sweet boy! 😘",
            choice2:"Whoa, for real? Didn’t expect that...",
            msg8: "Damn, it’s really a mini, huh? But I’m cool with it, size ain’t everything! 😏",
          } : {
            choice1: "Погоди, милый?! Лина, это не то, что я хотел услышать!",
            msg7: "Да ладно, не мурчи! Он мой любимый игрушечный малыш, ясно? Просто дразню, мой сладкий мальчик! 😘",
            choice2: "Всё равно как-то, чувствую себя неуверенно сейчас...",
            msg8: "Ну, серьёзно, он реально кроха. Но размер не главное! 😏",
          };
        
        return[
            {
                id: "choice1",
                text: texts.choice1,
                delay: 1000,
                action: (state) => {
                    state.choices["special_dick_showoff"] = { choice1: true };
                },
                result: [
                    {
                      type: "received",
                      text: texts.msg7,
                      delay: 1000,
                      nextChapter: 'special_monolog'
                    }
                  ]
                },
            {
                id: "choice2",
                text: texts.choice2,
                delay: 1000,
                action: (state) => {
                    state.choices["special_dick_showoff"] = { choice2: true };
                },
                result: [
                    {
                        type: "received",
                        text: texts.msg8,
                        delay: 1000,
                        nextChapter: 'special_monolog'
                    }
                ]
            },
        ];
    },
}
