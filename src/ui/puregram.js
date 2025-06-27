/**
 * Создаёт DOM-элемент поста PureGram
 */
export function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'puregram-post';

    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.caption?.ru || '';
    img.className = 'puregram-post-image';
    img.onclick = () => openFullscreenImage(post.image);
    postElement.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'puregram-post-caption';
    caption.textContent = post.caption?.ru || '';
    postElement.appendChild(caption);

    const likes = document.createElement('div');
    likes.className = 'puregram-post-likes';
    likes.textContent = `❤ ${post.likes}`;
    postElement.appendChild(likes);

    return postElement;
}

/**
 * Загружает и отображает посты PureGram
 */
export function loadPuregramPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

/**
 * Открывает изображение в полноэкранном режиме
 */
export function openFullscreenImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';

    const img = document.createElement('img');
    img.src = src;
    img.className = 'fullscreen-image';

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = () => {
        document.body.removeChild(overlay);
    };
}