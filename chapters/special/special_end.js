export default {
    getText(gameState) {
        const texts = gameState.language === 'en' ? {
            msg1: "The dream fades... You wake up feeling strange.",
            btn: "Return to reality"
        } : {
            msg1: "Сон рассеивается... Ты просыпаешься с необычным чувством.",
            btn: "Вернуться в реальность"
        };

        let next;
        if (gameState.choices['chapter6_misunderstanding']) {
            next = "hanger_1/hanger1";
        } else if (gameState.choices['chapter6_photoshoot']) {
            next = "hanger_2/hanger2";
        } else if (gameState.choices['chapter6_theme']) {
            next = "hanger_3/hanger3";
        } else if (gameState.choices['chapter5_protective']) {
            next = "hanger_4/hanger4";
        } else if (gameState.choices['chapter5_support']) {
            next = "hanger_5/hanger5";
        } else if (gameState.choices['chapter6_study_together']) {
            next = "hanger_6/hanger6";
        } else if (gameState.choices['chapter6_gift_foot']) {
            next = "hanger_7/hanger7";
        } else if (gameState.choices['chapter6_gift_intim']) {
            next = "hanger_8/hanger8";
        } else if (gameState.choices['chapter6_date_plan']) {
            next = "after_date/arc2_after_date";
        }

        return [
            {
                type: "monolog-placeholder",
                content: texts.msg1,
                buttonText: texts.btn,
                nextChapter: next
            }
        ];
    }
}