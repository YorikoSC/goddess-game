export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Well, it's so late already. Time to go to sleep! I'm going, and you shouldn't stay up too late either",
      msg2: "Yeaaah, you're right. I'll go to bed soon too"
    } : {
      msg1: "Ладно, уже так поздно. Спать пора! Я пойду, и ты долго не сиди",
      msg2: "Дааа, ты права. Пойду тогда тоже понемногу"
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "sent",
        text: texts.msg2,
        delay: 2500
      }
    ];
  },

  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Sweet dreams!",
      result1: "Thanks! See you tomorrow at university 💫",
      choice2: "But it's kind of sad to say goodbye for today...",
      result2a: "To be honest, I feel the same... But we both need to get some sleep 🌙",
      result2b: "Sweet dreams and good night! ❤️"
    } : {
      choice1: "Сладких снов!",
      result1: "Спасибо! Увидимся завтра в университете 💫",
      choice2: "Но даже как-то жалко прощаться на сегодня...",
      result2a: "Мне, если честно, тоже... Но нам обоим нужно выспаться 🌙",
      result2b: "Сладких снов и спокойной ночи! ❤️"
    };

    return [
      {
        id: "sweet_dreams",
        text: texts.choice1,
        result: [
          {
            type: "received",
            text: texts.result1,
            delay: 1000
          }
        ],
        nextChapter: "ark_final"
      },
      {
        id: "sad_goodbye",
        text: texts.choice2,
        result: [
          {
            type: "received",
            text: texts.result2a,
            delay: 1000
          },
          {
            type: "received",
            text: texts.result2b,
            delay: 2500
          }
        ],
        nextChapter: "ark_final"
      }
    ];
  }
};