export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Okay, tomorrow then. Text me when you're free."
        } : {
            msg1: "Хорошо, завтра. Напиши, когда освободишься."
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
            result: "I will! And... maybe I'll send you a couple more photos... especially for you 💋",
            nextChapter: "arc2_next_chapter"
        } : {
            result: "Обязательно! И... может быть, пришлю тебе ещё пару фото... специально для тебя 💋",
            nextChapter: "arc2_next_chapter"
        };

        return [
            {
                id: "final",
                result: [
                    {
                        type: "received",
                        text: texts.result,
                        delay: 1000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};