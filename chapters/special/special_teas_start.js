export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Yo babe! 😘 Off to a café with my girl Amina. Don’t cry without your queen, yeah? 😉",
            msg2: "Cool, Lina, have fun. Stay safe!",
            msg3: "Oh, I’m gonna have a blast, don’t sweat it! But first, be a good boy and send me a pic of your lil buddy. Gotta see it! 😏",
          } : {
            msg1: "Привет, милый! 😘 Иду в кафешку с Аминой, моей подругой. Не реви без своей королевы, ага? 😉",
            msg2: "Окей, Лина, оторвись там. Береги себя!",
            msg3: "О, я зажгу, не парься! Но сперва будь паинькой и скинь фотку своего малыша. Хочу глянуть! 😏",
          };
    return [
        {
            type: "recived",
            text: texts.msg1,
            delay:1000,
        },
        {
            type: "sent",
            text: texts.msg2,
            delay:2000,   
        },
        {
            type: "recived",
            text: texts.msg3,
            delay:3000,
        }
    ];
},
    getChoices (gameState){
        const texts = gameState.language === 'en' ? {
            msg4: "Send photo"
          } : {
            msg4: "Отправить фотографию"
          };
        return[
            {
                type: "photo",
                src:"./img/photos/special1/hero_penis.jpg",
                description: texts.msg4,
                nextChapter: "special_dick_showoff",
            }
        ];
    },
}