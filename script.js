const DELAY_MULTIPLIER = 1.4;

class Game {
    constructor() {
        this.lang = 'ru';
        this.currentChapter = 'start';
        this.isBusy = false;
        this.dialogueEnded = false;
        this.isChapterEnding = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.loadChapter();
    }

    loadChapter() {
        const chapter = GameData[this.lang][this.currentChapter];
        
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
            this.showChoices();

            if (chapter.isLastChapter) {
                this.isChapterEnding = true;
                setTimeout(() => {
                    this.showScreen('endgame');
                    this.hideNavigation();
                }, 2000);
            }
        });
        
        this.generatePosts(GameData[this.lang].posts);
    }

    addMessage(type, text) {
        const chat = document.getElementById('chat');
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.textContent = text;
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
        
        const choices = GameData[this.lang][this.currentChapter].choices;
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
        const choice = GameData[this.lang][this.currentChapter].choices[index];
        
        if (choice.printable) {
            this.addMessage('sent', choice.text);
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

    generatePosts(posts) {
        const container = document.getElementById('posts');
        if (!container) return;
        
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
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.lang = e.target.dataset.lang;
                this.loadChapter();
            });
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
    }

    clearChat() {
        document.getElementById('chat').innerHTML = '';
        document.getElementById('choices').innerHTML = '';
        this.dialogueEnded = false;
    }

    isLastMessageInChapter(message) {
        // Check if this is the last message in the current chapter
        const chapterMessages = GameData[this.lang][this.currentChapter].messages;
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