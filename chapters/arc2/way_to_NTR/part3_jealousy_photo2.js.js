export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Here's another one... What do you think?"
        } : {
            msg1: "А вот ещё одно... Как тебе?"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000
            },
            {
                type: "photo",
                src: "img/photos/photo_name_4.jpg",
                description: "На фото девушка танцует в клубе, какой-то мужчина обнимает её сзади за талию",
                delay: 1500
            },
            {
                type: "received",
                text: gameState.language === 'en' ? 
                    "This is from a corporate party last month. He was so persistent about asking me to dance..." : 
                    "Это с корпоратива в прошлом месяце. Он так настойчиво приглашал меня на танец...",
                delay: 2000
            },
            {
                type: "received",
                text: gameState.language === 'en' ? 
                    "You don't mind, do you? I can see it... affects you 😏" : 
                    "Ты же не против? Я вижу, тебя это... волнует 😏",
                delay: 1500,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Listen, I don't like this. Let's stop.",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_reaction.js"
        } : {
            choice1: "Слушай, мне это не нравится. Давай прекратим.",
            nextChapter: "arc2/way_to_NTR/part3_jealousy_reaction.js"
        };

        return [
            {
                id: "express_dislike",
                text: texts.choice1,
                nextChapter: texts.nextChapter 
                        
                    }
                ]
            }
    
    
};