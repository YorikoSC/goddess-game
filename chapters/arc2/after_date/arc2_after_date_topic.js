export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Let's change the subject. How about meeting this evening?"
        } : {
            msg1: "Давай сменим тему. Как насчёт того, чтобы встретиться сегодня вечером?"
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
            result1a: "Fine, let's change it... But we'll get back to this conversation, sweetie 😏",
            result1b: "Can't tonight, I have... a meetup with friends. Maybe tomorrow?",
            nextChapter: "arc2_after_date_final"
        } : {
            result1a: "Ладно, сменим... Но к этому разговору мы ещё вернёмся, сладкий 😏",
            result1b: "Сегодня не могу, у меня... встреча с подругами. Может, завтра?",
            nextChapter: "arc2_after_date_final"
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
                        delay: 2000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};