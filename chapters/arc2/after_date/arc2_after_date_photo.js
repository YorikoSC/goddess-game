export default {
    getText(gameState) {
        return [];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "When you came back from the bathroom, your bra strap was down on your shoulder. As if you were taking some intimate photo.",
            result1a: "What?! Are you seriously accusing me of this?! 😠",
            result1b: "Maybe it just slipped down accidentally! Or I was adjusting my dress!",
            result1c: "I can't believe you don't trust me!",
            nextChapter: "arc2_after_date_calm"
        } : {
            choice1: "Когда ты вернулась из туалета, у тебя была спущена бретелька лифчика на плече. Как будто ты делала какую-то интимную фотографию.",
            result1a: "Что?! Ты серьёзно меня в этом обвиняешь?! 😠",
            result1b: "Может, она просто случайно спустилась! Или я поправляла платье!",
            result1c: "Я не могу поверить, что ты мне не доверяешь!",
            nextChapter: "arc2_after_date_calm"
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