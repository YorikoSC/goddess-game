export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Babe, don’t be mad! It’s just a dumb joke, keke. But if you’re into it, I wouldn’t judge... maybe we could spice things up? 😏",
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
      choice1a: "Wait, you showed Amina my dick pic? That’s fucked up! What else did you say?",
      msg2: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
      choice1b: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
      choice2a: "Alright, I guess I can handle it. Let’s talk more tomorrow.",
      msg3: "Yay, my sweet boy! Love that vibe. Chat tomorrow, sleep tight! 😘",
      choice2b: "Whatever, enjoy your café... I’m out for now. Night."
    } : {
      choice1a: "Я... мне надо подумать. Это слишком для меня сейчас.",
      msg2: "Окей, думай, моя креветочка! Я тут, если захочешь поболтать... или попробовать что-то новенькое, кек! Споки-споки! 😘",
      choice1b: "не уверен..",
      choice2a: "Ладно, справлюсь. Давай завтра обсудим.",
      msg3: "Классный настрой! 😘",
      choice2b: "не уверен..",
    };

    return [
      {
        id: "choice1a",
        text: texts.choice1a,
        delay: 1500,
        result: [
          {
            type: "received",
            text: texts.msg2,
            delay: 1700
          },
          {
            id: "choice1b",
            text: texts.choice1b,
            delay: 2100,
            nextChapter: 'special_end'
          },
        ]
      },
      {
        id: "choice2a",
        text: texts.choice2a,
        delay: 1500,
        result: [
          {
            type: "received",
            text: texts.msg3,
            delay: 1700
          },
          {
            id: "choice2b",
            text: texts.choice2b,
            delay: 2100,
            nextChapter: 'special_end'
          },
        ]
      }
    ];
  }
};
