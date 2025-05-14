export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Seriously? I thought it turns you on. You said yourself that you got excited from my bathroom photo.",
            msg2: "That's different. I don't like seeing you with other men.",
            msg3: "Aww, are you jealous? That's so sweet! 💕",
            msg4: "But aren't you curious about how other men look at me? How they want me?"
        } : {
            msg1: "Серьёзно? А мне показалось, что тебя это заводит. Ты же сам сказал, что возбудился от моего фото из туалета.",
            msg2: "Это другое. Мне не нравится видеть тебя с другими мужчинами.",
            msg3: "Ооо, ревнуешь? Это так мило! 💕",
            msg4: "Но разве тебе не интересно, как другие мужчины смотрят на меня? Как они хотят меня?"
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
                delay: 2000
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
        if (gameState._choiceLock) return [];
        gameState._choiceLock = true;

        const texts = gameState.language === 'en' ? {
            choice1: "No, I'm not interested. Please, enough.",
            nextChapter: "way_to_NTR/part3_jealousy_insist"
        } : {
            choice1: "Нет, не интересно. Пожалуйста, хватит.",
            nextChapter: "way_to_NTR/part3_jealousy_insist"
        };

        return [
            {
                id: "reject",
                text: texts.choice1,
                delay: 1000,
                nextChapter: texts.nextChapter
            }
        ];
    }
};