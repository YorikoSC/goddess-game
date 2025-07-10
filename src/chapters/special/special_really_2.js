export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Babe, relax, it’s just us being dumb. You know I’m yours, tiny or not. Sleep tight! 😜",
    } : {
      msg1: "Милый, расслабься, это просто мы дурачились. Ты же знаешь, я твоя, маленький или нет. Спи сладко! 😜",
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
      choice1: "Wait, you showed Amina my dick pic? That’s fucked up! What else did you say?",
    } : {
      choice1: "Погоди, ты Амине мой член показала? Это вообще пиздец! Что ты ещё наговорила?",
    };

    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        nextChapter: 'special_really_2a'
          }
        ];
     }
  }
