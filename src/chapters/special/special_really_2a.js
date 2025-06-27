export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
    } : {
      msg1: "Да успокойся, не мурчи! Мы просто поржали. Она сказала, что он милый, а я такая типа всё равно люблю свою креветочку! 😏",
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
      choice2: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
    } : {
      choice2: "Не мурчи?! Ты фотку моего члена подруге показала! Ты серьёзно, Лина?",
    };

    return [
         {
            id: "choice2",
            text: texts.choice2,
            delay: 2100,
            nextChapter: 'special_really_3'
        }
        ];
      }
    }
