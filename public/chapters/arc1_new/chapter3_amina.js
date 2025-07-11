export default {
    id: 'chapter3_amina',
    chatId: 'amina', // Указывает, что это отдельный чат с Аминой
    translations: {
        ru: {
            min1: "Привет Амина",
            amina1: "Привет, Мин, ты?",
            min2: "Да, хотел спросить не поехала ли ты с Линой",
            amina2: "Она и без меня справится там)",
            amina3: "Переживаешь да?)",
            min3: "Ну вообще то да, с ней этот Акира",
            amina4: "Ох, какие мы ревнивые хаха",
            min4: "Она мне слишком сильно нравится",
            amina5: "Она любому нравится)",
            amina6: "Да и ты понравишься любому",
            min5: "…Думаешь?",
            amina7: "Конечно!! Ты себя не видел что ли? Ты же такой милашка",
            min6: "Ох..спасибо..засмущала меня",
            amina8: "Можем встретиться и развлечься, когда будешь свободен)",
            min7: "Не знаю правильно ли..",
            amina9: "Лины все равно дома нет хах",
            amina10: "Тогда давай завтра? Могу научить тебя вещам, которые нравятся Лине))",
            choice_agree: "Ну если так, то ради Лины.. давай встретимся",     
            //choice_decline: "Не думаю, что это хорошая идея" // На будущее
            amina11: "Какой заботливый))"
        },
        en: {
            min1: "Hey Amina",
            amina1: "Hey Min, is that you?",
            min2: "Yeah, just wanted to ask if you went with Lina",
            amina2: "She’ll manage fine without me )",
            amina3: "Worried, huh?)",
            min3: "Well, yeah, she’s with that Akira",
            amina4: "Oh, someone’s jealous haha",
            min4: "I like her way too much",
            amina5: "She’s everyone’s type )",
            amina6: "And you’d charm anyone too",
            min5: "…You think?",
            amina7: "Of course!! Haven’t you seen yourself? You’re such a cutie",
            min6: "Oh.. thanks.. you’re making me blush",
            amina8: "We could meet up and have some fun when you’re free )",
            min7: "I’m not sure if that’s right..",
            amina9: "Lina’s not home anyway haha",
            amina10: "How about tomorrow then? I could teach you things Lina likes )",
            choice_agree: "Well, if it’s for Lina.. let’s meet up",
            //choice_decline: "I don’t think it’s a good idea" //На будущее
            amina11: "Such a caring guy ))"

        }
    },
    getText(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            { type: "sent", text: texts.min1, delay: 1000 },
            { type: "received", text: texts.amina1, delay: 2500 },
            { type: "sent", text: texts.min2, delay: 4000 },
            { type: "received", text: texts.amina2, delay: 5500 },
            { type: "received", text: texts.amina3, delay: 7000 },
            { type: "sent", text: texts.min3, delay: 8500 },
            { type: "received", text: texts.amina4, delay: 10000 },
            { type: "sent", text: texts.min4, delay: 11500 },
            { type: "received", text: texts.amina5, delay: 13000 },
            { type: "received", text: texts.amina6, delay: 14500 },
            { type: "sent", text: texts.min5, delay: 16000 },
            { type: "received", text: texts.amina7, delay: 17500 },
            { type: "sent", text: texts.min6, delay: 19000 },
            { type: "received", text: texts.amina8, delay: 20500 },
            { type: "sent", text: texts.min7, delay: 22000 },
            { type: "received", text: texts.amina9, delay: 23500 },
            { type: "received", text: texts.amina10, delay: 25000 },
        ];
    },
    getChoices(gameState) {
        const lang = gameState.language || 'ru';
        const texts = this.translations[lang];
        return [
            {
                id: "agree",
                text: texts.choice_agree,
                action: (gameState) => {
                    gameState.choices.chapter3_amina = "agree";                   
                },
                result: [
                    { type: "received", text: texts.amina11, delay: 28000, nextChapter: "chapter4a" }
                ]
            }
            // Раскоментировать для будущего выбора
            /*
            {
                id: "decline",
                text: texts.choice_decline,
                action: (gameState) => {
                    gameState.choices.chapter3_amina = "decline";
                },
                nextChapter: "chapter4_no_meet"
            }
            */
        ];
    }
};