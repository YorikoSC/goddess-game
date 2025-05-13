// chapters/chapter6_photoshoot.js
export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "I hope I won't look ridiculous. I've never participated in photoshoots before.",
      msg2: "Don't worry! You'll look amazing! You have excellent features for a model 📸",
      msg3: "Besides, I'll be right there to guide you. The photographer is also very professional, he'll help with poses."
    } : {
      msg1: "Надеюсь, я не буду выглядеть нелепо. Никогда раньше не участвовал в фотосессиях.",
      msg2: "Не переживай! Ты будешь выглядеть потрясающе! У тебя отличные данные для модели 📸",
      msg3: "К тому же, я буду рядом и всё подскажу. Фотограф тоже очень профессиональный, он поможет с позами."
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
      choice1: "Okay, I trust you. When is the photoshoot?",
      result1a: "This Saturday, at 2:00 PM. The studio is not far from the university 🏫",
      result1b: "I'm so glad you agreed! It will be unforgettable!",
      choice2: "What should I wear? I don't have fashionable clothes.",
      result2a: "Don't worry about that! The studio has a wardrobe with different outfits 👔",
      result2b: "The stylist will pick something suitable for you. Just come on Saturday at 2:00 PM!"
    } : {
      choice1: "Хорошо, я доверяю тебе. Когда состоится фотосессия?",
      result1a: "В эту субботу, в 14:00. Студия недалеко от университета 🏫",
      result1b: "Я так рада, что ты согласился! Это будет незабываемо!",
      choice2: "А что мне надеть? У меня нет модной одежды.",
      result2a: "Не волнуйся об этом! В студии есть гардеробная с разными образами 👔",
      result2b: "Стилист подберёт тебе что-нибудь подходящее. Просто приходи в субботу к 14:00!"
    };
    
    return [
      {
        id: "trust_ask_when",
        text: texts.choice1,
        action: (state) => {state.choices['chapter6_photoshoot'] = true;},
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
            nextChapter: "warm_good_night"
          }
        ]
      },
      {
        id: "ask_about_clothes",
        text: texts.choice2,
        action: (state) => {state.choices['chapter6_photoshoot'] = true;},
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
            nextChapter: "warm_good_night"
          }
        ]
      }
    ];
  }
};
