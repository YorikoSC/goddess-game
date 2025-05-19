export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Honey, don't be mad! It's just a prank. But if you're interested, I wouldn't mind...trying something new in bed...or someone 😏",
    } : {
      msg1: "Милый, не злись! Это просто прикол. Но если тебе интересно, я была бы не против...попробовать что-то новое в постели.. или кого-то 😏",
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
      choice1a: "I... I need to think about it. This is too much for me right now.",
      choice2a: "Alright, I guess I can handle it. Let’s talk more tomorrow.",
      msg3: "That's an awesome attitude! 😘",
    } : {
      choice1a: "Я... мне надо подумать. Это слишком для меня сейчас.",
      choice2a: "Ладно, справлюсь. Давай завтра обсудим.",
      msg3: "Классный настрой! 😘",
    };

    return [
      {
        id: "choice1a",
        text: texts.choice1a,
        delay: 1500,
        nextChapter: 'special_really_think'
      },
      {
        id: "choice2a",
        text: texts.choice2a,
        delay: 1500,
        nextChapter: 'special_really_tomorrow'
      }
    ];
  }
}
