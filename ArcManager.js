// ArcManager.js

// Функция для определения завершения арки и начала второй
export function determineSecondArcStart(gameState) {
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
  if (gameState.choices.chapter5_gift || gameState.choices.chapter6_study_together) {
    if (gameState.choices.chapter6_study_together?.study_together) positiveScore++;
    if (gameState.choices.chapter5_gift?.gift_intim || gameState.choices.chapter5_gift?.gift_foot) negativeScore += 2;
  }

  // Определяем завершение арки
  if (gameState.currentChapter === 'warm_good_night' || 
      gameState.currentChapter === 'ark_final') {
    return true;
  }

  return false;
}

// Сохранение состояния игры
export function saveGameState(gameState) {
  try {
    localStorage.setItem('storyGameSave', JSON.stringify(gameState));
    return true;
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    return false;
  }
}

// Загрузка состояния игры
export function loadGameState() {
  try {
    const savedState = localStorage.getItem('storyGameSave');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return null;
  }
}