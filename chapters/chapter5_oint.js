// chapters/chapter5_joint.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Joint photoshoot? Sounds interesting, but a bit scary...",
      msg2: "Don't be afraid! I'll be right there and guide you. Plus, it will be fun! 🎭",
      msg3: "Imagine what cool photos we'll have! We can even do a themed photoshoot."
    } : {
      msg1: "Совместная фотосессия? Звучит интересно, но немного страшно...",
      msg2: "Не бойся! Я буду рядом и всё подскажу. К тому же, это будет весело! 🎭",
      msg3: "Представь, какие классные фотографии у нас будут! Можем даже сделать тематическую съёмку."
    };
    
    return [
      {
        type: "sent",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "received",
        text: texts.msg2,
        delay: 2500
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 4000
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Okay, I agree. But only for you!",
      result1a: "Yay! You're the best! 🎉",
      result1b: "I can already imagine how we'll look. It's going to be awesome!",
      choice2: "What kind of theme for the photoshoot? Nothing too revealing, I hope?",
      result2a: "Oh, come on! I was thinking of something stylish. Maybe 90s style? 👖",
      result2b: "Although... if you want something more... interesting, I don't mind 😏"
    } : {
      choice1: "Хорошо, я согласен. Но только ради тебя!",
      result1a: "Ура! Ты лучший! 🎉",
      result1b: "Я уже представляю, как мы будем выглядеть. Это будет бомба!",
      choice2: "А какая тема фотосессии? Надеюсь, ничего слишком откровенного?",
      result2a: "Ой, да ладно тебе! Я думала о чём-то стильном. Может, в стиле 90-х? 👖",
      result2b: "Хотя... если хочешь что-то более... интересное, я не против 😏"
    };
    
    return [
      {
        id: "agree_for_you",
        text: texts.choice1,
        result: [
          {
            type: "received",
            text: texts.result1a,
            delay: 1000
          },
          {
            type: "received",
            text: texts.result1b,
            delay: 2500
          }
        ],
        nextChapter: "chapter6_photoshoot"
      },
      {
        id: "ask_theme",
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
        nextChapter: "chapter6_theme"
      }
    ];
  }
};
