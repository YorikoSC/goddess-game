// chapters/start.js
export default {
  getText(gameState) {
    return [];
  },
  
  getChoices(gameState) {
    const texts = {
      ru: '"У меня новые сообщения... надо посмотреть"',
      en: '"I have new messages... I should check them"'
    };
    
    return [
      {
        id: "start",
        text: texts[gameState.language || 'ru'],
        nextChapter: "chapter1"
      }
    ];
  },
  
  isPrintable() {
    return false;
  }
};
