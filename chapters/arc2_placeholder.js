export default {
    getText(gameState) {
      const texts = gameState.language === 'en' ? {
        msg: "Arc 2 is under development. Thank you for playing!"
      } : {
        msg: "Арка 2 находится в разработке. Спасибо за игру!"
      };
  
      return [
        {
          type: "received",
          text: texts.msg,
          delay: 1000
        }
      ];
    },
  
    getChoices(gameState) {
      return []; // Нет выборов в заглушке
    }
  };