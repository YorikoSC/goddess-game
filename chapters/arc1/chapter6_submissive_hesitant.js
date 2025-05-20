export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "Hey, the shoot’s tomorrow. You seemed hesitant last time.",
      lina2: "I need to know you’re really okay with this.",
      mc1: "I’m trying, Lina. I just wasn’t sure about the nudes.",
      lina3: "I get that. I’ll take it slow, okay?",
      lina4: "But I still want you there as my assistant.",
      mc2: "I’ll be there. I just need to wrap my head around it.",
      lina5: "That’s fair. The photographer’s been hyping me up all day.",
      lina6: "He says I’m gonna be the star of this shoot.",
      mc3: "I’m sure you will. What’s the plan for the shoot?",
      lina7: "He wants some bold shots, but I’ll keep it less revealing for now.",
      lina8: "Maybe some sheer fabric, but nothing too crazy.",
      mc4: "That sounds more manageable. I can handle that.",
      lina9: "Good. I need you to be supportive, not stressed.",
      lina10: "It’s still gonna be intimate, though. Close-up shots and all.",
      mc5: "I’ll be okay. I just want you to feel good.",
      lina11: "I will, especially with you there watching me.",
      lina12: "He’s got this vision of me in soft lighting, looking sultry.",
      mc6: "You’ll look amazing, I’m sure.",
      lina13: "I know I will. And you’ll get to see every moment.",
      lina14: "He might direct me to do some subtle poses, maybe a little touch.",
      mc7: "Subtle sounds fine. I’ll be there for you.",
      lina15: "That’s what I want. No interruptions, okay?",
      lina16: "I want you to enjoy watching me work.",
      mc8: "I’ll do my best, Lina.",
      lina17: "Good. We leave at 10 tomorrow. Be ready.",
      lina18: "Get some rest, you’ll need it."
    } : {
      lina1: "Привет, съёмка завтра. Ты в прошлый раз был неуверен.",
      lina2: "Мне нужно знать, что ты реально с этим смиришься.",
      mc1: "Я стараюсь, Лина. Просто с ню не совсем уверен.",
      lina3: "Понимаю. Я не буду торопиться, ладно?",
      lina4: "Но всё равно хочу, чтобы ты был там как мой ассистент.",
      mc2: "Я буду. Мне просто нужно это осмыслить.",
      lina5: "Это нормально. Фотограф весь день меня нахваливал.",
      lina6: "Говорит, я буду звездой этой съёмки.",
      mc3: "Уверен, так и будет. Какой план у съёмки?",
      lina7: "Он хочет смелые кадры, но я пока сделаю менее откровенно.",
      lina8: "Может, тонкая ткань, но ничего слишком.",
      mc4: "Это звучит проще. Я справлюсь.",
      lina9: "Хорошо. Мне нужно, чтобы ты поддерживал, а не напрягался.",
      lina10: "Всё равно будет интимно. Крупные планы и всё такое.",
      mc5: "Я справлюсь. Хочу, чтобы тебе было комфортно.",
      lina11: "Мне будет, особенно с тобой, пока ты смотришь.",
      lina12: "У него идея с мягким светом, чтобы я выглядела томно.",
      mc6: "Ты будешь выглядеть круто, я уверен.",
      lina13: "Знаю. И ты увидишь каждый момент.",
      lina14: "Он может попросить тонкие позы, может, лёгкое касание.",
      mc7: "Тонкие звучат нормально. Я буду с тобой.",
      lina15: "Вот этого я и хочу. Без прерываний, ясно?",
      lina16: "Хочу, чтобы тебе нравилось смотреть на мою работу.",
      mc8: "Я постараюсь, Лина.",
      lina17: "Хорошо. Выезжаем в 10 завтра. Будь готов.",
      lina18: "Отдыхай, тебе понадобится энергия."
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
      choice1: "Got it. Night, Lina."
    } : {
      choice1: "Понял. Спокойной, Лина."
    };
    return [
      {
        id: "encourage",
        text: texts.choice1,
        action: (state) => { state.choices.chapter6_submissive_hesitant = "hesitate"; },
        delay: 42600, 
        nextChapter: "warm_good_night" 
      }
    ];
  }
};