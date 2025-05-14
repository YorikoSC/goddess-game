import { showOverlay } from '../../../js/overlay.js';

export default {
    getText(gameState) {
        setTimeout(() => {
            const text = gameState.language === 'en' ? 
                'The day after the date' : 
                'На следующий день после свидания';
            showOverlay(text, 3000);
        }, 100);

        const texts = gameState.language === 'en' ? {
            msg1: "Good morning, sweetie! 💋 How did you sleep after yesterday?"
        } : {
            msg1: "Доброе утро, сладкий! 💋 Как спалось после вчерашнего?"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 1000,
                showChoices: true
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Hi! Slept great. How about you?",
            result1a: "Mmm, I'm still impressed by our evening... Especially the dessert 🍰",
            result1b: "By the way, thanks for the restaurant! The sea view was absolutely stunning ✨",
            nextChapter: "after_date/arc2_after_date_place" // Правильный путь
        } : {
            choice1: "Привет! Отлично спалось. А ты как?",
            result1a: "Ммм, я всё ещё под впечатлением от вечера... Особенно от десерта 🍰",
            result1b: "Кстати, спасибо за ресторан! Вид на море был просто потрясающий ✨",
            nextChapter: "after_date/arc2_after_date_place" // Правильный путь
        };

        return [
            {
                id: "first_reply",
                text: texts.choice1,
                result: [
                    {
                        type: "received",
                        text: texts.result1a,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.result1b,
                        delay: 2000,
                        nextChapter: texts.nextChapter
                    }
                ]
            }
        ];
    }
};