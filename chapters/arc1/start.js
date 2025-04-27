
export default {
  getText(gameState) {
    return [];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      start: '"I have new messages... I should check them"'
    } : {
      start: '"У меня новые сообщения... надо посмотреть"'
    };
    
    return [
      {
        id: "start",
        text: texts.start,
        nextChapter: "chapter1"
      }
    ];
  },
  
  isPrintable() {
    return false;
  }
};