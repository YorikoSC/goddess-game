export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Today’s shoot was unreal. The photographer was totally into it.",
      msg2: "He kept calling me his kitty, can you believe that?",
      msg3: "I want you there next week. You’ll come and help out, right?",
      msg4: "Don’t make me ask twice, I’m counting on you."
    } : {
      msg1: "Сегодняшняя съёмка офигенная. Фотограф был в восторге.",
      msg2: "Он всё время называл меня котёнком, можешь в это поверить?",
      msg3: "Я хочу, чтобы ты был там на следующей неделе. Придёшь помогать, да?",
      msg4: "Не заставляй меня просить дважды, я на тебя рассчитываю."
    };
    return [
      { type: "received", text: texts.msg1, delay: 1000 },
      { type: "received", text: texts.msg2, delay: 2500 },
      { type: "received", text: texts.msg3, delay: 4000 },
      { type: "received", text: texts.msg4, delay: 5500, showChoices: true }
    ];
  },
  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      choice1: "I’ll be there, Lina. Anything for you.",
      result1a: "That’s what I like to hear. You’re learning fast.",
      result1b: "Get ready, it’s gonna be a long day. For you, at least.",
      choice2: "This photographer sounds sketchy. Why do you need me there?",
      result2a: "Sketchy? He’s just doing his job. Don’t get all worked up.",
      result2b: "We’ll talk tomorrow. Don’t test me."
    } : {
      choice1: "Я приду, Лина. Всё для тебя.",
      result1a: "Вот это я люблю слышать. Ты быстро учишься.",
      result1b: "Готовься, день будет длинный. Для тебя, по крайней мере.",
      choice2: "Этот фотограф какой-то мутный. Зачем я там нужен?",
      result2a: "Мутный? Он просто делает свою работу. Не накручивай себя.",
      result2b: "Завтра поговорим. Не испытывай меня."
    };
    return [
      {
        id: "obey",
        text: texts.choice1,
        action: (state) => { state.choices.chapter3 = "obey"; },
        result: [
          { type: "received", text: texts.result1a, delay: 1000 },
          { type: "received", text: texts.result1b, delay: 2500, nextChapter: "chapter4" }
        ]
      },
      {
        id: "resist",
        text: texts.choice2,
        action: (state) => { state.choices.chapter3 = "resist"; },
        result: [
          { type: "received", text: texts.result2a, delay: 1000 },
          { type: "received", text: texts.result2b, delay: 2500, nextChapter: "chapter4" }
        ]
      }
    ];
  }
};
