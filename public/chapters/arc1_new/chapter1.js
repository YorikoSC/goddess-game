export default {
    id: 'chapter1',
    translations: {
        ru: {
            lina1: "Привет креветка💋",
            min1: "Привет Лина, как тебе спалось?",
            lina2: "После вчерашней ночки я спала отлично, жаль только осталась не до конца удовлетворенной",
            min2: "Немного неприятно, это слышать..",
            lina3: "Не волнуйся, мне с этим помогли))",
            min3: "Что?.. кто тебе помог?",
            lina4: "Ууу посмотрите, какой серьезный хах",
            min4: "Лина, это не смешно, ты с кем-то спала?",
            lina5: "Нууу..",
            min5: "Боже, Лина, почему??",
        },
        en: {
            lina1: "Hey shrimp 💋",
            min1: "Hey Lina, how did you sleep?",
            lina2: "After last night, I slept great, just not fully satisfied",
            min2: "It’s kinda hurtful to hear that..",
            lina3: "Don’t worry, I got some help with that ))",
            min3: "What?.. Who helped you?",
            lina4: "Ooh, look at how serious you are haha",
            min4: "Lina, this isn’t funny, did you sleep with someone?",
            lina5: "Well...",
            min5: "God, Lina, why??",
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "received", text: texts.lina1, delay: 500 },
            { type: "sent", text: texts.min1, delay: 1000 },
            { type: "received", text: texts.lina2, delay: 1500 },
            { type: "sent", text: texts.min2, delay: 2000 },
            { type: "received", text: texts.lina3, delay: 2500 },
            { type: "sent", text: texts.min3, delay: 3000 },
            { type: "received", text: texts.lina4, delay: 3500 },
            { type: "sent", text: texts.min4, delay: 4000 },
            { type: "received", text: texts.lina5, delay: 4500, showChoices: true  },
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "curious",
                text: texts.min5,
                action: (gameState) => {
                    gameState.choices.chapter1 = "curious";
                },
                nextChapter: "chapter1b"
            }
        ];
    }
};