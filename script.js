const DELAY_MULTIPLIER = 1.4;

class Game {
    constructor() {
        this.isBusy = false;
        this.dialogueEnded = false;
        this.isChapterEnding = false;
        this.currentDataSource = GameData; // Default data source
        this.lang = 'ru'; // Default language
        this.currentChapter = 'start'; // Default chapter

        // Load saved progress if available
        this.loadProgress();
        
        this.init();

        this.generateMessage = false
        console.log(this.generateMessage)
    }

    // Save current game progress to localStorage
    saveProgress() {
        const progress = {
            chapter: this.currentChapter,
            dataSource: this.currentDataSource === GameData2 ? 'GameData2' : 'GameData',
            lang: this.lang
        };
        
        localStorage.setItem('gameProgress', JSON.stringify(progress));
        console.log('Progress saved:', progress);
    }

    // Load saved progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem('gameProgress');
        
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                
                // Set language
                this.lang = progress.lang || 'ru';
                
                // Set data source
                if (progress.dataSource === 'GameData2') {
                    // If we need GameData2 but it's not loaded yet
                    if (!window.GameData2) {
               
                   
                                this.currentDataSource = GameData2;
                                this.currentChapter = progress.chapter || 'start';
                   

                    } else {
                        this.currentDataSource = GameData2;
                    }
                } else {
                    this.currentDataSource = GameData;
                }
                
                // Set chapter
                this.currentChapter = progress.chapter || 'start';
                
                console.log('Progress loaded:', progress);
            } catch (error) {
                console.error('Error parsing saved progress:', error);
                // Use defaults if there's an error
                this.lang = 'ru';
                this.currentChapter = 'start';
                this.currentDataSource = GameData;
            }
        } else {
            // No saved progress, use defaults
            this.lang = 'ru';
            this.currentChapter = 'start';
            this.currentDataSource = GameData;
        }
    }

    // Clear saved progress from localStorage
    clearProgress() {
        localStorage.removeItem('gameProgress');
        console.log('Progress cleared');
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.loadChapter();
    }

    disabledButton(generateMessage) {
        document.querySelector('.nav-btn--endGame').disabled = generateMessage
        document.querySelector('.start-chapter-over').disabled = generateMessage
        document.querySelector('.lang-btn').disabled = generateMessage
    }


    loadChapter() {
        const chapter = this.currentDataSource[this.lang][this.currentChapter];

        // Save progress whenever a new chapter is loaded
        this.saveProgress();

        // Set generateMessage to true when starting to add messages
        this.generateMessage = true;
        console.log("Starting message generation: ", this.generateMessage);
        this.disabledButton(this.generateMessage)
        // Create an array of promises for each message
        const messagePromises = chapter.messages.map((msg) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.addMessage(msg.type, msg.text);
                    resolve();
                }, msg.delay * DELAY_MULTIPLIER);
            });
        });

        // Process all promises in sequence
        Promise.all(messagePromises).then(() => {
            // Set generateMessage to false when all messages have been added
            this.generateMessage = false;
            console.log("Finished message generation: ", this.generateMessage);
            this.disabledButton(this.generateMessage)
            this.showChoices();

            if (chapter.isLastChapter) {
                this.isChapterEnding = true;
                setTimeout(() => {
                    this.showScreen('endgame');
                    this.hideNavigation();
                }, 2000);
            }
        });

        this.generatePosts(this.currentDataSource[this.lang].posts || []);
    }

    handleChoice(index) {
        if (this.isBusy || this.dialogueEnded) return;

        this.isBusy = true;
        const choice = this.currentDataSource[this.lang][this.currentChapter].choices[index];

        if (choice.printable !== false) {
            this.addMessage('sent', choice.text);
        }

        // Check if this is the special "start-new-chapter" choice
        if (choice.action === 'start-new-chapter') {
            this.loadExternalData('data2.js')
                .then(() => {
                    this.clearChat();
                    this.currentDataSource = GameData2; // Switch to the new data source
                    this.currentChapter = choice.nextChapter || 'start'; // Use provided nextChapter or default to 'start'
                    this.loadChapter(); // This will now save progress
                    this.isBusy = false;
                    this.dialogueEnded = false;
                })
                .catch(error => {
                    console.error('Failed to load external data:', error);
                    this.isBusy = false;
                });
            return;
        }

        // Set generateMessage to true when starting to add result messages
        this.generateMessage = true;
        console.log("Starting result message generation: ", this.generateMessage);

        // Create an array of promises for each message
        const messagePromises = choice.result.map((msg) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.addMessage(msg.type, msg.text);
                    resolve();
                }, msg.delay * DELAY_MULTIPLIER);
            });
        });

        this.hideChoices();

        // Process all promises in sequence
        Promise.all(messagePromises).then(() => {
            // Set generateMessage to false when all result messages have been added
            this.generateMessage = false;
            console.log("Finished result message generation: ", this.generateMessage);

            this.isBusy = false;
            this.dialogueEnded = true;

            if (choice.nextChapter) {
                this.currentChapter = choice.nextChapter;
                this.loadChapter();

                this.isBusy = false;
                this.dialogueEnded = false;
            }
        });
    }

    addMessage(type, text) {
        const chat = document.getElementById('chat');
        const msg = document.createElement('div');
        msg.className = `message ${type}`;

        // Check if the text contains a photo placeholder
        if (text.includes('{photo_name_')) {
            // Extract the photo number from the placeholder
            const photoRegex = /{photo_name_(\d+)}/;
            const match = text.match(photoRegex);

            if (match && match[1]) {
                const photoNumber = match[1];
                const photoName = `photo_name_${photoNumber}.jpg`; // Assuming photos are named like photo_1.jpg, photo_2.jpg, etc.

                // Replace the placeholder with an empty string for now
                const textWithoutPhoto = text.replace(photoRegex, '');

                // If there's text before or after the photo, add it
                if (textWithoutPhoto.trim() !== '') {
                    msg.textContent = textWithoutPhoto;
                }

                // Create and add the image
                const img = document.createElement('img');
                img.src = `./img/photos/${photoName}`; // Assuming photos are in an 'images' folder
                img.alt = `Photo ${photoNumber}`;
                img.className = 'message-image';
                img.addEventListener('click', () => {
                    this.openFullscreenImage(img.src);
                });

                msg.appendChild(img);
            } else {
                // If the regex didn't match properly, just show the text as is
                msg.textContent = text;
            }
        } else {
            // No photo placeholder, just set the text
            msg.textContent = text;
        }

        chat.appendChild(msg);

        const sound = document.getElementById('sound');
        if (sound && type === 'received') {
            sound.play();
        }

        setTimeout(() => {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);


    }

    showChoices() {
        if (this.dialogueEnded) return;

        const choices = this.currentDataSource[this.lang][this.currentChapter].choices;
        const container = document.getElementById('choices');

        const html = choices.map((choice, i) => `
            <button class="choice-btn" 
                    data-choice="${i}" 
                    ${this.isBusy ? 'disabled' : ''}>
                ${choice.text}
            </button>
        `).join('');

        container.innerHTML = html;
    }

    handleChoice(index) {
        if (this.isBusy || this.dialogueEnded) return;

        this.isBusy = true;
        const choice = this.currentDataSource[this.lang][this.currentChapter].choices[index];

        if (choice.printable !== false) {
            this.addMessage('sent', choice.text);
        }

        // Check if this is the special "start-new-chapter" choice
        if (choice.action === 'start-new-chapter') {
            this.loadExternalData('data2.js')
                .then(() => {
                    this.clearChat();
                    this.currentDataSource = GameData2; // Switch to the new data source
                    this.currentChapter = choice.nextChapter || 'start'; // Use provided nextChapter or default to 'start'
                    this.loadChapter();
                    this.isBusy = false;
                    this.dialogueEnded = false;
                })
                .catch(error => {
                    console.error('Failed to load external data:', error);
                    this.isBusy = false;
                });
            return;
        }

        // Create an array of promises for each message
        const messagePromises = choice.result.map((msg) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.addMessage(msg.type, msg.text);
                    resolve();
                }, msg.delay * DELAY_MULTIPLIER);
            });
        });

        this.hideChoices();

        // Process all promises in sequence
        Promise.all(messagePromises).then(() => {
            this.isBusy = false;
            this.dialogueEnded = true;

            if (choice.nextChapter) {
                this.currentChapter = choice.nextChapter;
                this.loadChapter();

                this.isBusy = false;
                this.dialogueEnded = false;
            }
        });
    }

    // New method to load external data file
    loadExternalData(dataFile) {
        return new Promise((resolve, reject) => {
            // Check if the script is already loaded
            if (window.GameData2) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = dataFile;
            script.onload = () => {
                if (window.GameData2) {
                    resolve();
                } else {
                    reject(new Error('GameData2 not found in loaded script'));
                }
            };
            script.onerror = () => reject(new Error(`Failed to load ${dataFile}`));
            document.head.appendChild(script);
        });
    }

    generatePosts(posts) {
        const container = document.getElementById('posts');
        if (!container || !posts || posts.length === 0) return;

        const html = posts.map(post => {
            // Process text to highlight hashtags
            const processedText = post.text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');

            return `
                <div class="post">
                    <img src="${post.img}" alt="Пост" class="post-image">
                    <div class="post-footer">
                        <p class="post-caption">${processedText}</p>
                        <div class="like-section">
                            <button class="like-btn" data-liked="false">
                                ❤️ ${post.likes}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = html;

        // Логика лайков
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isLiked = e.target.dataset.liked === 'true';
                const likesCount = parseInt(e.target.textContent.match(/\d+/)[0]);

                e.target.dataset.liked = !isLiked;
                e.target.textContent = `❤️ ${isLiked ? likesCount - 1 : likesCount + 1}`;
                e.target.style.color = isLiked ? '#fff' : '#ff0055';
            });
        });

        // Add fullscreen image viewing
        document.querySelectorAll('.post-image').forEach(img => {
            img.addEventListener('click', () => {
                this.openFullscreenImage(img.src);
            });
        });

        // Add hashtag click functionality
        document.querySelectorAll('.hashtag').forEach(hashtag => {
            hashtag.addEventListener('click', () => {
                alert(`Searching for ${hashtag.textContent}`);
                // Here you could implement actual hashtag search functionality
            });
        });

        // Ensure container is scrollable
        container.scrollTop = 0;
    }

    openFullscreenImage(src) {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';

        // Create image element
        const img = document.createElement('img');
        img.src = src;
        img.className = 'fullscreen-image';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Add elements to overlay
        overlay.appendChild(closeBtn);
        overlay.appendChild(img);

        // Add overlay to body
        document.body.appendChild(overlay);

        // Close on click outside image
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    showScreen(screenName) {
        console.log(`Attempting to show screen: ${screenName}`);

        // Get the currently active screen before making changes
        const currentActiveScreen = document.querySelector('.screen.active');
        console.log(`Current active screen:`, currentActiveScreen);

        // If we're leaving the endgame screen, show the navigation again
        if (currentActiveScreen && currentActiveScreen.dataset.screen === 'endgame') {
            this.showNavigation();
        }

        // If we're leaving the chat screen, we might want to cancel any ongoing message display
        if (currentActiveScreen && currentActiveScreen.dataset.screen === 'chat' && screenName !== 'chat') {
            // Reset chat state if we're navigating away from it
            this.isBusy = false;
            this.dialogueEnded = false;
        }

        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show the selected screen - use a more robust selector and check if it exists
        const targetScreen = document.querySelector(`.screen[data-screen="${screenName}"]`);
        if (targetScreen) {
            targetScreen.classList.add('active');

            // Update navigation buttons
            if (screenName !== 'endgame') {
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.screen === screenName);
                });
            }

            // If we're showing the endgame screen, hide navigation
            if (screenName === 'endgame') {
                this.hideNavigation();
            }
        } else {
            console.error(`Screen with name "${screenName}" not found`);
        }
    }

    hideChoices() {
        document.getElementById('choices').innerHTML = '';
    }

    updateClock() {
        setInterval(() => {
            const now = new Date();
            document.querySelector('.time').textContent =
                `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        }, 1000);
    }

    setupEventListeners() {
        const updateLangBtn = document.querySelector('.lang-btn')


        updateLangBtn.addEventListener("click", () => {
            // Toggle language between 'ru' and 'en'
            if (this.lang === 'ru') {
                this.lang = 'en';  // Use single equals for assignment
                updateLangBtn.textContent = 'EN';  // Update button text
            } else {
                this.lang = 'ru';  // Use single equals for assignment
                updateLangBtn.textContent = 'RU';  // Update button text
            }

            this.clearChat();
            this.loadChapter(); // This will save the language preference

            console.log(`Language switched to: ${this.lang}`);
        });






        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showScreen(e.target.dataset.screen);
            });
        });

        document.getElementById('choices').addEventListener('click', (e) => {
            if (e.target.classList.contains('choice-btn')) {
                this.handleChoice(parseInt(e.target.dataset.choice));
            }
        });

        document.querySelector('.back-btn').addEventListener('click', () => {
            this.showScreen('chat');
        });

        // Add event listener for the "start-new-chapter" button
        const startNewChapterBtn = document.querySelector('.start-new-chapter');
        if (startNewChapterBtn) {
            startNewChapterBtn.addEventListener('click', () => {
                this.clearChat();
                this.currentDataSource = GameData2; // Switch to the new data source
                this.currentChapter = 'ntr_chapter1'; // Start with the first chapter from data2.js
                this.showScreen('chat'); // Switch back to chat screen
                this.loadChapter();
                this.isBusy = false;
                this.dialogueEnded = false;
                this.isChapterEnding = false;

            });
        }
        const startChapterOverBtn = document.querySelector('.start-chapter-over');
        if (startChapterOverBtn) {
            startChapterOverBtn.addEventListener('click', () => {
                this.clearChat();

                // Check which data source is currently active and restart the appropriate chapter
                if (this.currentDataSource === GameData2) {
                    // We're in the second chapter (GameData2), so restart it
                    this.currentChapter = 'ntr_chapter1'; // First chapter in GameData2
                    console.log("Restarting second chapter (GameData2)");
                } else {
                    // We're in the first chapter (GameData), so restart it
                    this.currentChapter = 'start'; // First chapter in GameData
                    console.log("Restarting first chapter (GameData)");
                }

                this.loadChapter(); // This will save the new progress
                this.isBusy = false;
                this.dialogueEnded = false;
                this.isChapterEnding = false;
            });
        }

        const endGameBtn = document.querySelector('.nav-btn--endGame');

        if (endGameBtn) {
            endGameBtn.addEventListener("click", () => {
                // Clear the chat history
                this.clearChat();

                // Reset game state
                this.currentChapter = "start";
                this.currentDataSource = GameData;
                this.isBusy = false;
                this.dialogueEnded = false;
                this.isChapterEnding = false;

                // Clear saved progress
                this.clearProgress();

                // Show the chat screen
                this.showScreen('chat');

                // Load the start chapter
                this.loadChapter();

                console.log("Game reset to start chapter");
            });
        } else {
            console.warn("End game button not found in the DOM");
        }
    }

    clearChat() {
        document.getElementById('chat').innerHTML = '';
        document.getElementById('choices').innerHTML = '';
        this.dialogueEnded = false;
    }

    isLastMessageInChapter(message) {
        // Check if this is the last message in the current chapter
        const chapterMessages = this.currentDataSource[this.lang][this.currentChapter].messages;
        return chapterMessages && message.id === chapterMessages[chapterMessages.length - 1].id;
    }

    hideNavigation() {
        // Hide the navigation bar when showing the endgame screen
        document.querySelector('.nav').style.display = 'none';
    }

    showNavigation() {
        // Show the navigation bar when returning from endgame screen
        document.querySelector('.nav').style.display = 'flex';
    }
}

const game = new Game();
