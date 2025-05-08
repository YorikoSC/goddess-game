export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "OMG, look at this! Your lil guy is so cute, like a tiny shrimp! 😄",
            msg2: "Cool, Lina, have fun. Stay safe!",
            msg3: "Oh, I’m gonna have a blast, don’t sweat it! But first, be a good boy and send me a pic of your lil buddy. Gotta see it! 😏",
            msg4: "Uh, okay..."
          } : {
            msg1: "Боже, глянь на это! Твой малыш такой милый, прям как креветочка! 😄",
            msg2: "Окей, Лина, оторвись там. Береги себя!",
            msg3: "О, я зажгу, не парься! Но сперва будь паинькой и скинь фотку своего малыша. Хочу глянуть! 😏",
            msg4: "Эм, ну ладно..."
          };
    return [
        {
            type: "photo",
            text: texts.msg1,
            delay:1000,
        },
        {
            type: "sent",
            text: texts.msg2,
            delay:1500,   
        },
        {
            type: "recived",
            text: texts.msg3,
            delay:1000,
        },
        {
            type: "recived",
            text: texts.msg3,
            delay:1000,
        }
    ];
},
    getChoices (gameState){
        const texts = gameState.language === 'en' ? {
            msg4: "Uh, okay..."
          } : {
            msg4: "Эм, ну ладно..."
          };
        return[
            {
                text: texts.msg4,
                nextChapter: "dick_showoff",
            }
        ];
    },
}