export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Are you sure? Because your reaction says otherwise...",
            msg2: "I can tell you what they whisper to me when you're not looking 😈",
            msg3: "I'm absolutely sure. This is unpleasant for me.",
            msg4: "Hmm... interesting. First you got so excited, and now you've suddenly changed your mind.",
            msg5: "Are you really sure you want to stop? Maybe just admit that you like it, but you're afraid to admit it?"
        } : {
            msg1: "Ты уверен? Потому что твоя реакция говорит об обратном...",
            msg2: "Я могу рассказать, что они мне шепчут, когда ты не видишь 😈",
            msg3: "Я абсолютно уверен. Мне это неприятно.",
            msg4: "Хм... интересно. Сначала ты так завёлся, а теперь вдруг передумал.",
            msg5: "Точно уверен, что хочешь прекратить? Может, просто признайся, что тебе это нравится, но ты боишься в этом признаться?"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1500
            },
            {
                type: "received",
                text: texts.msg2,
                delay: 1500
            },
            {
                type: "sent",
                text: texts.msg3,
                delay: 1500
            },
            {
                type: "received",
                text: texts.msg4,
                delay: 2000
            },
            {
                type: "received",
                text: texts.msg5,
                delay: 2000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Actually, I do like it...",
            choice2: "No, I really don't like it",
            nextChapter1: "arc2/way_to_NTR/part3_date_1_like",
            nextChapter2: "arc2/way_to_NTR/part3_date_1_not_like"
        } : {
            choice1: "Вообще-то, мне это нравится...",
            choice2: "Нет, мне правда это не нравится",
            nextChapter1: "arc2/way_to_NTR/part3_date_1_like",
            nextChapter2: "arc2/way_to_NTR/part3_date_1_not_like"
        };

        return [
            {
                id: "like_jealousy",
                text: texts.choice1,
                result: [
                    {
                        type: "sent",
                        text: texts.choice1,
                        delay: 1000,
                        nextChapter: texts.nextChapter1
                    }
                ]
            },
            {
                id: "dislike_jealousy",
                text: texts.choice2,
                result: [
                    {
                        type: "sent",
                        text: texts.choice2,
                        delay: 1000,
                        nextChapter: texts.nextChapter2
                    }
                ]
            }
        ];
    }
};