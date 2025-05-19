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
      msg2: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
      choice2: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
    } : {
      choice1: "Погоди, ты Амине мой член показала? Это вообще пиздец! Что ты ещё наговорила?",
      msg2: "Да успокойся, не мурчи! Мы просто поржали. Она сказала, что он милый, а я такая типа всё равно люблю свою креветочку! ",
      choice2: "Не мурчи?! Ты фотку моего члена подруге показала! Ты серьёзно, Лина?",
    };

    return [
      {
        id: "choice1",
        text: texts.choice1,
        delay: 1500,
        result: [
          {
            type: "received",
            text: texts.msg2,
            delay: 1700
          },
          {
            id: "choice2",
            choice: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_3'
          },
        ]
      }
    ];
  }
};
