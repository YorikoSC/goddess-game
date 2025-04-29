import { showOverlay } from '../../js/overlay.js';

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
                nextChoice: "first_reply"
            }
        ];
    },

    getChoicesByKey(key, gameState) {
        const texts = gameState.language === 'en' ? {
            first_reply: {
                text: "Hi! Slept great. How about you?",
                resp1: "Mmm, I'm still impressed by our evening... Especially the dessert 🍰",
                resp2: "By the way, thanks for the restaurant! The sea view was absolutely stunning ✨"
            },
            about_place: {
                text: "Yes, it's a beautiful place indeed. Did you enjoy it? Wasn't it boring?",
                resp1: "Boring? With you? No way! 😊",
                resp2: "Although... did you notice I was a bit distracted?"
            },
            about_phone: {
                text: "Yes, I noticed you were constantly texting someone. And even took your smartphone to the bathroom.",
                resp1: "Oh, are you keeping tabs on me? 😳",
                resp2: "My friend was just texting me... She has problems with her boyfriend and needed advice.",
                resp3: "And going to the bathroom... well, girls sometimes need to fix their makeup, take selfies..."
            },
            about_photo: {
                text: "When you came back from the bathroom, your bra strap was down on your shoulder. As if you were taking some intimate photo.",
                resp1: "What?! Are you seriously accusing me of this?! 😠",
                resp2: "Maybe it just slipped down accidentally! Or I was adjusting my dress!",
                resp3: "I can't believe you don't trust me!"
            },
            calm_down: {
                text: "I'm just saying what I noticed. Don't be angry.",
                resp1: "You know what? I was taking photos of the sea view from the bathroom window! There was an amazing sunset!",
                resp2: "Look, I'll send you the photo right now!",
                system: "*The photo shows the girl in the restaurant bathroom mirror, with a lowered strap, in a seductive pose*",
                resp3: "Oh... wait... wrong photo...",
                resp4: "Damn! Delete that! I didn't mean to send it!"
            },
            about_selfie: {
                text: "Who were you taking this photo for? Clearly not a sea view.",
                resp1: "For you, of course! I wanted to surprise you later... 🙈",
                resp2: "I just didn't want to admit it right away..."
            },
            doubt_about_photo: {
                text: "But you didn't send it to me yesterday. And you weren't planning to now.",
                resp1: "I... I wanted to find the right moment...",
                resp2: "Listen, are you seriously interrogating me right now? 😤"
            },
            change_topic: {
                text: "Let's change the subject. How about meeting this evening?",
                resp1: "Fine, let's change it... But we'll get back to this conversation, sweetie 😏",
                resp2: "Can't tonight, I have... a meetup with friends. Maybe tomorrow?"
            },
            final: {
                text: "Okay, tomorrow then. Text me when you're free.",
                resp: "I will! And... maybe I'll send you a couple more photos... especially for you 💋"
            }
        } : {
            first_reply: {
                text: "Привет! Отлично спалось. А ты как?",
                resp1: "Ммм, я всё ещё под впечатлением от вечера... Особенно от десерта 🍰",
                resp2: "Кстати, спасибо за ресторан! Вид на море был просто потрясающий ✨"
            },
            about_place: {
                text: "Да, место действительно красивое. Тебе понравилось? Не было скучно?",
                resp1: "Скучно? С тобой? Ну что ты! 😊",
                resp2: "Хотя... ты заметил, что я была немного рассеянной?"
            },
            about_phone: {
                text: "Да, я заметил, что ты постоянно с кем-то переписывалась. И даже в туалет со смартфоном ходила.",
                resp1: "Ой, ты следишь за мной? 😳",
                resp2: "Просто подруга писала... У неё проблемы с парнем, нужен был совет.",
                resp3: "А в туалет... ну, девушкам иногда нужно поправить макияж, сделать селфи..."
            },
            about_photo: {
                text: "Когда ты вернулась из туалета, у тебя была спущена бретелька лифчика на плече. Как будто ты делала какую-то интимную фотографию.",
                resp1: "Что?! Ты серьёзно меня в этом обвиняешь?! 😠",
                resp2: "Может, она просто случайно спустилась! Или я поправляла платье!",
                resp3: "Я не могу поверить, что ты мне не доверяешь!"
            },
            calm_down: {
                text: "Я просто говорю, что заметил. Не злись.",
                resp1: "Знаешь что? Я фотографировала морской пейзаж из окна туалета! Там был потрясающий вид на закат!",
                resp2: "Вот, смотри! Сейчас скину тебе это фото!",
                system: "*На фото девушка в зеркале туалета ресторана, с приспущенной бретелькой, в соблазнительной позе*",
                resp3: "Ой... подожди... не то фото...",
                resp4: "Чёрт! Удали это! Я не хотела отправлять!"
            },
            about_selfie: {
                text: "Для кого ты делала это фото? Явно не морской пейзаж.",
                resp1: "Для тебя, конечно! Хотела сделать сюрприз потом... 🙈",
                resp2: "Просто не хотела признаваться сразу..."
            },
            doubt_about_photo: {
                text: "Но ты же не отправила мне его вчера. И сейчас не собиралась.",
                resp1: "Я... я хотела найти подходящий момент...",
                resp2: "Слушай, ты сейчас серьёзно устраиваешь мне допрос? 😤"
            },
            change_topic: {
                text: "Давай сменим тему. Как насчёт того, чтобы встретиться сегодня вечером?",
                resp1: "Ладно, сменим... Но к этому разговору мы ещё вернёмся, сладкий 😏",
                resp2: "Сегодня не могу, у меня... встреча с подругами. Может, завтра?"
            },
            final: {
                text: "Хорошо, завтра. Напиши, когда освободишься.",
                resp: "Обязательно! И... может быть, пришлю тебе ещё пару фото... специально для тебя 💋"
            }
        };

        const dialogStages = {
            "first_reply": {
                text: texts.first_reply.text,
                result: [
                    {
                        type: "received",
                        text: texts.first_reply.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.first_reply.resp2,
                        delay: 2000,
                        nextChoice: "about_place"
                    }
                ]
            },
            "about_place": {
                text: texts.about_place.text,
                result: [
                    {
                        type: "received",
                        text: texts.about_place.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.about_place.resp2,
                        delay: 2000,
                        nextChoice: "about_phone"
                    }
                ]
            },
            "about_phone": {
                text: texts.about_phone.text,
                result: [
                    {
                        type: "received",
                        text: texts.about_phone.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.about_phone.resp2,
                        delay: 2000
                    },
                    {
                        type: "received",
                        text: texts.about_phone.resp3,
                        delay: 3000,
                        nextChoice: "about_photo"
                    }
                ]
            },
            "about_photo": {
                text: texts.about_photo.text,
                result: [
                    {
                        type: "received",
                        text: texts.about_photo.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.about_photo.resp2,
                        delay: 2000
                    },
                    {
                        type: "received",
                        text: texts.about_photo.resp3,
                        delay: 3000,
                        nextChoice: "calm_down"
                    }
                ]
            },
            "calm_down": {
                text: texts.calm_down.text,
                result: [
                    {
                        type: "received",
                        text: texts.calm_down.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.calm_down.resp2,
                        delay: 2000
                    },
                    {
                        type: "system",
                        text: texts.calm_down.system,
                        image: "./img/chat/date_selfie.jpg",
                        delay: 3000
                    },
                    {
                        type: "received",
                        text: texts.calm_down.resp3,
                        delay: 4000
                    },
                    {
                        type: "received",
                        text: texts.calm_down.resp4,
                        delay: 5000,
                        nextChoice: "about_selfie"
                    }
                ]
            },
            "about_selfie": {
                text: texts.about_selfie.text,
                result: [
                    {
                        type: "received",
                        text: texts.about_selfie.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.about_selfie.resp2,
                        delay: 2000,
                        nextChoice: "doubt_about_photo"
                    }
                ]
            },
            "doubt_about_photo": {
                text: texts.doubt_about_photo.text,
                result: [
                    {
                        type: "received",
                        text: texts.doubt_about_photo.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.doubt_about_photo.resp2,
                        delay: 2000,
                        nextChoice: "change_topic"
                    }
                ]
            },
            "change_topic": {
                text: texts.change_topic.text,
                result: [
                    {
                        type: "received",
                        text: texts.change_topic.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.change_topic.resp2,
                        delay: 2000,
                        nextChoice: "final"
                    }
                ]
            },
            "final": {
                text: texts.final.text,
                result: [
                    {
                        type: "received",
                        text: texts.final.resp,
                        delay: 1000,
                        nextChapter: "arc2_next_chapter"
                    }
                ]
            }
        };

        return [
            {
                text: dialogStages[key].text,
                result: dialogStages[key].result
            }
        ];
    }
};