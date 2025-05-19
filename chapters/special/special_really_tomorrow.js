export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "That's an awesome attitude! 😘",
    } : {
      msg1: "Классный настрой! 😘",
    };
    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I'm not sure.",
    } : {
      choice1: "не уверен..",
    };
    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        nextChapter: 'special_end'
      }
    ];
  }
}
