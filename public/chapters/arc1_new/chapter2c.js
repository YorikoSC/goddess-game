export default {
    id: 'chapter2c',
    translations: {
        ru: {
            system: "Спустя несколько часов...",
            min1: "Лина, ты добралась?",
            lina1: "Да, мы в ресторане)",
            lina2: "Тут такие дорогие блюда, ты бы видел",
            lina3: "Акира сказал, чтобы заказывала все, что душа желает",
            lina4: "Такой заботливый",
            min2: "Акира??",
            lina5: "Это мой фотограф, мы перешли на неформальное общение)",
            min3: "Он пристаёт к тебе?",
            min4: "Будь осторожна с ним",
            lina6: "Что за детское беспокойство, я взрослая девушка",
            lina7: "Тем более сама готова перейти в спальню))",
            min5: "Ты говоришь мне такое, вот так?",
            lina8: "Ну мы же пара, люблю же только тебя)",
            min6: "Точно?..",
            lina9: "Конечно, любимый ❤️",
            min7: "Хорошо Лина, я верю тебе.",
            lina10: "Ну все, побежала, если не созвонимся покажу тебе классные фоточки))",
            min8: "Жду с нетерпением, хорошего вечера.",
        },
        en: {
            system: "After a few hours...",
            min1: "Lina, did you get there?",
            lina1: "Yeah, we’re at the restaurant)",
            lina2: "The dishes here are so expensive, you should see",
            lina3: "Akira told me to order whatever I want",
            lina4: "So caring",
            min2: "Akira??",
            lina5: "That’s my photographer, we’re on casual terms now)",
            min3: "Is he hitting on you?",
            min4: "Be careful with him",
            lina6: "What’s with the childish worry, I’m a grown woman",
            lina7: "Besides, I’m ready to head to the bedroom myself ))",
            min5: "You’re saying that to me, just like that?",
            lina8: "We’re a couple, I only love you )",
            min6: "Really?..",
            lina9: "Of course, my love ❤️",
            min7: "Okay Lina, I trust you.",
            lina10: "Alright, I’m off, if we don’t call I’ll show you cool pics))",
            min8: "Can’t wait, have a great evening.",
        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "system", text: texts.system, delay: 0 },
            { type: "sent", text: texts.min1, delay: 1000 },
            { type: "received", text: texts.lina1, delay: 2500 },
            { type: "received", text: texts.lina2, delay: 4000 },
            { type: "received", text: texts.lina3, delay: 5500 },
            { type: "received", text: texts.lina4, delay: 7000 },
            { type: "sent", text: texts.min2, delay: 8500 },
            { type: "received", text: texts.lina5, delay: 10000 },
            { type: "sent", text: texts.min3, delay: 11500 },
            { type: "sent", text: texts.min4, delay: 13000 },
            { type: "received", text: texts.lina6, delay: 14500 },
            { type: "received", text: texts.lina7, delay: 16000 },
            { type: "sent", text: texts.min5, delay: 17500 },
            { type: "received", text: texts.lina8, delay: 19000 },
            { type: "sent", text: texts.min6, delay: 20500 },
            { type: "received", text: texts.lina9, delay: 22000 },
            { type: "sent", text: texts.min7, delay: 23500 },
            { type: "received", text: texts.lina10, delay: 25000, showChoices: true },
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "trust",
                text: texts.min8,
                action: (gameState) => {
                    gameState.choices.chapter2c = "trust";
                },
                nextChapter: "chapter3_amina"
            }
        ];
    }
};