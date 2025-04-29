// chapters/chapter5_library.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Yes, library at 4:00 PM sounds great.",
      msg2: "Okay, it's settled. Although it would have been cozier at my place... 😏",
      msg3: "But you're right, we can definitely focus on studying at the library."
    } : {
      msg1: "Да, библиотека в 16:00 звучит отлично.",
      msg2: "Хорошо, договорились. Хотя у меня дома было бы уютнее... 😏",
      msg3: "Но ты прав, в библиотеке мы точно сможем сосредоточиться на учёбе."
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
      choice1: "Exactly! Exams first, fun later.",
      result1a: "You're so proper! 📚",
      result1b: "Well, it's late now. Let's meet tomorrow at the library. Good night!",
      choice2: "Although... maybe you're right about your place. It would be more comfortable.",
      result2a: "Really? Great! Then tomorrow at 6:00 PM at my place! 🏠",
      result2b: "I'll make something delicious! But it's late now, shall we discuss the details tomorrow?"
    } : {
      choice1: "Именно! Сначала экзамены, потом развлечения.",
      result1a: "Какой ты правильный! 📚",
      result1b: "И не забудь свои конспекты по экономике - они мне очень нужны!",
      choice2: "Хотя... может, ты и права насчёт твоего дома. Там будет комфортнее.",
      result2a: "Правда? Отлично! Тогда завтра в 18:00 у меня! 🏠",
      result2b: "Я приготовлю что-нибудь вкусное! И не забудь свои конспекты по экономике - они мне очень нужны!"
    };
    
    return [
      {
        id: "focus_on_exams",
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
            nextChapter: "ark_final"
          }
        ]
      },
      {
        id: "change_to_home",
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
            nextChapter: "ark_final"
          }
        ]
      }
    ];
  }
};
