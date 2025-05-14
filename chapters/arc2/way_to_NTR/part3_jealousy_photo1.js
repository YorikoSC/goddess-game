export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "See for yourself...",
            photo1: "./chapters/arc2/way_to_NTR/img/photo_name_6.jpg",
        } : {
            msg1: "Смотри сам...",
            photo1: "./chapters/arc2/way_to_NTR/img/photo_name_6.jpg",
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000
            },
            {
                type: "photo",
                src: texts.photo1,
                //description: "На фото девушка в обнимку с привлекательным мужчиной, оба улыбаются в камеру, её рука на его плече",
                delay: 1500,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Who is that?",
            nextChapter: "way_to_NTR/part3_jealousy_explain1"
        } : {
            choice1: "Это кто?",
            nextChapter: "way_to_NTR/part3_jealousy_explain1"
        };

        return [
            {
                id: "ask_who",
                text: texts.choice1,
                nextChapter: texts.nextChapter
            }
        ];
    }
};