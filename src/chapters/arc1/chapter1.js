export default {
  translations: {
    ru: {
      msg1: "Привет, угадай, что? Фотограф хочет, чтобы я снялась в купальнике на следующей съёмке. Можешь в это поверить?",
      msg2: "Вау, это звучит смело! Ты взволнована или нервничаешь?",
      msg3: "И то, и другое, честно говоря. Я никогда раньше такого не делала.",
      choice1: "Я думаю, ты будешь выглядеть потрясающе. Ты всегда выглядишь потрясающе, что бы ни надела.",
      result1: "Спасибо, это много значит, когда это говоришь ты.",
      choice2: "Только не давай тому фотографу слишком флиртовать с тобой, ладно?",
      result2: "О, ты уже ревнуешь? Это мило."
    },
    en: {
      msg1: "Hey, guess what? The photographer wants me to do a swimwear shoot next time. Can you believe it?",
      msg2: "Wow, that sounds bold! Are you excited or nervous about it?",
      msg3: "A bit of both, honestly. I’ve never done anything like that before.",
      choice1: "I think you’ll look amazing. You’re always stunning, no matter what you wear.",
      result1: "Thanks, that means a lot coming from you.",
      choice2: "Just don’t let that photographer get too flirty with you, okay?",
      result2: "Oh, are you jealous already? That’s cute."
    }
  },

  getText(gameState) {
    const lang = gameState.language || 'ru';
    const texts = this.translations[lang];
    return [
      { type: "received", text: texts.msg1, delay: 1500 },
      { type: "sent", text: texts.msg2, delay: 3000 },
      { type: "received", text: texts.msg3, delay: 4500, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const lang = gameState.language || 'ru';
    const texts = this.translations[lang];
    return [
      {
        id: "encourage",
        text: texts.choice1,
        result: [
          { type: "received", text: texts.result1, delay: 1000, nextChapter: "chapter2" }
        ]
      },
      {
        id: "tease",
        text: texts.choice2,
        result: [
          { type: "received", text: texts.result2, delay: 1000, nextChapter: "chapter2" }
        ]
      }
    ];
  }
};