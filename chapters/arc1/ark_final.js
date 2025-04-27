export default {
    getText(gameState) {
        return [
            {
                type: "received",
                text: "Конец первой арки...",
                delay: 2000
            }
        ];
    },
    
    getChoices(gameState) {
        // Вместо прямого вызова startSecondArc, возвращаем правильный nextChapter
        return [
            {
                id: "continue_to_arc2",
                text: "Продолжить...",
                nextChapter: "arc2_date_monolog" // Правильный путь к следующей главе
            }
        ];
    }
};