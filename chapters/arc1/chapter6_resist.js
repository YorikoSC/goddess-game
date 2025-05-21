export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "So, you said you’d try to get over it. Let’s see if you mean it.",
      lina2: "I’m meeting the photographer today for the campaign discussion.",
      mc1: "Okay, I’m trying to be okay with this. How’d it go?",
      lina3: "It went great. He’s so easy to talk to, unlike some people.",
      lina4: "He kept complimenting my look, said I’m perfect for this.",
      mc2: "I’m glad it went well. What’s the campaign about?",
      lina5: "It’s a big deal. Lots of shoots, some travel maybe.",
      lina6: "He wants me to be the face of his new collection.",
      mc3: "That sounds like a lot of time with him.",
      lina7: "Yeah, it will be. But you said you’d support me, right?",
      lina8: "He’s already planning the first shoot for next week.",
      mc4: "I’m trying, Lina. It’s just hard sometimes.",
      lina9: "I get that, but you need to step up or step out.",
      lina10: "He took me to this fancy café today, by the way.",
      mc5: "A café? Like a date?",
      lina11: "Not a date, just a meeting. But he did pay for everything.",
      lina12: "He’s such a gentleman, always making me feel special.",
      mc6: "I don’t like hearing that, Lina.",
      lina13: "Then do better. I’m not gonna stop living my life.",
      lina14: "The shoot next week’s gonna be intense, by the way.",
      mc7: "Intense how?",
      lina15: "He wants some flirty poses, maybe some close-ups.",
      lina16: "He said I have a natural chemistry with the camera.",
      mc8: "I’m sure you do. I just wish I felt better about this.",
      lina17: "You’ll get there. But I need you to try harder.",
      lina18: "I’m heading home now. Think about what I said." 
    } : {
      lina1: "Итак, ты сказал, что постараешься смириться. Посмотрим, серьёзно ли ты.",
      lina2: "Я сегодня встречаюсь с фотографом, обсуждаем кампанию.",
      mc1: "Ладно, я пытаюсь с этим смириться. Как прошло?",
      lina3: "Отлично прошло. С ним так легко говорить, не то что с некоторыми.",
      lina4: "Он всё хвалил мой стиль, сказал, что я идеально подхожу.",
      mc2: "Я рад, что всё хорошо. Что за кампания?",
      lina5: "Большое дело. Много съёмок, может, даже поездки.",
      lina6: "Он хочет, чтобы я была лицом его новой коллекции.",
      mc3: "Это звучит как куча времени с ним.",
      lina7: "Да, так и будет. Но ты сказал, что поддержишь, да?",
      lina8: "Он уже планирует первую съёмку на следующей неделе.",
      mc4: "Я стараюсь, Лина. Иногда просто тяжело.",
      lina9: "Понимаю, но тебе нужно либо стараться лучше, либо уйти.",
      lina10: "Он, кстати, сводил меня в крутое кафе сегодня.",
      mc5: "Кафе? Типа свидания?",
      lina11: "Не свидание, просто встреча. Но он за всё заплатил.",
      lina12: "Он такой джентльмен, всегда заставляет чувствовать себя особенной.",
      mc6: "Мне не нравится это слышать, Лина.",
      lina13: "Тогда делай лучше. Я не собираюсь останавливать свою жизнь.",
      lina14: "Съёмка на следующей неделе будет, кстати, насыщенной.",
      mc7: "Насыщенной в каком смысле?",
      lina15: "Он хочет кокетливые позы, может, крупные планы.",
      lina16: "Сказал, что у меня естественная химия с камерой.",
      mc8: "Уверен, что да. Просто хотел бы чувствовать себя лучше с этим.",
      lina17: "Ты дойдёшь до этого. Но мне нужно, чтобы ты старался больше.",
      lina18: "Я еду домой. Подумай о том, что я сказала."
    };
    return [
      { type: "received", text: texts.lina1, delay: 1000 },
      { type: "received", text: texts.lina2, delay: 2600 },
      { type: "sent", text: texts.mc1, delay: 4200 },
      { type: "received", text: texts.lina3, delay: 5800 },
      { type: "received", text: texts.lina4, delay: 7400 },
      { type: "sent", text: texts.mc2, delay: 9000 },
      { type: "received", text: texts.lina5, delay: 10600 },
      { type: "received", text: texts.lina6, delay: 12200 },
      { type: "sent", text: texts.mc3, delay: 13800 },
      { type: "received", text: texts.lina7, delay: 15400 },
      { type: "received", text: texts.lina8, delay: 17000 },
      { type: "sent", text: texts.mc4, delay: 18600 },
      { type: "received", text: texts.lina9, delay: 20200 },
      { type: "received", text: texts.lina10, delay: 21800 },
      { type: "sent", text: texts.mc5, delay: 23400 },
      { type: "received", text: texts.lina11, delay: 25000 },
      { type: "received", text: texts.lina12, delay: 26600 },
      { type: "sent", text: texts.mc6, delay: 28200 },
      { type: "received", text: texts.lina13, delay: 29800 },
      { type: "received", text: texts.lina14, delay: 31400 },
      { type: "sent", text: texts.mc7, delay: 33000 },
      { type: "received", text: texts.lina15, delay: 34600 },
      { type: "received", text: texts.lina16, delay: 36200 },
      { type: "sent", text: texts.mc8, delay: 37800 },
      { type: "received", text: texts.lina17, delay: 39400 },
      { type: "received", text: texts.lina18, delay: 41000 },
    ];
  },
    getChoices(gameState) {
     const texts = gameState.language === 'en' ? {
      choice1: "I will. Night, Lina."
    } : {
      choice1: "Подумаю. Спокойной, Лина."
    };
    return [
      {
        id: "encourage",
        text: texts.choice1,
        action: (state) => { state.choices.chapter6_resist = "no_break_through"; },
        delay: 42600, 
        nextChapter: "cold_good_night" 
      }
    ];
  }
};