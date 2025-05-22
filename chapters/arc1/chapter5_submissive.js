export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      lina1: "Hehe, interesting...",
      lina2: "What a reaction you have to this...",
      mc1: "In what way? To this?",
      lina3: "Most guys would lose it with the photographer situation, but not you.",
      lina4: "You’re just chilling, and I’m really into that.",
      mc2: "I just want you to be happy. That’s all I need.",
      lina5: "That’s what I like about you. You get me.",
      lina6: "He texted me this morning. Said I’m his best model ever.",
      mc3: "Wow, he’s really into you, huh?",
      lina7: "Oh, he’s obsessed. Keeps going on about my poses, my vibe.",
      lina8: "I told him I have a boyfriend, and he’s totally cool with it.",
      mc4: "What did he say about that?",
      lina9: "He laughed, said you’re one in a million for trusting me like that.",
      lina10: "By the way, I tried on something for the next shoot. Wanna see?",
      mc5: "Yeah, definitely. Show me.",
      lina11: "Here you go...",
      lina11_image: "img/lina_tease.jpg",
      lina12: "What do you think? Will the photographer like it?",
      mc6: "You look amazing. He’d be crazy not to like it.",
      lina13: "I’m glad you think so. He’s planning a private shoot next week.",
      lina14: "Just him and me at his studio. More intimate vibe.",
      mc7: "Just you two? That sounds intense.",
      lina15: "Yeah, but I want you there. As my assistant, so I can focus on the work.",
      lina16: "I love the idea of you watching me pose. It’s such a turn-on.",
      mc8: "I’d love to help. It’ll be something to see.",
      lina17: "He wants bolder shots this time. Maybe something more revealing.",
      lina18: "He mentioned artistic nudes, but tasteful. I’m considering it.",
      mc9: "You’d look incredible, I’m sure. Are you okay with that?",
      lina19: "I think so. I trust him. And I trust you to be okay with it.",
      lina20: "You’ll be there, right? I want you to see it all.",
      mc10: "Of course, I wouldn’t miss it.",
      lina21: "It’s gonna be intense. You better be ready to behave.",
      lina22: "So, what’s your vibe for this shoot? I need to know where your head’s at."
    } : {
      lina1: "Хе-хе, интересно...",
      lina2: "Какая удивительная у тебя реакция на это...",
      mc1: "В плане? На это?",
      lina3: "Большинство парней бы взбесились из-за ситуации с фотографом, но не ты.",
      lina4: "Ты так спокоен, и мне это реально нравится.",
      mc2: "Я просто хочу, чтобы ты была счастлива, Это всё, что мне нужно.",
      lina5: "Вот это мне в тебе и нравится. Ты меня понимаешь.",
      lina6: "Он мне писал утром. Сказал, что я его лучшая модель.",
      mc3: "Ничего себе, да он и в самом деле увлечён тобой",
      lina7: "Представляешь? Постоянно говорит про мою пластику и энергетику.",
      lina8: "Я сказала ему, что у меня есть парень, и он полностью поддерживает меня.",
      mc4: "И что он сказал?",
      lina9: "Засмеялся, сказал, что ты один на миллион, раз так сильно доверяешь мне.",
      lina10: "Кстати, примерила кое-что для следующей съёмки. Хочешь глянуть?",
      mc5: "Спрашиваешь? Конечно, покажи.",
      lina11_image: "img/lina_tease.jpg",
      lina11: "Вот, смотри...",
      lina12: "Ну как? Фотографу понравится, думаешь?",
      mc6: "Выглядишь невероятно! Ему точно понравится.",
      lina13: "Рада, что ты так думаешь. Он планирует приватную съёмку на следующей неделе.",
      lina14: "Только он и я в его студии. Более интимная атмосфера.",
      mc7: "Только вы двое? Звучит очень смело.",
      lina15: "Да, но я хочу, чтобы ты был там. Как мой ассистент - тогда я смогу сконцентрироавться на процессе.",
      lina16: "Мне нравится мысль, что ты будешь смотреть, как я позирую. Это так будоражит.",
      mc8: "С удовольствием. Я не пропущу подобного зрелища.",
      lina17: "Он хочет смелые кадры. Может, что-то более откровенное.",
      lina18: "Говорил о художественной ню-эстетике. Я думаю об этом.",
      mc9: "Ты будешь выглядеть потрясающе, уверен. Но ты точно готова?",
      lina19: "Думаю, да. Я ему доверяю. И тебе - уверена ты справишься.",
      lina20: "Ты ведь будешь рядом? Хочу, чтобы ты всё видел.",
      mc10: "Я буду с тобой. В любой ситуации.",
      lina21: "Обещай держать себя в руках. Будет... очень жарко.",
      lina22: "Что думаешь? Какие ожидания?."
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
      { type: "sent", text: texts.mc5, delay: 22500 },
      { type: "photo", 
          text: texts.lina11, 
          delay: 23400, 
          src: texts.lina11_image, 
          onAfter: () => {
            try {
              console.log('Попытка добавить пост в PureGram');
              if (typeof window.game.addNewPost === 'function') {
                window.game.addNewPost(
                    texts.lina11_image,
                    'Примерка для новой фотосессии 📸✨',
                    423
                );
                console.log('Функция addNewPost вызвана успешно');
            } else {
                console.error('Функция addNewPost не определена');
            }
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
          }
        }
      },
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
      { type: "received", text: texts.lina21, delay: 49000 },
      { type: "received", text: texts.lina22, delay: 50600, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I’m all in, Lina. I’ll be there and support you fully.",
      result1: "That’s my good boy. See you soon.",
      choice2: "I’m okay with it, but I’m not sure about the nudes.",
      result2: "Don’t worry, I’ll take it slow. But I expect you there."
    } : {
      choice1: "Я готов, если ты готова. Я буду рядом и поддержу тебя.",
      result1: "Хороший мальчик. Увидимся скоро.",
      choice2: "Я готов, но не уверен насчёт ню.",
      result2: "Не беспокойся, я всё ещё не решила. Но в любом случае, надеюсь ты будешь рядом."
    };
    return [
      {
        id: "full_support",
        text: texts.choice1,
        action: (state) => { state.choices.chapter5 = "full_support"; },
        result: [
          { type: "received", text: texts.result1, delay: 1600, nextChapter: "chapter6_submissive" }
        ]
      },
      {
        id: "hesitant",
        text: texts.choice2,
        action: (state) => { state.choices.chapter5 = "hesitant"; },
        result: [
          { type: "received", text: texts.result2, delay: 1600, nextChapter: "chapter6_submissive_hesitant" }
        ]
      }
    ];
  }
};