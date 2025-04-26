export default {
  getText(gameState) {
    // Подсчёт очков из gameState.choices (как в ArcManager.js)
    let positiveScore = 0;
    let negativeScore = 0;

    // Chapter 1 choices
    if (gameState.choices.chapter_1) {
      if (gameState.choices.chapter_1.compliment) positiveScore++;
      if (gameState.choices.chapter_1.question_decollate) negativeScore++;
    }

    // Chapter 2 choices
    if (gameState.choices.chapter2) {
      if (gameState.choices.chapter2.professional_opinion) positiveScore++;
      if (gameState.choices.chapter2.question_photographer) negativeScore++;
    }

    // Chapter 4 choices
    if (gameState.choices.chapter4_supportive) {
      if (gameState.choices.chapter4_supportive.encourage_modeling) positiveScore++;
      if (gameState.choices.chapter4_supportive.remind_studies) negativeScore++;
    }

    // Chapter 5 choices
    if (gameState.choices.chapter5_support) {
      if (gameState.choices.chapter5_support.agree_to_help) positiveScore += 2;
      if (gameState.choices.chapter5_support.decline_to_help) negativeScore++;
    }

    // Chapter 6 choices
    if (gameState.choices.chapter6_gift || gameState.choices.chapter6_study_together) {
      if (gameState.choices.chapter6_study_together?.study_together) positiveScore++;
      if (gameState.choices.chapter5_gift?.gift_intim || gameState.choices.chapter5_gift?.gift_foot) negativeScore += 2;
    }

    // Базовые сообщения
    const baseMessages = [
      { type: 'received', text: 'Привет, милый! Я вернулась! Фотосессия была просто невероятной… 😏', delay: 1000 },
      { type: 'received', text: 'Там был один парень, Макс, модель. Такой высокий, с потрясающей фигурой… Мы с ним отлично сработались!', delay: 1500 },
      { type: 'received', text: '{photo_name_6} Вот, посмотри, какие кадры получились!', delay: 1000 },
    ];

    // Дополнительные сообщения в зависимости от очков
    if (positiveScore > negativeScore) {
      // Лина более мягкая
      baseMessages.push(
        { type: 'received', text: 'Я скучала по тебе… Ты же не против, что я немного повеселилась? 😘', delay: 1000 }
      );
    } else if (negativeScore > positiveScore) {
      // Лина более доминирующая, усиливает NTR
      baseMessages.push(
        { type: 'received', text: 'Мы с Максом так весело провели время… Ты же не против, правда? 😈', delay: 1000 }
      );
    } else {
      // Нейтральный вариант
      baseMessages.push(
        { type: 'received', text: 'Ты же не против, что мы немного повеселились? 😘', delay: 1000 }
      );
    }

    return baseMessages;
  },

  getChoices(gameState) {
    return [
      {
        id: 'jealous',
        text: 'Это что, ты с ним так близко?!',
        nextChapter: 'arc2_jealous'
      },
      {
        id: 'curious',
        text: 'Выглядит горячо… Расскажи подробнее!',
        nextChapter: 'arc2_curious'
      }
    ];
  }
};