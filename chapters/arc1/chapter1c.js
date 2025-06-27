export default {
    id: 'chapter1c',
    translations: {
        ru: {
            lina12: "Ну да, мне кое-кто рассказывал, что у него очень большой член)",
            lina13: "Может попробовать с ним?)",
            lina14: "Ты же всё равно не против, могу завести ещё одного парня",
            min10: "Почему ты так говоришь, это больно...",
            lina15: "Больно? А тебе не больно, когда я не могу кончить?",
            min11: "Я стараюсь…",
            lina16: "Либо старайся лучше, либо молчи",
            lina17: "Так ты меня поддержишь?",
            choice1: "Да, ты заслуживаешь быть счастливой",
            choice2: "Нет, сиди дома, я сам тебя отрахаю!"
        },
        en: {
            lina12: "Yeah, someone told me he has a really big dick )",
            lina13: "Maybe I should try with him?)",
            lina14: "You don’t mind anyway, I could have another guy",
            min10: "Why do you say that, it hurts...",
            lina15: "Hurts? Doesn’t it hurt you when I can’t finish?",
            min11: "I’m trying…",
            lina16: "Then try harder or shut up",
            lina17: "So, will you support me?",
            choice1: "Yes, you deserve to be happy",
            choice2: "No, stay home, I’ll take care of you myself!"
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "received", text: texts.lina12, delay: 1000 },
            { type: "received", text: texts.lina13, delay: 2500 },
            { type: "received", text: texts.lina14, delay: 4000 },
            { type: "sent", text: texts.min10, delay: 5500 },
            { type: "received", text: texts.lina15, delay: 7000 },
            { type: "sent", text: texts.min11, delay: 8500 },
            { type: "received", text: texts.lina16, delay: 10000 },
            { type: "received", text: texts.lina17, delay: 11500, showChoices: true }
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "accept",
                text: texts.choice1,
                action: (gameState) => {
                    gameState.choices.chapter1c = "accept";
                },
                nextChapter: "chapter2a"
            },
            {
                id: "resist",
                text: texts.choice2,
                action: (gameState) => {
                    gameState.choices.chapter1c = "resist";
                },
                nextChapter: "chapter2b"
            }
        ];
    }
};