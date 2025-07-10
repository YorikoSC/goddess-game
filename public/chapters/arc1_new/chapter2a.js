export default {
    id: 'chapter2a',
    translations: {
        ru: {
            lina1: "Умничка, оставайся таким же послушным!",
            lina2: "Можем созвониться, когда я буду прыгать на нем))",
            min1: "Хорошо..",
        },
        en: {
            lina1: "Good boy, stay obedient like that!",
            lina2: "We can call when I’m bouncing on him ))",
            min1: "Okay..",
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "received", text: texts.lina1, delay: 1500 },
            { type: "received", text: texts.lina2, delay: 3000, showChoices: true },
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "agree",
                text: texts.min1,
                action: (gameState) => {
                    gameState.choices.chapter9a = "agree";
                },
                nextChapter: "chapter9c"
            }
        ];
    }
};