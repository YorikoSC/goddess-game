export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "Hey, the shoot’s tomorrow. You ready for this?",
      lina2: "I’m feeling really good about it, especially with you there.",
      mc1: "I’m ready. It’s gonna be intense, but I’m here for you.",
      lina3: "Good. I need you to be my perfect assistant.",
      lina4: "The photographer’s been texting me all day, hyping me up.",
      mc2: "He’s really excited, huh? What’s he saying?",
      lina5: "He keeps saying I’m gonna blow everyone away with this shoot.",
      lina6: "He’s got some bold ideas, wants me to push my limits.",
      mc3: "Push your limits? Like what?",
      lina7: "He mentioned some semi-nude shots, but with a classy vibe.",
      lina8: "I told him I’m in, as long as you’re okay with it.",
      mc4: "I trust you, Lina. If you’re comfortable, I’m good.",
      lina9: "That’s my boy. I love how you just let me shine.",
      lina10: "It’s gonna be hot, knowing you’re watching me pose for him.",
      mc5: "I can’t lie, it’s a little thrilling to think about.",
      lina11: "Oh, you have no idea. He’s got a vision for me.",
      lina12: "He wants me in this sheer fabric, draped over my body.",
      mc6: "That sounds… wow. You’ll look amazing.",
      lina13: "I know I will. And you’ll be there to see every second.",
      lina14: "He said he might direct me to do some intimate poses.",
      mc7: "Intimate? What does that mean?",
      lina15: "Like, close-up shots, maybe some touching myself lightly.",
      lina16: "It’s all artistic, but it’ll definitely be spicy.",
      mc8: "I’ll be there to support you. It’ll be intense.",
      lina17: "You better behave. No interruptions, no jealousy.",
      lina18: "I want you to enjoy watching me, okay?",
      mc9: "I’ll do my best, Lina. I want you to feel good.",
      lina19: "That’s what I like to hear. We leave at 10 tomorrow.",
      lina20: "Get some rest, you’ll need your energy.",
      mc10: "Got it. Night, Lina."
    } : {
      lina1: "Привет, съёмка завтра. Ты готов к этому?",
      lina2: "Я прям в предвкушении, особенно с тобой рядом.",
      mc1: "Я готов. Будет напряжённо, но я с тобой.",
      lina3: "Хорошо. Мне нужно, чтобы ты был идеальным ассистентом.",
      lina4: "Фотограф весь день мне писал, настраивает меня.",
      mc2: "Он реально в восторге, да? Что говорит?",
      lina5: "Говорит, что я всех порву на этой съёмке.",
      lina6: "У него смелые идеи, хочет, чтобы я вышла за рамки.",
      mc3: "Выйти за рамки? Как это?",
      lina7: "Упомянул полуголые кадры, но с классным вайбом.",
      lina8: "Я сказала, что я в деле, если ты не против.",
      mc4: "Я тебе доверяю, Лина. Если тебе комфортно, я в порядке.",
      lina9: "Вот мой мальчик. Люблю, как ты даёшь мне сиять.",
      lina10: "Будет горячо, зная, что ты смотришь, как я позирую для него.",
      mc5: "Не буду врать, это немного волнующе.",
      lina11: "О, ты даже не представляешь. У него целая задумка для меня.",
      lina12: "Хочет меня в тонкой ткани, которая облегает тело.",
      mc6: "Звучит… вау. Ты будешь выглядеть невероятно.",
      lina13: "Я знаю. И ты будешь там, чтобы видеть каждый момент.",
      lina14: "Он сказал, что может попросить интимные позы.",
      mc7: "Интимные? Что это значит?",
      lina15: "Типа крупные планы, может, слегка касаться себя.",
      lina16: "Всё художественно, но будет точно остро.",
      mc8: "Я буду там, чтобы поддержать. Это будет мощно.",
      lina17: "Ты должен вести себя хорошо. Без прерываний, без ревности.",
      lina18: "Хочу, чтобы тебе нравилось смотреть на меня, ясно?",
      mc9: "Я постараюсь, Лина. Хочу, чтобы ты чувствовала себя круто.",
      lina19: "Вот это мне нравится слышать. Выезжаем в 10 завтра.",
      lina20: "Отдыхай, тебе понадобится энергия."
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
      { type: "sent", text: texts.mc9, delay: 42600 },
      { type: "received", text: texts.lina19, delay: 44200 },
      { type: "received", text: texts.lina20, delay: 45800 },
      { type: "sent", text: texts.mc10, delay: 47400, nextChapter: "warm_good_night" }
    ];
  },
  getChoices(gameState) {
     const texts = gameState.language === 'en' ? {
      choice1: "Got it. Night, Lina."
    } : {
      choice1: "Понял. Спокойной, Лина."
    };
    return [
      {
        id: "encourage",
        text: texts.choice1,
        action: (state) => { state.choices.chapter6_submissive = "submissive"; },
        delay: 47400, 
        nextChapter: "warm_good_night" 
      }
    ];
  }
};