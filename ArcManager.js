// ArcManager.js

// Функция для определения завершения арки и начала второй
export function determineSecondArcStart(gameState) {
    if (gameState.currentChapter === 'warm_good_night' && 
        gameState.previousChapter === 'chapter6_date_plan') {
        console.log('Starting second arc...'); // Добавим лог для отладки
        return 'arc2_date_monolog';
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