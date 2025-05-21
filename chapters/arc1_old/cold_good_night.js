export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Well, it's so late already. Time to go to sleep! I'm going, and you shouldn't stay up too late either",
            msg2: "Yeaaah, you're right. I'll go to bed soon too"
        } : {
            msg1: "Ладно, уже так поздно. Спать пора! Я пойду, и ты долго не сиди",
            msg2: "Дааа, ты права. Пойду тогда тоже понемногу"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 2000
            },
            {
                type: "sent",
                text: texts.msg2,
                delay: 4000
            }
        ];
    },

    getChoices(gameState) {
        return [{
            text: gameState.language === 'en' ? "Say goodbye" : "Попрощаться",
            nextChapter: 'ark_final'
        }];
    }
};