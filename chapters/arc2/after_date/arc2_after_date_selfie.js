export default {
    getText(gameState) {
        return [];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1:"Who were you taking this photo for? Clearly not a sea view.",
            result1a: "For you, of course! I wanted to surprise you later... 🙈",
            result1b: "I just didn't want to admit it right away...",
            nextChapter: "arc2_after_date_doubt"
        } : {
            choice1:"Для кого ты делала это фото? Явно не морской пейзаж.",
            result1a: "Для тебя, конечно! Хотела сделать сюрприз потом... 🙈",
            result1b: "Просто не хотела признаваться сразу...",
            nextChapter: "arc2_after_date_doubt"
        };

        return [
            {
                id: "reaction",
                text: texts.choice1,
                result: [
                    {
                        type: "received",
                        text: texts.result1a,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.result1b,
                        delay: 2000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};