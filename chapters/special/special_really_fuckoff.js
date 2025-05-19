export default {
    getText(gameState) {
        const text = gameState.language === 'en' ? {
            msg1: "Oh, come on.",
        } : {
            msg1: "Да ладно тебе",
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
            msg2: "FUCK OFF!?",
        } : {
            msg2: "ОТ-ВА-ЛИ!",
        };

        return [
            {
                id: "really",
                choice: text.msg2,
                delay: 1500,
                nextChapter: "special_end"
            }
          ];
        }
    }
