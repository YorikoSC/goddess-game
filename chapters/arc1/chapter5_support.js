// chapters/chapter5_support.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Of course, I'll go with you! I'll be your support team.",
      msg2: "You're the best! I'll feel much calmer with you by my side 🥰",
      msg3: "Just promise not to laugh if I look ridiculous in these swimsuits!"
    } : {
      msg1: "Конечно, я пойду с тобой! Буду твоей группой поддержки.",
      msg2: "Ты самый лучший! Мне будет намного спокойнее, если ты будешь рядом 🥰",
      msg3: "Только обещай не смеяться, если я буду выглядеть нелепо в этих купальниках!"
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
      choice1: "You never look ridiculous. I'm sure it will be amazing!",
      result1a: "Thanks for the support! You always know how to cheer me up 💕",
      result1b: "It's getting late... Let's discuss the details tomorrow? Good night!",
      choice2: "I promise! But in return, you'll have to help me prepare for the history exam.",
      result2a: "Deal! I'm great at history 📚",
      result2b: "It's getting late... Let's discuss everything tomorrow? Good night!"
    } : {
      choice1: "Ты никогда не выглядишь нелепо. Уверен, будет потрясающе!",
      result1a: "Спасибо за поддержку! Ты всегда знаешь, как поднять мне настроение 💕",
      result1b: "Уже поздно... Давай завтра обсудим детали? Спокойной ночи!",
      choice2: "Обещаю! Но взамен ты должна будешь помочь мне с подготовкой к экзамену по истории.",
      result2a: "По рукам! Я отлично знаю историю 📚",
      result2b: "Уже поздно... Давай завтра всё обсудим? Спокойной ночи!"
    };
    
    return [
      {
        id: "compliment_support",
        text: texts.choice1,
        action: (state) => { state.choices['chapter5_support'] = true;},
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
        id: "history_deal",
        text: texts.choice2,
        action: (state) => { state.choices['chapter5_support'] = true;},
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
