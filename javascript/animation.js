document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1; 
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const animationDuration = Math.random() * 10 + 10;
        star.style.animationDuration = `${animationDuration}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        starsContainer.appendChild(star);
    }
});