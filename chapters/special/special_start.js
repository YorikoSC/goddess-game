export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "What is it? A dream? What's going on?",
            btn: "Fall into a dream..."
          } : {
            msg1: "Что это? Сон? Что происходит?",
            btn: "Провалиться в сон..."
          };
        return[
            {
                type: "monolog-placeholder",
                content: texts.msg1,
                buttonText: texts.btn,
                nextChapter: "special_teas_start" 
            }
        ];
    },
}