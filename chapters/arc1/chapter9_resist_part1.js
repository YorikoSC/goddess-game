export default {
  translations: {
    ru: {
      lina1: "Эй, малыш! Снова за компом, рву всех в Доте.",
      mc1: "О, ты опять в игре? Покажи свои ступни, если не боишься!",
      lina2: "Серьёзно? Вот мои офигенные ступни, держи. [фото ног на фоне Доты]",
      msg1: "Чёрт, Лина, ты меня заводишь...",
      lina3: "Завожу? Ха, вчера ты был слабак, признай.",
      mc2: "Быстро кончил, да, но ты тоже не идеальна!",
      lina4: "Не идеальна? Твой язык был норм, но попытки… жалкие. Глянь фотку с вечера. [фото со встречи]",
      msg2: "Ты шикарна, но куни — это всё, что я сделал хорошо?",
      lina5: "О да, это было что-то. Может, станешь массажистом женских ног? 😏",
      mc3: "Только твои, Лина, но не указывай!",
      lina6: "Ха, профессии такой нет — только женские ноги массировать! Слабо, упрямец?",
      msg3: "Лина, я не для чужих ног, только твои.",
      lina7: "Мои? После вчерашнего — смешно. Докажи, что можешь лучше.",
      choice1a: "Это несправедливо, я старался!",
      choice1b: "Ты сама меня довела, Лина!",
      choice1c: "Не хочу это обсуждать, хватит.",
      lina1a: "Старался? Ха, зря, если так выглядело.",
      lina1b: "Довела? Твоя слабость, не моя.",
      lina1c: "Хватит? Окей, но ты всё равно слабак.",
      lina8: "Меня? Завтра ко мне, но Марк тоже звонил.",
      mc5: "Марк? Ты с ним? Из-за моего секса?",
      lina9: "Может, да, может, нет. Он не торопится, как ты. Загадки — это моё."
    },
    en: {
      lina1: "Hey, baby! Back at the computer, crushing everyone in Dota.",
      mc1: "Oh, you're playing again? Show me your feet if you're not scared!",
      lina2: "Seriously? Here are my awesome feet, enjoy. [photo of feet in front of Dota]",
      msg1: "Damn, Lina, you're turning me on...",
      lina3: "Turning you on? Ha, yesterday you were a wimp, admit it.",
      mc2: "Came too quickly, huh? But you're not perfect either!",
      lina4: "Not perfect? Your tongue was okay, but your attempts... pathetic. Check out the photo from last night. [photo from the meeting]",
      msg2: "You're amazing, but was oral all I did right?",
      lina5: "Oh yes, that was something. Maybe you should become, like, a foot masseur? 😏",
      mc3: "Only your feet, Lina, but don't boss me around!",
      lina6: "Ha, there's no such profession — only massaging women's feet! Feeling weak, stubborn one?",
      msg3: "Lina, I'm not for other people's feet, only yours.",
      lina7: "Mine? After yesterday — funny. Prove you can do better.",
      choice1a: "That's unfair, I tried hard!",
      choice1b: "You pushed me, Lina!",
      choice1c: "I don't want to discuss this, enough.",
      lina1a: "Tried hard? Ha, pointless if it looked like that.",
      lina1b: "Pushed you? Your weakness, not mine.",
      lina1c: "Enough? Okay, but you're still a wimp.",
      lina8: "Me? Tomorrow, but Mark called too.",
      mc5: "Mark? You're with him? Because of my sex?",
      lina9: "Maybe yes, maybe no. He's not in a hurry like you. Mysteries are my thing."
    }
  },
  getText(gameState) {
    const texts = this.translations[gameState.language];
    return [
      { type: "received", text: texts.lina1, delay: 1500 },
      { type: "sent", text: texts.mc1, delay: 3200 },
      { 
        type: "photo", 
        text: texts.lina2, 
        delay: 4900, 
        src: "img/lina_feet_dota.jpg"
      },
      { type: "sent", text: texts.msg1, delay: 6600 },
      { type: "received", text: texts.lina3, delay: 8300 },
      { type: "sent", text: texts.mc2, delay: 10000 },
      { 
        type: "photo", 
        text: texts.lina4, 
        delay: 11700, 
        src: "img/lina_meeting.jpg"
      },
      { type: "sent", text: texts.msg2, delay: 13400 },
      { type: "received", text: texts.lina5, delay: 15100 },
      { type: "sent", text: texts.mc3, delay: 16800 },
      { type: "received", text: texts.lina6, delay: 18500 },
      { type: "sent", text: texts.msg3, delay: 20200 },
      { 
        type: "received", 
        text: texts.lina7, 
        delay: 21900,
        showChoices: true
      }
    ];
  },

  getChoices(gameState) {
    const texts = this.translations[gameState.language];
    return [
      {
        id: "unfair",
        text: texts.choice1a,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "unfair";
        },
        result: [
          { type: "received", text: texts.lina1a, delay: 1000 },
          { type: "received", text: texts.lina8, delay: 2700 },
          { type: "sent", text: texts.mc5, delay: 4400 },
          { type: "received", text: texts.lina9, delay: 6100, nextChapter: "chapter9_resist_part2" }
        ]
      },
      {
        id: "pushed",
        text: texts.choice1b,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "pushed";
        },
        result: [
          { type: "received", text: texts.lina1b, delay: 1000 },
          { type: "received", text: texts.lina8, delay: 2700 },
          { type: "sent", text: texts.mc5, delay: 4400 },
          { type: "received", text: texts.lina9, delay: 6100, nextChapter: "chapter9_resist_part2" }
        ]
      },
      {
        id: "enough",
        text: texts.choice1c,
        action: (gameState) => {
          gameState.choices.chapter9_sex = "enough";
        },
        result: [
          { type: "received", text: texts.lina1c, delay: 1000 },
          { type: "received", text: texts.lina8, delay: 2700 },
          { type: "sent", text: texts.mc5, delay: 4400 },
          { type: "received", text: texts.lina9, delay: 6100, nextChapter: "chapter9_resist_part2" }
        ]
      }
    ];
  }
};