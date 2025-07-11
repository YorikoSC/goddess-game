export function initImageCarousel(images) {
    clearImageCarousel(); // Clear any existing carousel first
    
    const chatWrapper = document.querySelector('.chat-wrapper');
    
    // Remove existing carousel if any
    const existingCarousel = document.querySelector('.background-carousel');
    if (existingCarousel) {
        existingCarousel.remove();
    }
    
    const carousel = document.createElement('div');
    carousel.classList.add('background-carousel');
    
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('carousel-image');
        if (index === 0) img.classList.add('active');
        carousel.appendChild(img);
    });
    
    // Add carousel before chat content
    chatWrapper.insertBefore(carousel, chatWrapper.firstChild);
    
    let currentImage = 0;
    const interval = setInterval(() => {
        const imgs = carousel.querySelectorAll('.carousel-image');
        imgs[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % imgs.length;
        imgs[currentImage].classList.add('active');
    }, 5000);
    
    storeCarouselInterval(interval); // Store the interval reference
    return interval;
}

export function clearImageCarousel() {
    const carousel = document.querySelector('.background-carousel');
    if (carousel) {
        carousel.remove();
    }
    
    // Clear any existing intervals
    const intervals = window._carouselIntervals || [];
    intervals.forEach(interval => clearInterval(interval));
    window._carouselIntervals = [];
}

// Helper to store interval reference
export function storeCarouselInterval(interval) {
    if (!window._carouselIntervals) {
        window._carouselIntervals = [];
    }
    window._carouselIntervals.push(interval);
}