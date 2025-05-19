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
            msg3a: "Aww, you’re the best! Nighty-night, my cutie! 😘",
            msg3b: "Whatever, enjoy your café... I’m out for now. Night.",
            msg4: "Fuck this, I’m done. Don’t talk to me tonight.",
            msg4a: "Whoa, babe, chill! Okay, I’ll back off. Sleep it off, we’ll talk later, k? 😔",
        } : {
            msg2: "Нет, серьёзно, в чём дело?",
            msg3: "Ладно, проехали. Веселись в кафе.",
            msg3a: "Спасибо, милый! Ты топ! Споки-споки! 😘",
            msg3b: "не уверен..",
            msg4: "Пиздец, всё, отвали. Не пиши мне сегодня.",
            msg4a: "Да ладно тебе",
        };

        return [
            {
                id: "really",
                choice: text.msg2,
                delay: 1500,
                nextChapter: "special_really"
            },
            {
                id: "forget",
                choice: text.msg3,
                delay: 1500,
                result: [
                    {
                        type: "received",
                        text: text.msg3a,
                        delay: 1700
                    },
                    {
                        id: "3b",
                        text: text.msg3b,
                        delay: 2100,
                        nextChapter: 'special_end'
                    }
                ]
            },
            {
                id: "fuckoff",
                choice: text.msg4,
                delay: 1500,
                result: [
                    {
                        type: "received",
                        text: text.msg4a,
                        delay: 1700
                    },
                    {
                        id: "3b",
                        text: text.msg3b,
                        delay: 2100,
                        nextChapter: 'special_end'
                    }
                ]
            }
        ];
    }
}
