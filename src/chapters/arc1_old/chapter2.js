// chapters/chapter2.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Listen, you won't believe what happened at the photoshoot! 📸",
      msg2: "What happened there?",
      msg3: "This photographer... He kept asking me to 'turn slightly', 'show my profile'...",
      msg4: "And then he suggested taking a few shots in a more... 'free' pose 🙄"
    } : {
      msg1: "Слушай, а ты не поверишь, что было на фотосессии! 📸",
      msg2: "Что там случилось?",
      msg3: "Этот фотограф... Он постоянно просил меня «чуть развернуться», «показать профиль»...",
      msg4: "А потом предложил сделать несколько кадров в более... «свободной» позе 🙄"
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
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 4000
      },
      {
        type: "received",
        text: texts.msg4,
        delay: 5500,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "What does 'free' mean? Was he hitting on you?",
      result1a: "Well, not exactly hitting on me... But he was definitely undressing me with his eyes! 👀",
      result1b: "Especially when I was in that short dress. He kept staring at my legs...",
      choice2: "Sounds like a normal photographer's job. Is he a professional?",
      result2a: "Yes, seems professional. But you know, sometimes I feel like he gets too... involved in the process 📷",
      result2b: "Though the photos turned out great! I'll show you the rest tomorrow 😊"
    } : {
      choice1: "Что значит «свободной»? Он что, приставал к тебе?",
      result1a: "Ну, не то чтобы приставал... Но глазами раздевал точно! 👀",
      result1b: "Особенно когда я в коротком платье была. Всё на ноги пялился...",
      choice2: "Звучит как обычная работа фотографа. Он профессионал?",
      result2a: "Да, вроде профи. Но знаешь, иногда мне кажется, что он слишком... увлекается процессом 📷",
      result2b: "Хотя фотки получились классные! Завтра покажу тебе остальные 😊"
    };
    
    return [
      {
        id: "question_photographer",
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
            delay: 2500,
            nextChapter: "chapter3_jealous"
          }
        ]
      },
      {
        id: "professional_opinion",
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
            delay: 2500,
            nextChapter: "chapter3_neutral"
          }
        ]
      }
    ];
  }
};
