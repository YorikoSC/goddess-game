// cold_good_night.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I’m disappointed in you. Your jealousy is such a turn-off 😒",
      msg2: "Maybe I’ll let you fix this... but not tonight. Sleep on it."
    } : {
      msg1: "Я разочарована. Твоя ревность такая скучная 😒",
      msg2: "Может, дам тебе шанс исправиться... но не сегодня. Спи пока."
    };
    return [
      { type: "received", text: texts.msg1, delay: 2000 },
      { type: "received", text: texts.msg2, delay: 4000 }
    ];
  },
  getChoices(gameState) {
    return [{
      text: gameState.language === 'en' ? "Say goodbye" : "Попрощаться",
      nextChapter: "ark_final"
    }];
  }
};