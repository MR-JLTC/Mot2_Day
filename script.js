let currentPage = 1;
const totalPages = 4;

function showPopup() {
    const popup = document.getElementById('popupMessage');
    popup.classList.remove('hidden');
    triggerHeartFireworks();
}

function closePopup() {
    const popup = document.getElementById('popupMessage');
    popup.classList.add('hidden');
}

// Heart fireworks logic
function triggerHeartFireworks() {
    const container = document.getElementById('heartFireworks');
    container.innerHTML = ''; // clear any old hearts

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = '💕';

        // random direction (within 100px radius)
        const x = (Math.random() - 0.5) * 200 + 'px';
        const y = Math.random() * -150 + 'px';
        heart.style.setProperty('--x', x);
        heart.style.setProperty('--y', y);

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 1200);
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(pageNum) {
    // Hide current page
    document.getElementById(`page${currentPage}`).classList.remove('active');

    // Show new page
    currentPage = pageNum;
    document.getElementById(`page${currentPage}`).classList.add('active');

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;

    // Update page indicator
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === currentPage);
    });
}

// Initialize navigation
document.getElementById('prevBtn').disabled = true;

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 15 + 's';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    document.getElementById('hearts').appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 25000);
}

// Create hearts periodically
setInterval(createHeart, 3000);

// Create initial hearts
for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 1000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changePage(-1);
    if (e.key === 'ArrowRight') changePage(1);
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changePage(1); // Swipe left - next page
        } else {
            changePage(-1); // Swipe right - previous page
        }
    }
}