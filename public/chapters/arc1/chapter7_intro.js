export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      system_msg: "Lina posted a new photo on PureGram",
      photo_caption: "Sudden pair photoshoot 📸",
      image: "img/lina_photoshoot_0.webp",
    } : {
      system_msg: "Лина опубликовала новый пост в PureGram",
      photo_caption: "Внезапная парная фотосессия 📸",
      image: "img/lina_photoshoot_0.webp",
    };

    return [
      { 
        type: "photo", 
        text: texts.system_msg,
        delay: 1000,
        src: texts.image,
        description: texts.photo_caption,
        onAfter: () => {
          window.game.addNewPost(
            texts.image,
            {
            ru: "Внезапная парная фотосессия 📸",
            en: "Sudden pair photoshoot 📸"
            },
            324
          );
        }
      }
    ];
  },

  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "Lina, I just saw your post on PureGram. That photo with Alex is pretty intimate. Why didn't you tell me you were doing a pair shoot?",
      msg2_received: "Oh, that? It was last minute. The photographer thought it would be cool to have some couple shots. You know, for variety.",
    } : {
      choice1: "Лина, я только что увидел твой пост в ПьюрГраме. Та фотка с Алексом довольно интимная. Почему ты не сказала, что будешь сниматься парой?",
      msg2_received: "О, это? Это было в последний момент. Фотограф подумал, что будет круто сделать несколько парных кадров. Для разнообразия.",
    };

    return [
      {
        id: "confront",
        text: texts.choice1,
        result: [
          { type: "received", text: texts.msg2_received, delay: 1000, nextChapter: "chapter7" }
        ]
      }
    ];
  }
};