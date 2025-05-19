export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Okay, think, my shrimpy! I'm here if you want to chat.... or try something new, kek! Nighty-night! 😘",
    } : {
      msg1: "Окей, думай, моя креветочка! Я тут, если захочешь поболтать... или попробовать что-то новенькое, кек! Споки-споки! 😘",
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
