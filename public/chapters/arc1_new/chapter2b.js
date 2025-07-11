export default {
    id: 'chapter2b',
    translations: {
        ru: {
            lina1: "ХПХПХПХ Ты? У тебя он слишком мелкий. Но знай, что он для меня самый особенный))",
            min1: "Ты не даёшь мне доминировать",
            lina2: "Молчи. Только я доминирую. А ты всегда мягкий и смазливый. Такой милашка)",
            lina3: "Ну все, я побежала. Меня ждет мой фотограф",
            min2: "А меня не называешь своим..",
            lina4: "А ты и не просил))",
            lina5: "Хочешь, чтобы я говорила такое?",
            min3: "Хочу, очень",
            lina6: "Ну хорошо, продолжим этот разговор, когда я вернусь",
            lina7: "Не скучай креветка)",
            min4: "Уже скучаю по тебе",
        },
        en: {
            lina1: "Hahaha You? Yours is too small. But know it’s the most special to me ))",
            min1: "You don’t let me dominate",
            lina2: "Shush. I’m the one who dominates. You’re always soft and cute. Such a sweetie)",
            lina3: "Alright, I’m off. My photographer’s waiting",
            min2: "You don’t call me yours..",
            lina4: "You never asked ))",
            lina5: "Want me to say that?",
            min2: "I want you to, so much",
            lina6: "Alright, we’ll continue this talk when I’m back",
            lina7: "Don’t miss me, shrimp )",
            min3: "I already miss you",
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "received", text: texts.lina1, delay: 1000 },
            { type: "sent", text: texts.min1, delay: 2500 },
            { type: "received", text: texts.lina2, delay: 4000 },
            { type: "received", text: texts.lina3, delay: 5500 },
            { type: "sent", text: texts.min2, delay: 7000 },
            { type: "received", text: texts.lina4, delay: 8500 },
            { type: "received", text: texts.lina5, delay: 10000 },
            { type: "sent", text: texts.min3, delay: 11500 },
            { type: "received", text: texts.lina6, delay: 13000 },
            { type: "received", text: texts.lina7, delay: 14500 },
            { type: "sent", text: texts.min4, delay: 16000, showChoices: true }
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "want",
                text: texts.choice_want,
                action: (gameState) => {
                    gameState.choices.chapter2a = "want";
                },
                nextChapter: "chapter2с"
            }
        ];
    }
};