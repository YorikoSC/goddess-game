export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Yes, I noticed you were constantly texting someone. And even took your smartphone to the bathroom."
        } : {
            msg1: "Да, я заметил, что ты постоянно с кем-то переписывалась. И даже в туалет со смартфоном ходила."
        };

        return [
            {
                type: "sent",
                text: texts.msg1,
                delay: 1000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            result1a: "Oh, are you keeping tabs on me? 😳",
            result1b: "My friend was just texting me... She has problems with her boyfriend and needed advice.",
            result1c: "And going to the bathroom... well, girls sometimes need to fix their makeup, take selfies...",
            nextChapter: "arc2_after_date_photo"
        } : {
            result1a: "Ой, ты следишь за мной? 😳",
            result1b: "Просто подруга писала... У неё проблемы с парнем, нужен был совет.",
            result1c: "А в туалет... ну, девушкам иногда нужно поправить макияж, сделать селфи...",
            nextChapter: "arc2_after_date_photo"
        };

        return [
            {
                id: "reaction",
                result: [
                    {
                        type: "received",
                        text: texts.result1a,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.result1b,
                        delay: 2000
                    },
                    {
                        type: "received",
                        text: texts.result1c,
                        delay: 3000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};