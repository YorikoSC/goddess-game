export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "See for yourself..."
        } : {
            msg1: "Смотри сам..."
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000
            },
            {
                type: "photo",
                src: "img/photos/photo_name_6.jpg", // Добавьте правильный путь к изображению
                description: "На фото девушка в обнимку с привлекательным мужчиной, оба улыбаются в камеру, её рука на его плече",
                delay: 1500,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Who is that?",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_explain1.js"
        } : {
            choice1: "Это кто?",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_explain1.js"
        };

        return [
            {
                id: "ask_who",
                text: texts.choice1,
                nextChapter: texts.nextChapter 
                        
                    }
                ]
            }
        
    
};