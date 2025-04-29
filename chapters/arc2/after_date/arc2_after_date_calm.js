export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "I'm just saying what I noticed. Don't be angry."
        } : {
            msg1: "Я просто говорю, что заметил. Не злись."
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
            result1a: "You know what? I was taking photos of the sea view from the bathroom window! There was an amazing sunset!",
            result1b: "Look, I'll send you the photo right now!",
            system: "*The photo shows the girl in the restaurant bathroom mirror, with a lowered strap, in a seductive pose*",
            result1c: "Oh... wait... wrong photo...",
            result1d: "Damn! Delete that! I didn't mean to send it!",
            nextChapter: "arc2_after_date_selfie"
        } : {
            result1a: "Знаешь что? Я фотографировала морской пейзаж из окна туалета! Там был потрясающий вид на закат!",
            result1b: "Вот, смотри! Сейчас скину тебе это фото!",
            system: "*На фото девушка в зеркале туалета ресторана, с приспущенной бретелькой, в соблазнительной позе*",
            result1c: "Ой... подожди... не то фото...",
            result1d: "Чёрт! Удали это! Я не хотела отправлять!",
            nextChapter: "arc2_after_date_selfie"
        };

        return [
            {
                id: "reaction",
                result: [
                    {
                        type: "received",
                        text: texts.result1a,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.result1b,
                        delay: 2000
                    },
                    {
                        type: "system",
                        text: texts.system,
                        image: "./img/chat/date_selfie.jpg",
                        delay: 3000
                    },
                    {
                        type: "received",
                        text: texts.result1c,
                        delay: 4000
                    },
                    {
                        type: "received",
                        text: texts.result1d,
                        delay: 5000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};