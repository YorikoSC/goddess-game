export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "I’m so done with your jealousy. It’s getting ridiculous.",
      lina2: "You’re acting like I’m doing something wrong, and I’m not.",
      mc1: "I’m not jealous, I’m just worried about you.",
      lina3: "Worried? The photographer’s just doing his job.",
      lina4: "You keep making it out like he’s trying to steal me.",
      mc2: "It’s not you, it’s him. He’s too into you.",
      lina5: "He’s professional. You’re imagining things.",
      lina6: "He texted me today, said I was incredible on the last shoot.",
      mc3: "I see how he looks at you. It’s not just professional.",
      lina7: "That’s your issue, not mine. I’m going to that shoot next week.",
      lina8: "By the way, I tried on something for it. Wanna see what he’ll be shooting?",
      mc4: "Fine, show me.",
      lina9: "Here you go.",
      lina9_image: "img/lina_tease.jpg",
      lina10: "He said this vibe is perfect for the shoot. You don’t mind, right?",
      mc5: "You look great, but I’m not okay with him seeing you like this.",
      lina11: "Too bad. He’s the best in the business, and I trust him.",
      lina12: "He’s booked me for a big campaign. More shoots, more time with him.",
      mc6: "This is getting out of hand, Lina.",
      lina13: "No, you’re getting out of hand. I need space from this.",
      lina14: "I’m meeting him tomorrow to discuss the campaign.",
      mc7: "You’re meeting him again? Already?",
      lina15: "Yeah, and I don’t need your permission for it.",
      lina16: "I’m not your property. I do what I want.",
      mc8: "I’m not trying to control you, I’m just upset.",
      lina17: "Your upset is exhausting. I’m done with this tonight.",
      lina18: "You need to figure out if you can handle me.",
      mc9: "I’m trying, but you’re making it hard.",
      lina19: "I’m not making it hard. You’re making it dramatic.",
      lina20: "Think about what you want. I’m going to bed.",
      mc10: "Okay, we’ll talk later then.",
      lina21: "Yeah, we will. But I need to know where you stand."
    } : {
      lina1: "Я так устала от твоей ревности. Это уже смешно.",
      lina2: "Ты ведёшь себя, будто я делаю что-то не так, а я не делаю.",
      mc1: "Я не ревную, я просто беспокоюсь о тебе.",
      lina3: "Беспокоишься? Фотограф просто делает свою работу.",
      lina4: "Но ты всё время делаешь из этого проблему, будто он меня уводит.",
      mc2: "Дело не в тебе, а в нём. Он слишком тобой увлечён.",
      lina5: "Он профессионал. Ты всё выдумываешь.",
      lina6: "Он писал мне сегодня, сказал, что я была шикарна на последней съёмке.",
      mc3: "Я вижу, как он на тебя смотрит. Это не просто профессионально.",
      lina7: "Это твоя проблема, не моя. Я иду на ту съёмку на следующей неделе.",
      lina8: "Кстати, примерила кое-что для неё. Хочешь глянуть, что он будет снимать?",
      mc4: "Ладно, покажи.",
      lina9: "Вот, держи.",
      lina9_image: "img/lina_tease.jpg",
      lina10: "Он сказал, что этот вайб идеален для съёмки. Ты же не против, да?",
      mc5: "Выглядишь классно, но мне не нравится, что он тебя так увидит.",
      lina11: "Похер. Он лучший в своём деле, и я ему доверяю.",
      lina12: "Он забронировал меня на большую кампанию. Больше съёмок, больше времени с ним.",
      mc6: "Это уже слишком, Лина.",
      lina13: "Нет, это ты слишком. Мне нужно пространство от этого.",
      lina14: "Завтра встречаюсь с ним, обсудим кампанию.",
      mc7: "Опять с ним встречаешься? Уже?",
      lina15: "Да, и мне не нужно твоё разрешение.",
      lina16: "Я не твоя собственность. Делаю, что хочу.",
      mc8: "Я не пытаюсь тебя контролировать, я просто расстроен.",
      lina17: "Твоё расстройство выматывает. Я закончила на сегодня.",
      lina18: "Подумай, можешь ли ты со мной справиться.",
      mc9: "Я пытаюсь, но ты усложняешь.",
      lina19: "Я не усложняю. Ты устраиваешь драму.",
      lina20: "Подумай, чего ты хочешь. Я иду спать.",
      mc10: "Ладно, поговорим позже.",
      lina21: "Да, поговорим. Но мне нужно знать, на чём ты стоишь."
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
      { type: "photo", text: texts.lina9, delay: 20200, src: texts.lina9_image },
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
      { type: "sent", text: texts.mc9, delay: 42600 },
      { type: "received", text: texts.lina19, delay: 44200 },
      { type: "received", text: texts.lina20, delay: 45800 },
      { type: "sent", text: texts.mc10, delay: 47400 },
      { type: "received", text: texts.lina21, delay: 49000, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I’ll try to get over it and support you.",
      result1: "Good. Let’s see if you mean it.",
      choice2: "I can’t deal with this. I need a break.",
      result2: "Fine. Take your break. Don’t expect me to wait."
    } : {
      choice1: "Я постараюсь смириться и поддержать тебя.",
      result1: "Хорошо. Посмотрим, серьёзно ли ты это.",
      choice2: "Я не могу с этим справиться. Мне нужна пауза.",
      result2: "Ладно. Бери паузу. Но не жди, что я буду ждать."
    };
    return [
      {
        id: "try_support",
        text: texts.choice1,
        action: (state) => { state.choices.chapter5 = "try_support"; },
        result: [
          { type: "received", text: texts.result1, delay: 1600, nextChapter: "chapter6_resist" }
        ]
      },
      {
        id: "need_break",
        text: texts.choice2,
        action: (state) => { state.choices.chapter5 = "need_break"; },
        result: [
          { type: "received", text: texts.result2, delay: 1600, nextChapter: "chapter6_resist_break" }
        ]
      }
    ];
  }
};