export default {
    getText(gameState) {
        return [];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1:"But you didn't send it to me yesterday. And you weren't planning to now.",
            result1a: "I... I wanted to find the right moment...",
            result1b: "Listen, are you seriously interrogating me right now? 😤",
            nextChapter: "arc2_after_date_topic"
        } : {
            choice1:"Но ты же не отправила мне его вчера. И сейчас не собиралась.",
            result1a: "Я... я хотела найти подходящий момент...",
            result1b: "Слушай, ты сейчас серьёзно устраиваешь мне допрос? 😤",
            nextChapter: "arc2_after_date_topic"
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