export default {
  translations: {
      ru: {
          msg_1: "Ладно, уже так поздно. Спать пора! Я пойду, и ты долго не сиди",
          msg_2: "Дааа, ты права. Пойду тогда тоже понемногу",
          choice_1: "Сладких снов!",
          result_1: "Спасибо! Увидимся завтра в университете 💫",
          choice_2: "Но даже как-то жалко прощаться на сегодня...",
          result_2a: "Мне, если честно, тоже... Но нам обоим нужно выспаться 🌙",
          result_2b: "Сладких снов и спокойной ночи! ❤️"
      },
      en: {
          msg_1: "Well, it's so late already. Time to go to sleep! I'm going, and you shouldn't stay up too late either",
          msg_2: "Yeaaah, you're right. I'll go to bed soon too",
          choice_1: "Sweet dreams!",
          result_1: "Thanks! See you tomorrow at university 💫",
          choice_2: "But it's kind of sad to say goodbye for today...",
          result_2a: "To be honest, I feel the same... But we both need to get some sleep 🌙",
          result_2b: "Sweet dreams and good night! ❤️"
      }
  },

  getText(gameState) {
      return [
          {
              type: "received",
              text: this.translations[gameState.language].msg_1,
              delay: 1000
          },
          {
              type: "sent",
              text: this.translations[gameState.language].msg_2,
              delay: 2500
          }
      ];
  },

  getChoices(gameState) {
      const lang = gameState.language || 'ru';
      
      return [
          {
              id: "sweet_dreams",
              text: this.translations[lang].choice_1,
              result: [
                  {
                      type: "received",
                      text: this.translations[lang].result_1,
                      delay: 1000,
                    nextChapter: "ark_final"
                  }
              ]
          },
          {
              id: "sad_goodbye",
              text: this.translations[lang].choice_2,
              result: [
                  {
                      type: "received",
                      text: this.translations[lang].result_2a,
                      delay: 1000
                  },
                  {
                      type: "received",
                      text: this.translations[lang].result_2b,
                      delay: 2500,
                    nextChapter: "ark_final"
                  }
              ]
          }
      ];
  }
};