export class ScreenManager {
  constructor(gameStateManager) {
    this.gameStateManager = gameStateManager;
    this.defaultPosts = [
      {
        image: 'img/lina_post1.jpg',
        caption: { ru: 'Мой новый фотосет 💫', en: 'My new photoshoot 💫' },
        likes: 256,
      },
      {
        image: 'img/lina_post2.jpg',
        caption: { ru: 'Прогулка по городу ☀️', en: 'City walk ☀️' },
        likes: 178,
      },
      {
        image: 'img/lina_post3.jpg',
        caption: { ru: 'Фото с новой фотосессии 📸', en: 'Photos from new photoshoot 📸' },
        likes: 321,
      },
    ];
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.querySelector(`[data-screen="${screenId}"]`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
    if (screenId === 'puregram') {
      this.loadPuregramPosts();
    }
  }

  loadPuregramPosts() {
    const postsContainer = document.querySelector('.pg-posts');
    if (!postsContainer) {
      console.error('Контейнер для постов не найден');
      return;
    }

    postsContainer.innerHTML = '';
    const currentLang = this.gameStateManager.gameState.language || 'ru';
    const allPostsToShow = [...this.gameStateManager.allPosts, ...this.defaultPosts];

    allPostsToShow.forEach(post => {
      if (!post || !post.image) {
        console.error('Некорректный пост:', post);
        return;
      }
      const postElement = this.createPostElement(post, currentLang);
      if (postElement) {
        postsContainer.appendChild(postElement);
      }
    });
  }

  createPostElement(post, currentLang) {
    const postElement = document.createElement('div');
    postElement.className = 'pg-post';
    const caption = post.caption[currentLang] || post.caption.ru || '';
    const chat = this.gameStateManager.gameState.chats[this.gameStateManager.gameState.currentChat] || {
      avatar: 'img/lina_avatar.jpg',
      name: { ru: 'Lina', en: 'Lina' },
    };

    postElement.innerHTML = `
      <div class="pg-post-header">
        <img src="${chat.avatar}" class="pg-avatar" alt="${chat.name[currentLang] || chat.name.ru}">
        <span>${chat.name[currentLang] || chat.name.ru}</span>
      </div>
      <div class="pg-post-image">
        <img src="${post.image}" alt="Post" class="post-image" onclick="window.game.openFullscreenImage('${post.image}')">
      </div>
      <div class="pg-post-actions">
        <div class="pg-post-like-action">
          <button class="like-btn" data-liked="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
          </button>
          <span class="pg-post-likes">${post.likes}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-chat-action" viewBox="0 0 16 16">
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-send-action" viewBox="0 0 16 16">
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>
      </div>
      <div class="pg-post-caption">
        <p>${caption}</p>
      </div>
    `;
    return postElement;
  }

  showNavigation() {
    document.querySelector('.nav').style.display = 'flex';
  }

  hideNavigation() {
    document.querySelector('.nav').style.display = 'none';
  }

  updatePostsLanguage() {
    this.loadPuregramPosts();
  }
}