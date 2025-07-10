import { gameState } from '../core/gameState.js';
import { showScreen } from './screens.js';

let chapterPosts = JSON.parse(localStorage.getItem('chapterPosts')) || [];
let allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
const defaultPosts = [/* как в старом файле */];

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'pg-post';
    const caption = post.caption[gameState.language] || post.caption['ru'];
    postElement.innerHTML = `
        <div class="pg-post-header">
            <img src="img/lina_avatar.webp" class="pg-avatar" alt="Lina">
            <span>Lina</span>
        </div>
        <div class="pg-post-image">
            <img src="${post.image}" alt="Post" class="post-image" onclick="window.game.openFullscreenImage('${post.image}')">
        </div>
        <div class="pg-post-actions">
            <div class="pg-post-like-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 16 16">
                    <path d="m8 2.748..."/> <!-- как в старом файле -->
                </svg>
                <span class="pg-post-likes">${post.likes}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-chat-action" viewBox="0 0 16 16">
                <path d="M2.678 11.894..."/> <!-- как в старом файле -->
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="pg-post-send-action" viewBox="0 0 16 16">
                <path d="M15.854.146..."/> <!-- как в старом файле -->
            </svg>
        </div>
        <div class="pg-post-caption">
            <p>${caption}</p>
        </div>
    `;
    return postElement;
}

export function loadPuregramPosts() {
    console.log('Загрузка постов PureGram');
    const postsContainer = document.getElementById('posts');
    if (!postsContainer) return;

    postsContainer.innerHTML = '';
    allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
    const allPostsToShow = [...allPosts, ...defaultPosts];

    allPostsToShow.forEach(post => {
        if (!post || !post.image) return;
        const postElement = createPostElement(post);
        if (postElement) postsContainer.appendChild(postElement);
    });
}

export function openFullscreenImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'fullscreen-image';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullscreen-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => e.target === overlay && document.body.removeChild(overlay));
}