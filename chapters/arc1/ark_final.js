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
        return [
            {
                id: "continue_to_arc2",
                text: "Продолжить...",
                result: [
                    {
                        type: "system",
                        text: "Сохранение прогресса...",
                        delay: 1000
                    },
                    {
                        type: "system",
                        text: "Загрузка второй арки...",
                        delay: 1000,
                        nextChapter: "arc2_date_monolog",
                        onDisplay: function() {
                            
                            gameState.arc = 2; 
                            saveArcProgress();
                            saveGameState(gameState); 
                            console.log("Игра сохранена в конце арки 1");
                        }
                    }
                ]
            }
        ];
    }
};