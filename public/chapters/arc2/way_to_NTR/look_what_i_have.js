export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "By the way, since you reacted that way to my photo... I have something else 😏"
        } : {
            msg1: "Кстати, раз уж ты так отреагировал на моё фото... У меня есть кое-что ещё 😏"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "What exactly?",
            nextChapter: "way_to_NTR/part3_jealousy_photo1"
        } : {
            choice1: "Что именно?",
            nextChapter: "way_to_NTR/part3_jealousy_photo1"
        };

        return [
            {
                id: "ask_what",
                text: texts.choice1,
                nextChapter: texts.nextChapter
            }
        ];
    }
};