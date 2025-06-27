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
                id: "continue_to_special",
                text: "Продолжить...",
                action: (state) => {
                    state.arc = 2;
                    window.game.clearChat();
                },
                result: [
                    {
                        type: "system",
                        text: "Загрузка спешала...",
                        delay: 1000,
                        nextChapter: "special_start"
                    }
                ]
            }
        ];
    }
};