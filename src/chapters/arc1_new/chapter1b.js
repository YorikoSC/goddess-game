export default {
    id: 'chapter1b_curious',
    translations: {
        ru: {
            lina6: "Успокойся нытик. Я развлекалась со своей игрушкой",
            lina7: "Посмотри на это))",
            min6: "Тебе такое нравится?..",
            lina8: "Он больше твоего знаешь ли хаха",
            min7: "Но ты вчера говорила, что тебе хорошо",
            lina9: "Мало ли что я там говорила",
            lina10: "Ах кстати, я сегодня поеду с фотографом в другой город на съемки",
            min8: "А это безопасно ?..",
            lina11: "Почему нет? Я ему нравлюсь и он за меня платит хаха",
            min9: "Тебе он нравится ?",
        },
        en: {
            lina6: "Calm down, whiner. I was having fun with my toy",
            lina7: "Check this out ))",
            min6: "You like that kind of thing?..",
            lina8: "It’s bigger than yours, you know haha",
            min7: "But yesterday you said you were satisfied",
            lina9: "Whatever I said",
            lina10: "Oh, by the way, I’m going to another city for a shoot with photographer today",
            min8: "Is that safe?..",
            lina11: "Why not? He likes me and he’s paying haha",
            min9: "Do you like him?",
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "received", text: texts.lina6, delay: 500 },
            { type: "photo", text: texts.lina7, src: "img/lina_dildo.jpg", delay: 1000 },
            { type: "sent", text: texts.min6, delay: 1500 },
            { type: "received", text: texts.lina8, delay: 2000 },
            { type: "sent", text: texts.min7, delay: 2500 },
            { type: "received", text: texts.lina9, delay: 3000 },
            { type: "received", text: texts.lina10, delay: 3500 },
            { type: "sent", text: texts.min8, delay: 4000 },
            { type: "received", text: texts.lina11, delay: 4500, showChoices: true },
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "accept",
                text: texts.min9,
                action: (gameState) => {
                    gameState.choices.chapter1c = "accept";
                },
                nextChapter: "chapter1c"
            }
        ];
    }
};