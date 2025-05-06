export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Seriously? I thought it turns you on...",
            msg2: "That's different...",
            msg3: "Aww, are you jealous? 💕",
            msg4: "But aren't you curious..."
        } : {
            msg1: "Серьёзно? А мне показалось...",
            msg2: "Это другое...",
            msg3: "Ооо, ревнуешь? 💕",
            msg4: "Но разве тебе не интересно..."
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1500
            },
            {
                type: "sent",
                text: texts.msg2,
                delay: 1500
            },
            {
                type: "received",
                text: texts.msg3,
                delay: 1000
            },
            {
                type: "received",
                text: texts.msg4,
                delay: 2000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        // Добавляем защиту от повторного выполнения
        if (gameState._choiceLock) return [];
        gameState._choiceLock = true;

        const texts = gameState.language === 'en' ? {
            choice1: "No, I'm not interested.",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_insist.js"
        } : {
            choice1: "Нет, не интересно. Пожалуйста, хватит.",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_insist.js"
        };

        return [
            {
                id: "reject",
                text: texts.choice1,
                nextChapter: texts.nextChapter 
                    
                        
                    }
                ]
            }
        
    
};