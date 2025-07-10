export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Yo babe! 😘 Off to a café with my girl Amina. Don’t cry without your queen, yeah? 😉",
            msg2: "Cool, Lina, have fun. Stay safe!",
            msg3: "Oh, I’m gonna have a blast, don’t sweat it! But first, be a good boy and send me a pic of your lil buddy. Gotta see it! 😏",
          } : {
            msg1: "Привет, милый! Иду в кафешку с Аминой. Только не плачь, оке?",
            msg2: "Думаю переживу) !",
            msg3: "Эм.. А можешь показать член, пожалуйста? Срочно!!",
          };
    return [
        {
            type: "received",
            text: texts.msg1,
            delay:1000,
        },
        {
            type: "sent",
            text: texts.msg2,
            delay:2000,   
        },
        {
            type: "received",
            text: texts.msg3,
            delay:3000,
        }
    ];
},
    getChoices (gameState){
        const texts = gameState.language === 'en' ? {
            msg4: "Send photo",
            msg5: "Here's what you asked for 😏"
          } : {
            msg4: "Отправить фотографию",
            msg5: "Вот что ты просила 😏"
          };
        return[
            {
                type: "photo",
                text: texts.msg5,        // текст сообщения с фото
                buttonText: texts.msg4,   // текст для кнопки выбора
                src: "./img/photos/special1/hero_penis.jpg",
                nextChapter: "special_dick_showoff",
            }
        ];
    },
}
