export default {
  getText(gameState) {
    const texts = gameState.language === 'en' ? {
      msg1: "Yo babe!  Off to a café with my girl Amina. Don’t cry without your queen, yeah? 😉",
      msg2: "Cool, Lina, have fun. Stay safe!",
      msg3: "Oh, I’m gonna have a blast, don’t sweat it! But first, be a good boy and send me a pic of your lil buddy. Gotta see it! 😏",
      msg4: "Uh, okay... [sends photo, showing a small penis]"
    } : {
      msg1: "Привет, милый! Я сегодня в кафешку с Аминой. Только не плачь",
      msg2: "Окей, зайк)",
      msg3: "Эм.. Слушай, а можешь показать свой член? Пожа-а-алуйста!",
      msg4: "Эм, ну ладно... [отправляет фото, показывающее маленький пенис]"
    };

    return [
      {
        type: "received",
        text: texts.msg1,
        delay: 1000
      },
      {
        type: "sent",
        text: texts.msg2,
        delay: 2500
      },
      {
        type: "received",
        text: texts.msg3,
        delay: 4000
      },
      {
        type: "sent",
        text: texts.msg4,
        delay: 5500
      }
    ];
  },

  getChoices(gameState) {
    const texts = gameState.language === 'en' ? {
      msg5: "OMG, look at this! Your lil guy is so cute, like a tiny shrimp! 😄",
      msg6: "Wait, cute?! Lina, that’s not what I was going for!",
      msg7: "Chill, babe, don’t get your panties in a twist! It’s my fave little toy, okay? Just messin with ya, my sweet boy! 😘",
      msg8: "Damn, it’s really a mini, huh? But I’m cool with it, size ain’t everything! 😏",
      msg9: "Whoa, for real? Didn’t expect that...",
      msg10: "Lina, why’d you need my dick pic while you’re with Amina? Kinda sus...",
      msg11: "Lol, just a vibe check, silly! Wanted to sneak a peek at my man’s goods over latte! 😜",
      msg12: "Nah, for real, what’s the deal?",
      msg13: "Ugh, fine, you got me! We were comparing our guys’ dicks, happy now? 😂",
      msg14: "Comparing?! Are you serious? What did Amina say about mine?",
      msg15: "She was dying, said it’s tiny but adorable. But hers? Fuck, her guy’s packing a cannon! We lost it! 😈",
      msg16: "A cannon? So it’s that much bigger?",
      msg17: "Oh yeah, massive! She’s like, Lina, swap him for this beast! Kidding, obvs, you’re my lil champ! 😉",
      msg18: "Swap me? That’s not cool, Lina...",
      msg19: "Oh, don’t be a drama queen! Just girl talk, keke. You’re still my fave, even with that baby dick! 😏",
      msg20: "Okay, I’ll drop it. Have fun at the café.",
      msg21: "Aww, you’re the best! Nighty-night, my cutie! 😘",
      msg22: "This is messed up... I don’t know how to feel about this.",
      msg23: "Babe, relax, it’s just us being dumb. You know I’m yours, tiny or not. Sleep tight! 😜",
      msg24: "Wait, you showed Amina my dick pic? That’s fucked up! What else did you say?",
      msg25: "Chill, dude, it’s not that deep! We just had a laugh, keke. She said it’s cute, but I told her I love my lil shrimp anyway! 😏",
      msg26: "Not that deep?! You’re showing my dick to your friend! What the hell, Lina?",
      msg27: "Okay, okay, sorry, babe! We got carried away. But real talk, Amina’s guy’s dick is insane, and we were joking about how you’d react seeing it! 😈",
      msg28: "React? What do you mean? You think I’d be okay with this?",
      msg29: "Well, keke, we thought maybe you’d get off on it! Amina was like, maybe he’s into that cuck shit! But I told her you’re still my number one, shrimp or not! 😘",
      msg30: "Cuck shit?! Are you for real right now? I can’t believe you’d even go there...",
      msg31: "Babe, don’t be mad! It’s just a dumb joke, keke. But if you’re into it, I wouldn’t judge... maybe we could spice things up? 😏",
      msg32: "I... I need to think about this. This is too much right now.",
      msg33: "Okay, take your time, my lil shrimp! I’ll be here if you wanna talk... or try something new, keke! Nighty-night! 😘",
      msg34: "Fuck this, I’m done. Don’t talk to me tonight.",
      msg35: "Whoa, babe, chill! Okay, I’ll back off. Sleep it off, we’ll talk later, k? 😔",
      msg36: "Alright, I guess I can handle it. Let’s talk more tomorrow.",
      msg37: "Yay, my sweet boy! Love that vibe. Chat tomorrow, sleep tight! 😘",
      resultEnd: "Whatever, enjoy your café... I’m out for now. Night."
    } : {
      msg5: "Боже, глянь на это! Твой малыш такой милый, прям как креветочка! 😄",
      msg6: "Погоди, милый?! Лина, это не то, что я хотел услышать!",
      msg7: "Да ладно, не мурчи! Он мой любимый игрушечный малыш, ясно? Просто шучу, мой сладкий мальчик! ",
      msg8: "Но серьёзно, он реально кроха. Но размер не главное!",
      msg9: "Ну...Я всё равно чувствую себя теперь неуверенно",
      msg10: "Лина, зачем тебе фотка моего члена, если ты с Аминой? Как-то стремно...",
      msg11: "Просто захотела глянуть на богатство своего парня за латте! 😜",
      msg12: "Нет, серьёзно, в чём дело?",
      msg13: "Уф, ладно, спалил! Мы сравнивали члены наших парней, доволен? 😂",
      msg14: "Сравнивали?! Ты гонишь! И что Амина сказала про мой?",
      msg15: "Она угорала, сказала, что он крошечный, но милый. А её? Сука, у её парня просто конский хер",
      msg16: "Конский? То есть он намного больше?",
      msg17: "Огромный! Она такая Лина меняй своего на крупный калибр! Шутка, ясное дело, ты мой маленький чемпион!",
      msg18: "Менять меня? Это не прикол, Лина...",
      msg19: "Да не ной, не будь такой истеричкой! Просто девчачьи тёрки, кек. Ты всё равно номер один для меня, с маленьким хуем или без! ",
      msg20: "Ладно, проехали. Веселись в кафе.",
      msg21: "Спасибо, милый! Ты топ! Споки-споки! 😘",
      msg22: "Это пиздец... Я хз, что с этим делать.",
      msg23: "Милый, расслабься, это просто мы дурачились. Ты же знаешь, я твоя, маленький или нет. Спи сладко! 😜",
      msg24: "Погоди, ты Амине мой член показала? Это вообще пиздец! Что ты ещё наговорила?",
      msg25: "Да успокойся, не мурчи! Мы просто поржали. Она сказала, что он милый, а я такая типа всё равно люблю свою креветочку! ",
      msg26: "Не мурчи?! Ты фотку моего члена подруге показала! Ты серьёзно, Лина?",
      msg27: "Окей, окей, сорри, милый! Мы заигрались. Но если честно, у Амины парень с таким хером, что мы начали ржать и думать, как бы ты отреагировал, если б увидел! ",
      msg28: "Отреагировал? В смысле? Ты думаешь, мне бы это понравилось?",
      msg29: "Ну кек, мы подумали, может, тебе бы зашло! Амина такая - а вдруг он в куколды хочет? ",
      msg30: "В куколды?! Ты сейчас серьёзно? Я в шоке, что ты такое вообще сказала... Она ж всем разболтает про это..",
      msg31: "Милый, не злись! Это просто прикол. Но если тебе интересно, я была бы не против...попробовать что-то новое в постели.. или кого-то",
      msg32: "Я... мне надо подумать. Это слишком для меня сейчас.",
      msg33: "Окей, думай, моя креветочка! Я тут, если захочешь поболтать... или попробовать что-то новенькое, кек! Споки-споки! 😘",
      msg34: "Пиздец.",
      msg35: "Да ладно тебе",
      msg36: "Ладно, справлюсь. Давай завтра обсудим.",
      msg37: "Классный настрой!",
      resultEnd: "не уверен.."
    };

    const linaMonologue = gameState.language === 'en' ? {
      monologue1: "(Lina and Amina are sprawled at a cozy café, lattes steaming. Lina flashes a wicked grin, shoving her phone in Amina’s face with gg’s pic.)",
      monologue2: "(Amina chokes on her latte, cackling.) ‘Lina, what the fuck?! It’s like a baby shrimp! Does it even get the job done?’",
      monologue3: "(Lina snorts, barely holding it together.) ‘Keke, it tries, but girl, I’m starving for a real feast sometimes, you feel me?’",
      monologue4: "(Amina smirks, pulling up her phone with a flourish.) ‘Oh, honey, then check THIS out, my man’s packing a fucking sledgehammer!’",
      monologue5: "(Lina’s eyes pop, her lips parting as she zooms in.) ‘Holy shit, Amina, that’s a goddamn beast! Bet it fucks you silly, fuck, I’m wet just looking!’",
      monologue6: "(Amina leans in, voice low and teasing.) ‘Oh, it does, babe. I’m wrecked for days. Maybe your boy should try being a cuck, keke, let you have some fun with this!’",
      monologue7: "(Lina giggles, biting her lip, her cheeks flushed.) ‘Keke, I’d cum in seconds with that monster! Wait, for real tho, maybe we should ask him about the cuck thing, lol!’",
      monologue8: "(Amina laughs, nudging Lina.) ‘Shh, girl, that’s my man! Though, tbh, he’s always whining about wanting a threesome, haha, so maybe he’d be down!’",
      imageHero: "img/special/hero_penis.jpg",
      imageLaugh: "img/special/lina_amina_laugh.jpg",
      imageAminaBf: "img/special/amina_boyfriend_penis.jpg",
      imageSurprise: "img/special/lina_amina_surprise.jpg"
    } : {
      monologue1: "(Лина и Амина вальяжно сидят в уютном кафе, потягивают латте. Лина с хитрой ухмылкой тычет телефоном в лицо Амине, показывая фотку ГГ.)",
      monologue2: "(Амина давится латте, ржёт до слёз.) ‘Лина, что за хуйня?! Это ж как креветочка! Он вообще справляется?’",
      monologue3: "(Лина фыркает, еле сдерживая смех.) ‘Кеке, старается, но, блин, мне иногда хочется нормального банкета, понимаешь?’",
      monologue4: "(Амина с ухмылкой достаёт телефон.) ‘Ну тогда держи, у моего парня сука кувалда!’",
      monologue5: "(Лина ахает, глаза лезут на лоб, зумит фотку.) ‘Ебать, Амина, это ж монстр! Наверняка тебя разносит в хлам, я мокрая от одного взгляда!’",
      monologue6: "(Амина наклоняется ближе, голос низкий, дразнящий.) ‘О да, я потом хромаю неделю. А может твоему в куколды пойти, кекеке, пусть посмотрит, как надо?’",
      monologue7: "(Лина ржёт, прикусывая губу, щёки горят.) ‘Кеке, я бы кончила за секунды с этим зверем! Слушай, а может реально спросить, не против ли он куколдом стать, ахаха!’",
      monologue8: "(Амина хохочет, толкает Лину в плечо.) ‘Тише, это мой парень! Хотя блин, он вечно ноет, что хочет ЖМЖ, хаха, так что может и за!’",
      imageHero: "img/special/hero_penis.jpg",
      imageLaugh: "img/special/lina_amina_laugh.jpg",
      imageAminaBf: "img/special/amina_boyfriend_penis.jpg",
      imageSurprise: "img/special/lina_amina_surprise.jpg"
    };

    return [
      {
        id: "initial_reaction",
        type: "received",
        text: texts.msg5,
        delay: 7000
      },
      {
        id: "player_reaction",
        type: "choice",
        text: [texts.msg6, texts.msg9],
        result: [
          {
            type: "branch",
            condition: "msg6",
            sequence: [
              {
                type: "received",
                text: texts.msg7,
                delay: 8500
              },
              {
                type: "monologue",
                text: linaMonologue.monologue1,
                delay: 10000,
                image: linaMonologue.imageHero
              },
              {
                type: "monologue",
                text: linaMonologue.monologue2,
                delay: 11500,
                image: linaMonologue.imageLaugh
              },
              {
                type: "monologue",
                text: linaMonologue.monologue3,
                delay: 13000
              },
              {
                type: "monologue",
                text: linaMonologue.monologue4,
                delay: 14500,
                image: linaMonologue.imageAminaBf
              },
              {
                type: "monologue",
                text: linaMonologue.monologue5,
                delay: 16000,
                image: linaMonologue.imageSurprise
              },
              {
                type: "monologue",
                text: linaMonologue.monologue6,
                delay: 17500
              },
              {
                type: "monologue",
                text: linaMonologue.monologue7,
                delay: 19000
              },
              {
                type: "monologue",
                text: linaMonologue.monologue8,
                delay: 20500
              },
              {
                type: "sent",
                text: texts.msg10,
                delay: 22000
              },
              {
                type: "received",
                text: texts.msg11,
                delay: 23500
              },
              {
                id: "dialogue_choice",
                type: "choice",
                text: [
                  texts.msg12,
                  texts.msg20,
                  texts.msg34
                ],
                result: [
                  {
                    type: "branch",
                    condition: "msg12",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg13,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.msg14,
                        delay: 26500
                      },
                      {
                        type: "received",
                        text: texts.msg15,
                        delay: 28000
                      },
                      {
                        type: "sent",
                        text: texts.msg16,
                        delay: 29500
                      },
                      {
                        type: "received",
                        text: texts.msg17,
                        delay: 31000
                      },
                      {
                        type: "sent",
                        text: texts.msg18,
                        delay: 32500
                      },
                      {
                        type: "received",
                        text: texts.msg19,
                        delay: 34000
                      },
                      {
                        type: "sent",
                        text: texts.msg22,
                        delay: 35500
                      },
                      {
                        type: "received",
                        text: texts.msg23,
                        delay: 37000
                      },
                      {
                        type: "sent",
                        text: texts.msg24,
                        delay: 38500
                      },
                      {
                        type: "received",
                        text: texts.msg25,
                        delay: 40000
                      },
                      {
                        type: "sent",
                        text: texts.msg26,
                        delay: 41500
                      },
                      {
                        type: "received",
                        text: texts.msg27,
                        delay: 43000
                      },
                      {
                        type: "sent",
                        text: texts.msg28,
                        delay: 44500
                      },
                      {
                        type: "received",
                        text: texts.msg29,
                        delay: 46000
                      },
                      {
                        type: "sent",
                        text: texts.msg30,
                        delay: 47500
                      },
                      {
                        type: "received",
                        text: texts.msg31,
                        delay: 49000
                      },
                      {
                        id: "further_choice",
                        type: "choice",
                        text: [
                          texts.msg32,
                          texts.msg36
                        ],
                        result: [
                          {
                            type: "branch",
                            condition: "msg32",
                            sequence: [
                              {
                                type: "sent",
                                text: texts.msg32,
                                delay: 50500
                              },
                              {
                                type: "received",
                                text: texts.msg33,
                                delay: 52000
                              },
                              {
                                type: "sent",
                                text: texts.resultEnd,
                                delay: 53500
                              }
                            ]
                          },
                          {
                            type: "branch",
                            condition: "msg36",
                            sequence: [
                              {
                                type: "sent",
                                text: texts.msg36,
                                delay: 50500
                              },
                              {
                                type: "received",
                                text: texts.msg37,
                                delay: 52000
                              },
                              {
                                type: "sent",
                                text: texts.resultEnd,
                                delay: 53500
                              }
                            ]
                          }
                        ],
                        nextChapter: "arc_special_end"
                      }
                    ]
                  },
                  {
                    type: "branch",
                    condition: "msg20",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg21,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.resultEnd,
                        delay: 26500
                      }
                    ]
                  },
                  {
                    type: "branch",
                    condition: "msg34",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg35,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.resultEnd,
                        delay: 26500
                      }
                    ]
                  }
                ],
                nextChapter: "arc_special_end"
              }
            ]
          },
          {
            type: "branch",
            condition: "msg9",
            sequence: [
              {
                type: "received",
                text: texts.msg8,
                delay: 8500
              },
              {
                type: "monologue",
                text: linaMonologue.monologue1,
                delay: 10000,
                image: linaMonologue.imageHero
              },
              {
                type: "monologue",
                text: linaMonologue.monologue2,
                delay: 11500,
                image: linaMonologue.imageLaugh
              },
              {
                type: "monologue",
                text: linaMonologue.monologue3,
                delay: 13000
              },
              {
                type: "monologue",
                text: linaMonologue.monologue4,
                delay: 14500,
                image: linaMonologue.imageAminaBf
              },
              {
                type: "monologue",
                text: linaMonologue.monologue5,
                delay: 16000,
                image: linaMonologue.imageSurprise
              },
              {
                type: "monologue",
                text: linaMonologue.monologue6,
                delay: 17500
              },
              {
                type: "monologue",
                text: linaMonologue.monologue7,
                delay: 19000
              },
              {
                type: "monologue",
                text: linaMonologue.monologue8,
                delay: 20500
              },
              {
                type: "sent",
                text: texts.msg10,
                delay: 22000
              },
              {
                type: "received",
                text: texts.msg11,
                delay: 23500
              },
              {
                id: "dialogue_choice",
                type: "choice",
                text: [
                  texts.msg12,
                  texts.msg20,
                  texts.msg34
                ],
                result: [
                  {
                    type: "branch",
                    condition: "msg12",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg13,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.msg14,
                        delay: 26500
                      },
                      {
                        type: "received",
                        text: texts.msg15,
                        delay: 28000
                      },
                      {
                        type: "sent",
                        text: texts.msg16,
                        delay: 29500
                      },
                      {
                        type: "received",
                        text: texts.msg17,
                        delay: 31000
                      },
                      {
                        type: "sent",
                        text: texts.msg18,
                        delay: 32500
                      },
                      {
                        type: "received",
                        text: texts.msg19,
                        delay: 34000
                      },
                      {
                        type: "sent",
                        text: texts.msg22,
                        delay: 35500
                      },
                      {
                        type: "received",
                        text: texts.msg23,
                        delay: 37000
                      },
                      {
                        type: "sent",
                        text: texts.msg24,
                        delay: 38500
                      },
                      {
                        type: "received",
                        text: texts.msg25,
                        delay: 40000
                      },
                      {
                        type: "sent",
                        text: texts.msg26,
                        delay: 41500
                      },
                      {
                        type: "received",
                        text: texts.msg27,
                        delay: 43000
                      },
                      {
                        type: "sent",
                        text: texts.msg28,
                        delay: 44500
                      },
                      {
                        type: "received",
                        text: texts.msg29,
                        delay: 46000
                      },
                      {
                        type: "sent",
                        text: texts.msg30,
                        delay: 47500
                      },
                      {
                        type: "received",
                        text: texts.msg31,
                        delay: 49000
                      },
                      {
                        id: "further_choice",
                        type: "choice",
                        text: [
                          texts.msg32,
                          texts.msg36
                        ],
                        result: [
                          {
                            type: "branch",
                            condition: "msg32",
                            sequence: [
                              {
                                type: "sent",
                                text: texts.msg32,
                                delay: 50500
                              },
                              {
                                type: "received",
                                text: texts.msg33,
                                delay: 52000
                              },
                              {
                                type: "sent",
                                text: texts.resultEnd,
                                delay: 53500
                              }
                            ]
                          },
                          {
                            type: "branch",
                            condition: "msg36",
                            sequence: [
                              {
                                type: "sent",
                                text: texts.msg36,
                                delay: 50500
                              },
                              {
                                type: "received",
                                text: texts.msg37,
                                delay: 52000
                              },
                              {
                                type: "sent",
                                text: texts.resultEnd,
                                delay: 53500
                              }
                            ]
                          }
                        ],
                        nextChapter: "arc_special_end"
                      }
                    ]
                  },
                  {
                    type: "branch",
                    condition: "msg20",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg21,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.resultEnd,
                        delay: 26500
                      }
                    ]
                  },
                  {
                    type: "branch",
                    condition: "msg34",
                    sequence: [
                      {
                        type: "received",
                        text: texts.msg35,
                        delay: 25000
                      },
                      {
                        type: "sent",
                        text: texts.resultEnd,
                        delay: 26500
                      }
                    ]
                  }
                ],
                nextChapter: "arc_special_end"
              }
            ]
          }
        ],
        nextChapter: "arc_special_end"
      }
    ];
  }
};
