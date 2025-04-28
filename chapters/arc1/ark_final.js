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
                result: [ // Добавляем массив result
                    {
                        type: "system",
                        text: "Загрузка второй арки...",
                        delay: 1000,
                        nextChapter: "arc2_date_monolog"
                    }
                ]
            }
        ];
    }
};