export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "Well, it's so late already. Time to go to sleep! I'm going, and you shouldn't stay up too late either",
            msg2: "Yeaaah, you're right. I'll go to bed soon too"
        } : {
            msg1: "Ладно, уже так поздно. Спать пора! Я пойду, и ты долго не сиди",
            msg2: "Дааа, ты права. Пойду тогда тоже понемногу"
        };

        return [
            {
                type: "received",
                text: texts.msg1,
                delay: 2000
            },
            {
                type: "sent",
                text: texts.msg2,
                delay: 4000
            }
        ];
    },

    getChoices(gameState) {
        // Увеличиваем задержку перед показом оверлея
        setTimeout(() => {
            const texts = gameState.language === 'en' ? {
                title: "First Arc Completed!",
                message: "Your choices have determined your path...",
                thanks: "Thank you for playing!",
                next: "Next"
            } : {
                title: "Первая арка завершена!",
                message: "Ваши выборы определили ваш путь...",
                thanks: "Спасибо за игру!",
                next: "Далее"
            };

            const overlay = document.createElement('div');
            overlay.className = 'arc-completion';
            overlay.style.opacity = '0';
            overlay.innerHTML = `
                <div class="arc-completion-content">
                    <h2>${texts.title}</h2>
                    <p>${texts.message}</p>
                    <p>${texts.thanks}</p>
                    <button class="choice-btn next-btn">${texts.next}</button>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            // Плавное появление оверлея
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);

            // Обработчик кнопки "Далее"
            overlay.querySelector('.next-btn').addEventListener('click', () => {
                overlay.remove();
                window.game.startSecondArc();
            });
        }, 6000); // Увеличенная задержка

        return []; // No choices needed
    }
};