// chapters/chapter6_misunderstanding.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I'm sorry, I didn't mean to offend you. I was just surprised.",
      msg2: "It's okay! I understand how that might have sounded 😊",
      msg3: "But seriously, I would really like to spend time with you. Not as an excuse for the photographer, but because I enjoy being with you."
    } : {
      msg1: "Извини, я не хотел тебя обидеть. Просто был удивлён.",
      msg2: "Ничего страшного! Я понимаю, как это могло прозвучать 😊",
      msg3: "Но если серьёзно, я бы очень хотела провести с тобой время. Не как отговорка для фотографа, а потому что мне нравится быть с тобой."
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
        delay: 4000,
        showChoices: true
      }
    ];
  },
  
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I enjoy spending time with you too. Let's go somewhere tomorrow?",
      result1a: "I'd love to! Maybe to that new restaurant on the embankment? 🌃",
      result1b: "They say it has a very romantic atmosphere... But it's late now, shall we discuss the details tomorrow?",
      choice2: "Let's just stay friends. I think that would be better.",
      result2a: "Oh... Of course, I understand 😔",
      result2b: "Friendship is also very valuable. It's getting late, shall we talk tomorrow? Good night."
    } : {
      choice1: "Мне тоже нравится проводить с тобой время. Давай сходим куда-нибудь завтра?",
      result1a: "С удовольствием! Может, в тот новый ресторан на набережной? 🌃",
      result1b: "Говорят, там очень романтичная атмосфера... Но уже поздно, давай завтра обсудим детали?",
      choice2: "Давай просто останемся друзьями. Мне кажется, так будет лучше.",
      result2a: "О... Конечно, я понимаю 😔",
      result2b: "Дружба тоже очень ценна. Уже поздно, давай поговорим завтра? Спокойной ночи."
    };
    
    return [
      {
        id: "suggest_meeting",
        text: texts.choice1,
        action: (state) => {state.choices['chapter6_misunderstanding'] = true;},
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
            nextChapter: "cold_good_night"
          }
        ]
      },
      {
        id: "just_friends",
        text: texts.choice2,
        action: (state) => {state.choices['chapter6_misunderstanding'] = true;},
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
            nextChapter: "cold_good_night"
          }
        ]
      }
    ];
  }
};
