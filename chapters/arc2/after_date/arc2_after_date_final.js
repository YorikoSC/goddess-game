export default {
    getText(gameState) {
        return [];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1:"Okay, tomorrow then. Text me when you're free.",
            result: "I will! And... maybe I'll send you a couple more photos... especially for you 💋",
            nextChapter: "arc2/way_to_NTR/look_what_i_have"
        } : {
            choice1:"Хорошо, завтра. Напиши, когда освободишься.",
            result: "Обязательно! И... может быть, пришлю тебе ещё пару фото... специально для тебя 💋",
            nextChapter: "arc2/way_to_NTR/look_what_i_have"
        };

        return [
            {
                id: "final",
                text: texts.choice1,
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