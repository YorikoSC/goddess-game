export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "So, you needed a break. I’m not gonna lie, I’m disappointed.",
      lina2: "I thought you could handle me, but I guess I was wrong.",
      mc1: "I just needed some space to think, Lina. I’m sorry.",
      lina3: "Space is fine, but I’m not waiting around for you.",
      lina4: "I met with the photographer today for the campaign.",
      mc2: "How’d that go? I’m trying to be okay with this.",
      lina5: "It went amazing. He’s so much easier to deal with than you.",
      lina6: "He kept saying I’m perfect for this project.",
      mc3: "I’m glad for you, but it’s still hard for me.",
      lina7: "That’s your problem. He’s planning the first shoot already.",
      lina8: "It’s gonna be a big one, lots of flirty vibes.",
      mc4: "Flirty vibes? I don’t know if I can handle that.",
      lina9: "Then don’t. I’m doing this with or without you.",
      lina10: "He took me to a café after our meeting, by the way.",
      mc5: "A café? That sounds like a date.",
      lina11: "Not a date, but he did treat me. He’s a gentleman.",
      lina12: "He makes me feel appreciated, which is more than I can say for you.",
      mc6: "I’m trying, Lina. I just need time.",
      lina13: "I don’t have time to wait. I’m moving forward.",
      lina14: "The shoot’s next week, and I’m all in for it.",
      mc7: "I don’t know if I can be there for that.",
      lina15: "Then don’t come. I don’t need the drama.",
      lina16: "He’s already planning more shoots after this one.",
      mc8: "So you’re just gonna keep going with him?",
      lina17: "Yeah, I am. I’m not stopping my life for you.",
      lina18: "Think about what you want. I’m done for tonight.",
    } : {
      lina1: "Итак, тебе нужна была пауза. Честно, я разочарована.",
      lina2: "Думала, ты можешь со мной справиться, но, похоже, ошиблась.",
      mc1: "Мне просто нужно было время подумать, Лина. Прости.",
      lina3: "Время нормально, но я не собираюсь тебя ждать.",
      lina4: "Я сегодня встретилась с фотографом насчёт кампании.",
      mc2: "Как прошло? Я пытаюсь с этим смириться.",
      lina5: "Идеально прошло. С ним намного проще, чем с тобой.",
      lina6: "Он всё говорил, что я идеально подхожу для проекта.",
      mc3: "Я рад за тебя, но мне всё ещё тяжело.",
      lina7: "Это твоя проблема. Он уже планирует первую съёмку.",
      lina8: "Будет мощно, с кокетливым вайбом.",
      mc4: "Кокетливый вайб? Не знаю, справлюсь ли я.",
      lina9: "Тогда не надо. Я сделаю это с тобой или без.",
      lina10: "Он, кстати, сводил меня в кафе после встречи.",
      mc5: "Кафе? Это похоже на свидание.",
      lina11: "Не свидание, но он угостил. Он джентльмен.",
      lina12: "Он заставляет меня чувствовать себя ценной, чего не скажешь о тебе.",
      mc6: "Я стараюсь, Лина. Мне просто нужно время.",
      lina13: "У меня нет времени ждать. Я иду дальше.",
      lina14: "Съёмка на следующей неделе, и я полностью в деле.",
      mc7: "Не знаю, смогу ли я там быть.",
      lina15: "Тогда не приходи. Мне не нужна драма.",
      lina16: "Он уже планирует следующие съёмки после этой.",
      mc8: "То есть ты просто продолжишь с ним?",
      lina17: "Да, продолжу. Я не останавливаю свою жизнь ради тебя.",
      lina18: "Подумай, чего ты хочешь. Я закончила на сегодня.",
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
      { type: "received", text: texts.lina18, delay: 41000 }
    ];
  },
  getChoices(gameState) {
     const texts = gameState.language === 'en' ? {
      choice1: "Okay, night, Lina."
    } : {
      choice1: "Ладно, спокойной, Лина."
    };
    return [
      {
        id: "encourage",
        text: texts.choice1,
        action: (state) => { state.choices.chapter5 = "need_break"; },
        delay: 42600, 
        nextChapter: "cold_good_night" 
      }
    ];
  }
};