export default {
    getText(gameState) {
        const text = gameState.language === 'en' ? {
            msg1: "Aww, you’re the best! Nighty-night, my cutie! 😘",
        } : {
            msg1: "Спасибо, милый! Ты топ! Споки-споки! 😘",
        };

        return [
            {
                type: "received",
                text: text.msg1,
                delay: 1000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const text = gameState.language === 'en' ? {
            msg3: "I'm not sure.",
        } : {
            msg3: "не уверен..",
        };
        return [
            {
                id: "forget",
                text: text.msg3,
                delay: 1500,
                nextChapter: "special_end"
             }
        ];
   }
}
