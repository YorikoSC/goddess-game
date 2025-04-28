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
                delay: 1000
            }
        ];
    },

    getChoices(gameState) {
        const texts = gameState.language === 'en' ? {
            choice1: "Hi! Slept great. How about you?",
            resp1: "Mmm, I'm still impressed by our evening... Especially the dessert 🍰",
            resp2: "By the way, thanks for the restaurant! The sea view was absolutely stunning ✨"
        } : {
            choice1: "Привет! Отлично спалось. А ты как?",
            resp1: "Ммм, я всё ещё под впечатлением от вечера... Особенно от десерта 🍰",
            resp2: "Кстати, спасибо за ресторан! Вид на море был просто потрясающий ✨"
        };

        return [
            {
                text: texts.choice1,
                result: [
                    {
                        type: "received",
                        text: texts.resp1,
                        delay: 1000
                    },
                    {
                        type: "received",
                        text: texts.resp2,
                        delay: 2000,
                        nextChoice: "about_place"
                    }
                ]
            }
        ];
    },

    getChoicesByKey(key, gameState) {
        const texts = gameState.language === 'en' ? {
            // English texts
            place_text: "Yes, it's a beautiful place indeed. Did you enjoy it? Wasn't it boring?",
            place_resp1: "Boring? With you? No way! 😊",
            place_resp2: "Although... did you notice I was a bit distracted?",
            
            phone_text: "Yes, I noticed you were constantly texting someone. And even took your smartphone to the bathroom.",
            phone_resp1: "Oh, are you keeping tabs on me? 😳",
            phone_resp2: "My friend was just texting me... She has problems with her boyfriend and needed advice.",
            phone_resp3: "And going to the bathroom... well, girls sometimes need to fix their makeup, take selfies...",
            
            photo_text: "When you came back from the bathroom, your bra strap was down on your shoulder. As if you were taking some intimate photo.",
            photo_resp1: "What?! Are you seriously accusing me of this?! 😠",
            photo_resp2: "Maybe it just slipped down accidentally! Or I was adjusting my dress!",
            photo_resp3: "I can't believe you don't trust me!",
            
            calm_text: "I'm just saying what I noticed. Don't be angry.",
            calm_resp1: "You know what? I was taking photos of the sea view from the bathroom window! There was an amazing sunset!",
            calm_resp2: "Look, I'll send you the photo right now!",
            calm_system: "*The photo shows the girl in the restaurant bathroom mirror, with a lowered strap, in a seductive pose*",
            calm_resp3: "Oh... wait... wrong photo...",
            calm_resp4: "Damn! Delete that! I didn't mean to send it!",
            
            selfie_text: "Who were you taking this photo for? Clearly not a sea view.",
            selfie_resp1: "For you, of course! I wanted to surprise you later... 🙈",
            selfie_resp2: "I just didn't want to admit it right away...",
            
            doubt_text: "But you didn't send it to me yesterday. And you weren't planning to now.",
            doubt_resp1: "I... I wanted to find the right moment...",
            doubt_resp2: "Listen, are you seriously interrogating me right now? 😤",
            
            topic_text: "Let's change the subject. How about meeting this evening?",
            topic_resp1: "Fine, let's change it... But we'll get back to this conversation, sweetie 😏",
            topic_resp2: "Can't tonight, I have... a meetup with friends. Maybe tomorrow?",
            
            final_text: "Okay, tomorrow then. Text me when you're free.",
            final_resp: "I will! And... maybe I'll send you a couple more photos... especially for you 💋"
        } : {
            // Russian texts
            place_text: "Да, место действительно красивое. Тебе понравилось? Не было скучно?",
            place_resp1: "Скучно? С тобой? Ну что ты! 😊",
            place_resp2: "Хотя... ты заметил, что я была немного рассеянной?",
            
            phone_text: "Да, я заметил, что ты постоянно с кем-то переписывалась. И даже в туалет со смартфоном ходила.",
            phone_resp1: "Ой, ты следишь за мной? 😳",
            phone_resp2: "Просто подруга писала... У неё проблемы с парнем, нужен был совет.",
            phone_resp3: "А в туалет... ну, девушкам иногда нужно поправить макияж, сделать селфи...",
            
            photo_text: "Когда ты вернулась из туалета, у тебя была спущена бретелька лифчика на плече. Как будто ты делала какую-то интимную фотографию.",
            photo_resp1: "Что?! Ты серьёзно меня в этом обвиняешь?! 😠",
            photo_resp2: "Может, она просто случайно спустилась! Или я поправляла платье!",
            photo_resp3: "Я не могу поверить, что ты мне не доверяешь!",
            
            calm_text: "Я просто говорю, что заметил. Не злись.",
            calm_resp1: "Знаешь что? Я фотографировала морской пейзаж из окна туалета! Там был потрясающий вид на закат!",
            calm_resp2: "Вот, смотри! Сейчас скину тебе это фото!",
            calm_system: "*На фото девушка в зеркале туалета ресторана, с приспущенной бретелькой, в соблазнительной позе*",
            calm_resp3: "Ой... подожди... не то фото...",
            calm_resp4: "Чёрт! Удали это! Я не хотела отправлять!",
            
            selfie_text: "Для кого ты делала это фото? Явно не морской пейзаж.",
            selfie_resp1: "Для тебя, конечно! Хотела сделать сюрприз потом... 🙈",
            selfie_resp2: "Просто не хотела признаваться сразу...",
            
            doubt_text: "Но ты же не отправила мне его вчера. И сейчас не собиралась.",
            doubt_resp1: "Я... я хотела найти подходящий момент...",
            doubt_resp2: "Слушай, ты сейчас серьёзно устраиваешь мне допрос? 😤",
            
            topic_text: "Давай сменим тему. Как насчёт того, чтобы встретиться сегодня вечером?",
            topic_resp1: "Ладно, сменим... Но к этому разговору мы ещё вернёмся, сладкий 😏",
            topic_resp2: "Сегодня не могу, у меня... встреча с подругами. Может, завтра?",
            
            final_text: "Хорошо, завтра. Напиши, когда освободишься.",
            final_resp: "Обязательно! И... может быть, пришлю тебе ещё пару фото... специально для тебя 💋"
        };

        const choices = {
            "about_place": [
                {
                    text: texts.place_text,
                    result: [
                        {
                            type: "received",
                            text: texts.place_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.place_resp2,
                            delay: 2000,
                            nextChoice: "about_phone"
                        }
                    ]
                }
            ],
            "about_phone": [
                {
                    text: texts.phone_text,
                    result: [
                        {
                            type: "received",
                            text: texts.phone_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.phone_resp2,
                            delay: 2000
                        },
                        {
                            type: "received",
                            text: texts.phone_resp3,
                            delay: 3000,
                            nextChoice: "about_photo"
                        }
                    ]
                }
            ],
            "about_photo": [
                {
                    text: texts.photo_text,
                    result: [
                        {
                            type: "received",
                            text: texts.photo_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.photo_resp2,
                            delay: 2000
                        },
                        {
                            type: "received",
                            text: texts.photo_resp3,
                            delay: 3000,
                            nextChoice: "calm_down"
                        }
                    ]
                }
            ],
            "calm_down": [
                {
                    text: texts.calm_text,
                    result: [
                        {
                            type: "received",
                            text: texts.calm_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.calm_resp2,
                            delay: 2000
                        },
                        {
                            type: "system",
                            text: texts.calm_system,
                            image: "./img/chat/date_selfie.jpg",
                            delay: 3000
                        },
                        {
                            type: "received",
                            text: texts.calm_resp3,
                            delay: 4000
                        },
                        {
                            type: "received",
                            text: texts.calm_resp4,
                            delay: 5000,
                            nextChoice: "about_selfie"
                        }
                    ]
                }
            ],
            "about_selfie": [
                {
                    text: texts.selfie_text,
                    result: [
                        {
                            type: "received",
                            text: texts.selfie_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.selfie_resp2,
                            delay: 2000,
                            nextChoice: "doubt_about_photo"
                        }
                    ]
                }
            ],
            "doubt_about_photo": [
                {
                    text: texts.doubt_text,
                    result: [
                        {
                            type: "received",
                            text: texts.doubt_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.doubt_resp2,
                            delay: 2000,
                            nextChoice: "change_topic"
                        }
                    ]
                }
            ],
            "change_topic": [
                {
                    text: texts.topic_text,
                    result: [
                        {
                            type: "received",
                            text: texts.topic_resp1,
                            delay: 1000
                        },
                        {
                            type: "received",
                            text: texts.topic_resp2,
                            delay: 2000,
                            nextChoice: "final"
                        }
                    ]
                }
            ],
            "final": [
                {
                    text: texts.final_text,
                    result: [
                        {
                            type: "received",
                            text: texts.final_resp,
                            delay: 1000,
                            nextChapter: "arc2_next_chapter"
                        }
                    ]
                }
            ]
        };

        return choices[key] || [];
    }
};