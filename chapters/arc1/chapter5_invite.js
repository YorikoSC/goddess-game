// chapters/chapter5_invite.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I'd love to watch the process! When is the photoshoot?",
      msg2: "Next Thursday, at 3:00 PM. The studio is downtown 🏙️",
      msg3: "I'm so glad you're coming! It won't be as scary with you around."
    } : {
      msg1: "С удовольствием посмотрю на процесс! Когда фотосессия?",
      msg2: "В следующий четверг, в 15:00. Студия в центре города 🏙️",
      msg3: "Я так рада, что ты придёшь! Будет не так страшно с тобой рядом."
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
      choice1: "Don't worry, everything will be great! You'll be the star of the photoshoot.",
      result1a: "I hope so! Although I'm a bit nervous... I've never been photographed in swimsuits before 👙",
      result1b: "It's getting late... Let's talk about it tomorrow? Good night!",
      choice2: "What if I try modeling too?",
      result2a: "Seriously? That would be super! You have great looks! 😍",
      result2b: "I'll ask the organizers if they need male models too! But it's late now, shall we discuss tomorrow?"
    } : {
      choice1: "Не переживай, всё пройдёт отлично! Ты будешь звездой фотосессии.",
      result1a: "Надеюсь! Хотя немного волнуюсь... Никогда раньше не снималась в купальниках 👙",
      result1b: "Уже поздно... Давайте поговорим об этом завтра? Спокойной ночи!",
      choice2: "А что, если я тоже попробую себя в роли модели?",
      result2a: "Серьёзно? Это было бы супер! У тебя отличные данные! 😍",
      result2b: "Я спрошу у организаторов, может, им нужны и мужские модели!"
    };
    
    return [
      {
        id: "reassure_her",
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
        nextChapter: "chapter5_protective"
      },
      {
        id: "offer_modeling",
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
        nextChapter: "chapter5_joint"
      }
    ];
  }
};
