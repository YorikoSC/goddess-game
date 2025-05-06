export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Just a friend. We work together. Nothing special!",
            msg2: "Although... he constantly compliments me 🙈"
        } : {
            msg1: "Просто друг. Мы вместе работаем. Ничего такого!",
            msg2: "Хотя... он постоянно делает мне комплименты 🙈"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000
            },
            {
                type: "received",
                text: texts.msg2,
                delay: 1500,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "I see...",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_photo2.js"
        } : {
            choice1: "Ясно...",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_photo2.js"
        };

        return [
            {
                id: "just_acknowledge",
                text: texts.choice1,
                nextChapter: texts.nextChapter 
                       
                    }
                ]
            }
        
    
};