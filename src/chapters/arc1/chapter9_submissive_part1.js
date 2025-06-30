export default {
  translations: {
    ru: {
      msg1: "Эй, малыш! Снова за компом, рву всех в Доте.",
      mc1: "О, ты опять в игре? А я тут про твои ступни думаю, покажи-ка!",
      lina1: "Серьёзно? Ну, держи, мои офигенные ступни на фоне катки. [фото ног на фоне Доты]",
      msg2: "Чёрт, Лина, ты знаешь, как меня завести...",
      lina2: "Ахах, знаю. Помнишь вчера? Ты был не в форме, слабак.",
      mc2: "Признаю, быстро кончил. Но ты не жаловалась, да?",
      lina3: "Не жаловалась? Твой язык — магия, но попытки… жалкие. Глянь фотку с вечера, я довольна. [фото со встречи]",
      msg3: "Ты шикарна, Лина. Куни правда зашёл?",
      lina4: "О да, это было что-то. Может, станешь массажистом женских ног? 😏",
      mc3: "Да блин, ты что? Мне твои ступни нравятся, чужие не хочу!",
      lina5: "Ха, профессии такой нет — только женские ноги массировать! Ты бы справился, слабак.",
      msg4: "Лина, я только твои хочу трогать, серьёзно.",
      lina6: "Мои? Мило, но вчера ты был жалок. Докажи, что можешь лучше.",
      choice1a: "Прости, Лина, я постараюсь быть лучше.",
      choice1b: "Я был не так уж плох, дай шанс!",
      choice1c: "Ладно, давай не будем об этом.",
      lina1a: "Постараешься? Ха, докажи завтра, мой послушный.",
      lina1b: "Шанс? Только если не облажаешься снова.",
      lina1c: "Не будем? Окей, но ты всё равно слабак.",
      mc4: "Лина, я хочу тебя, а не споры.",
      lina7: "Меня? Тогда завтра ко мне. Но Марк тоже звонил, он интересный."
    },
    en: {
        msg1: "Hey, baby! Back at the computer, crushing everyone in Dota.",
        mc1: "Oh, you're gaming again? I was thinking about your feet, show me!",
        lina1: "Seriously? Well, here you go, my awesome feet against the game. [photo of feet against Dota]",
        msg2: "Damn, Lina, you know how to turn me on...",
        lina2: "Haha, I know. Remember yesterday? You weren't in shape, weakling.",
        mc2: "I admit, I came too quickly. But you didn't complain, did you?",
        lina3: "Complained? Your tongue is magic, but your attempts... pathetic. Check out the photo from last night, I'm satisfied. [photo from the meeting]",
        msg3: "You're amazing, Lina. Did the oral really work?",
        lina4: "Oh yes, it was something else. Maybe you'll become a foot masseur? 😏",
        mc3: "Come on, what? I like your feet, not others'!",
        lina5: "Ha, there's no such profession — only massaging women's feet! You could handle it, weakling.",
        msg4: "Lina, I only want to touch yours, seriously.",
        lina6: "Mine? Cute, but yesterday you were pathetic. Prove you can do better.",
        choice1a: "Sorry, Lina, I'll try to be better.",
        choice1b: "I wasn't that bad, give me a chance!",
        choice1c: "Okay, let's not talk about it.",
        lina1a: "Try to be better? Haha, prove it tomorrow, my submissive.",
        lina1b: "Chance? Only if you don't flop again.",
        lina1c: "Not talking about it? Okay, but you're still a wimp.",
        mc4: "Lina, I want you, not arguments.",
        lina7: "Me? Then come to me tomorrow. But Mark called too, he's interesting."
    }
  },

  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "received", text: texts.msg1, delay: 1500 },
      { type: "sent", text: texts.mc1, delay: 3200 },
      { 
        type: "photo", 
        text: texts.lina1, 
        delay: 4900, 
        src: "img/lina_feet_dota.jpg"
      },
      { type: "sent", text: texts.msg2, delay: 6600 },
      { type: "received", text: texts.lina2, delay: 8300 },
      { type: "sent", text: texts.mc2, delay: 10000 },
      { 
        type: "photo", 
        text: texts.lina3, 
        delay: 11700, 
        src: "img/lina_meeting.jpg"
      },
      { type: "sent", text: texts.msg3, delay: 13400 },
      { type: "received", text: texts.lina4, delay: 15100 },
      { type: "sent", text: texts.mc3, delay: 16800 },
      { type: "received", text: texts.lina5, delay: 18500 },
      { type: "sent", text: texts.msg4, delay: 20200 },
      { type: "received", text: texts.lina6, delay: 21900, showChoices: true }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "apologize",
        text: texts.choice1a,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "apologize";
        },
        result: [
          { type: "received", text: texts.lina1a, delay: 1000 },
          { type: "sent", text: texts.mc4, delay: 2700 },
          { type: "received", text: texts.lina7, delay: 4400, nextChapter: "chapter9_submissive_part2" }
        ]
      },
      {
        id: "apologize",
        text: texts.choice1b,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "chance";
        },
        result: [
          { type: "received", text: texts.lina1b, delay: 1000 },
          { type: "sent", text: texts.mc4, delay: 2700 },
          { type: "received", text: texts.lina7, delay: 4400, nextChapter: "chapter9_submissive_part2" }
        ]
      },
      {
        id: "apologize",
        text: texts.choice1c,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "change_theme";
        },
        result: [
          { type: "received", text: texts.lina1c, delay: 1000 },
          { type: "sent", text: texts.mc4, delay: 2700 },
          { type: "received", text: texts.lina7, delay: 4400, nextChapter: "chapter9_submissive_part2" }
        ]
      }
    ];
  }
};