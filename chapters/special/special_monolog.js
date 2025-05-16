export default {
    before() {
      window.game.clearChat();
    },

    getText(gameState) {
        const text = gameState.language === 'en' ? {
            monologue1: "(Lina and Amina are sprawled at a cozy café, lattes steaming. Lina flashes a wicked grin, shoving her phone in Amina’s face with gg’s pic.)",
            monologue2: "(Amina chokes on her latte, cackling.)",
            amina1: "Lina, what the fuck?! It’s like a baby shrimp! Does it even get the job done?",
            monologue3: "(Lina snorts, barely holding it together.)",
            lina1: "Keke, it tries, but girl, I’m starving for a real feast sometimes, you feel me?",
            monologue4: "(Amina smirks, pulling up her phone with a flourish.)",
            amina2: "Oh, honey, then check THIS out, my man’s packing a fucking sledgehammer!",
            monologue5: "(Lina’s eyes pop, her lips parting as she zooms in.)",
            lina2: "Holy shit, Amina, that’s a goddamn beast! Bet it fucks you silly, fuck, I’m wet just looking!",
            monologue6: "(Amina leans in, voice low and teasing.)",
            amina3: "Oh, it does, babe. I’m wrecked for days. Maybe your boy should try being a cuck, keke, let you have some fun with this!",
            monologue7: "(Lina giggles, biting her lip, her cheeks flushed.)",
            lina3: "Keke, I’d cum in seconds with that monster! Wait, for real tho, maybe we should ask him about the cuck thing, lol!",
            monologue8: "(Amina laughs, nudging Lina.)",
            amina4: "Shh, girl, that’s my man! Though, tbh, he’s always whining about wanting a threesome, haha, so maybe he’d be down!",
            imageHero: "./chapters/special/img/hero_penis.jpg",
            imageLaugh: "./chapters/special/img/lina_amina_laugh.jpg",
            imageAminaBf: "./chapters/special/img/amina_bf_penis.jpg",
            imageSurprise: "./chapters/special/img/lina_amina_surprise.jpg"
            msg10: "Lina, why’d you need my dick pic while you’re with Amina? Kinda sus...",
          } : {
            monologue1: "(Лина и Амина вальяжно сидят в уютном кафе, потягивают латте. Лина с хитрой ухмылкой тычет телефоном в лицо Амине, показывая фотку ГГ.)",
            monologue2: "(Амина давится латте, ржёт до слёз.)",
            amina1: "Лина, что за хуйня?! Это ж как креветочка! Он вообще справляется?",
            monologue3: "(Лина фыркает, еле сдерживая смех.)",
            lina1: "Кеке, старается, но, блин, мне иногда хочется нормального банкета, понимаешь?",
            monologue4: "(Амина с ухмылкой достаёт телефон.)",
            amina2: "Ну тогда держи, у моего парня сука кувалда!",
            monologue5: "(Лина ахает, глаза лезут на лоб, зумит фотку.)",
            lina2: "Ебать, Амина, это ж монстр! Наверняка тебя разносит в хлам, я мокрая от одного взгляда!",
            monologue6: "(Амина наклоняется ближе, голос низкий, дразнящий.)",
            amina3: "О да, я потом хромаю неделю. А может твоему в куколды пойти, кекеке, пусть посмотрит, как надо?",
            monologue7: "(Лина ржёт, прикусывая губу, щёки горят.)",
            lina3: "Кеке, я бы кончила за секунды с этим зверем! Слушай, а может реально спросить, не против ли он куколдом стать, ахаха!",
            monologue8: "(Амина хохочет, толкает Лину в плечо.)",
            amina4: "Тише, это мой парень! Хотя блин, он вечно ноет, что хочет ЖМЖ, хаха, так что может и за!",
            imageHero: "./chapters/special/img/hero_penis.jpg",
            imageLaugh: "./chapters/special/img/lina_amina_laugh.jpg",
            imageAminaBf: "./chapters/special/img/amina_bf_penis.jpg",
            imageSurprise: "./chapters/special/img/lina_amina_surprise.jpg"
            msg10: "Лина, зачем тебе фотка моего члена, если ты с Аминой? Как-то стремно...",
          };

          return [
            {
                type: "monolog",
                text: text.monologue1,
                delay:1000,
            },
            {
                type: "photo",
                src: text.imageHero,
                delay:2000,   
            },
            {
              type: "monolog",
              text: text.monologue2,
              delay: 4900,
            },
            {
                type: "sent",
                text: text.amina1,
                delay:5000,
            },
            {
              type: "monolog",
              text: text.monologue3,
              delay: 9900,
            },
            {
                type: "received",
                text: text.lina1,
                delay:10000,
            },
            {
                type: "photo",
                src: './chapters/special/img/Lina_Amina_kek.jpg',
                delay:11000,   
            },
            {
                type: 'monolog',
                text: text.monologue4,
                delay: 14900,
            },
            {
                type: "sent",
                text: text.amina2,
                delay:15000,
            },
            {
                type: "photo",
                photoSent: true,
                src: text.imageAminaBf,
                delay:16000,   
            },
            {
                type: 'monolog',
                text: text.monologue5,
                delay: 19900,
            },
            {
                type: "received",
                text: text.lina2,
                delay:20000,
            },
            {
                type: 'monolog',
                text: text.monologue6,
                delay: 24900,
            },
            {
                type: "sent",
                text: text.amina3,
                delay:25000,
            },
            {
                type: 'monolog',
                text: text.monologue7,
                delay: 29900,
            },
            {
                type: "received",
                text: text.lina3,
                delay:30000,
            },
            {
                type: 'monolog',
                text: text.monologue8,
                delay: 34900,
            },
            {
                type: "sent",
                text: text.amina4,
                delay:35000,
            },
        ];
    },

        getChoices(gameState) {
            return [
                {
                    id: "continue",
                    text: text.msg10,
                    delay:35100,
                    action: (state) => {
                            // Проверяем, какой выбор был сделан ранее
                            const lastChoice = state.choices["special_dick_showoff"];
                    if (lastChoice && lastChoice.choice1) {
                        state.nextChapter = 'special_wait_cute';
                    } else if (lastChoice && lastChoice.choice2) {
                        state.nextChapter = 'special_for_real';
                    } else {
                        state.nextChapter = 'special_wait_cute'; // fallback, если что-то пошло не так
                    }
                }
            }
        ];
    }
}
