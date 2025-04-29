export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Yes, it's a beautiful place indeed. Did you enjoy it? Wasn't it boring?"
        } : {
            msg1: "Да, место действительно красивое. Тебе понравилось? Не было скучно?"
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
            result1a: "Boring? With you? No way! 😊",
            result1b: "Although... did you notice I was a bit distracted?",
            nextChapter: "arc2_after_date_phone"
        } : {
            result1a: "Скучно? С тобой? Ну что ты! 😊",
            result1b: "Хотя... ты заметил, что я была немного рассеянной?",
            nextChapter: "arc2_after_date_phone"
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
                        delay: 2000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};