export default {
    getText(gameState) {
        const text = gameState.language === 'en' ? {
            msg1: "Lol, just a vibe check, silly! Wanted to sneak a peek at my man’s goods over latte! 😜",
        } : {
            msg1: "Ха, просто прикол, глупый! Захотела глянуть на богатство своего парня за латте! 😜",
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
            msg2: "Nah, for real, what’s the deal?",
            msg3: "Okay, I’ll drop it. Have fun at the café.",
            msg4: "Fuck this, I’m done. Don’t talk to me tonight.",
        } : {
            msg2: "Нет, серьёзно, в чём дело?",
            msg3: "Ладно, проехали. Веселись в кафе.",
            msg4: "Пиздец, всё, отвали. Не пиши мне сегодня.",
        };

        return [
            {
                id: "really",
                text: text.msg2,
                delay: 1500,
                nextChapter: "special_really"
            },
            {
                id: "forget",
                text: text.msg3,
                delay: 1500,
                nextChapter: "special_wtf_forget"
            },
            {
                id: "fuckoff",
                text: text.msg4,
                nextChapter: "special_really_fuckoff"
            }
        ];
    }
}

