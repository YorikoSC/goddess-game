export default {
    getText(gameState) {
        return []; // Empty array since we don't need initial messages
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Yes, it's a beautiful place indeed. Did you enjoy it? Wasn't it boring?",
            result1a: "Boring? With you? No way! 😊",
            result1b: "Although... did you notice I was a bit distracted?",
            nextChapter: "after_date/arc2_after_date_phone"
        } : {
            choice1: "Да, место действительно красивое. Тебе понравилось? Не было скучно?",
            result1a: "Скучно? С тобой? Ну что ты! 😊",
            result1b: "Хотя... ты заметил, что я была немного рассеянной?",
            nextChapter: "after_date/arc2_after_date_phone"
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