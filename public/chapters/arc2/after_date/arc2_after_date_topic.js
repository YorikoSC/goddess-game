export default {
    getText(gameState) {
        return [];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1:"Let's change the subject. How about meeting this evening?",
            result1a: "Fine, let's change it... But we'll get back to this conversation, sweetie 😏",
            result1b: "Can't tonight, I have... a meetup with friends. Maybe tomorrow?",
            nextChapter: "after_date/arc2_after_date_final"
        } : {
            choice1:"Давай сменим тему. Как насчёт того, чтобы встретиться сегодня вечером?",
            result1a: "Ладно, сменим... Но к этому разговору мы ещё вернёмся, сладкий 😏",
            result1b: "Сегодня не могу, у меня... встреча с подругами. Может, завтра?",
            nextChapter: "after_date/arc2_after_date_final"
        };

        return [
            {
                id: "reaction",
                text: texts.choice1,
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