document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const app = document.getElementById('app');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    const userButton = document.getElementById('userButton');
    const userDropdown = document.getElementById('userDropdown');
    const userIcon = document.querySelector('.user-icon');
    const levelProgressBar = document.getElementById('levelProgressBar');
    const levelProgressValue = document.getElementById('levelProgressValue');
    const timeProgressBar = document.getElementById('timeProgressBar');
    const timeProgressValue = document.getElementById('timeProgressValue');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const testCards = document.querySelectorAll('.test-card');
    const testButtons = document.querySelectorAll('.test-button');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        themeIcon?.classList.remove('fa-moon');
        themeIcon?.classList.add('fa-sun');
    }

    // Theme Toggle
    themeToggle?.addEventListener('click', function () {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon?.classList.remove('fa-moon');
            themeIcon?.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon?.classList.remove('fa-sun');
            themeIcon?.classList.add('fa-moon');
        }
    });

    // User Dropdown
    userButton?.addEventListener('click', function () {
        const dropdown = userButton.parentElement;
        dropdown?.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    if (userDropdown && userButton) {
        document.addEventListener('click', function (event) {
            if (!userButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userButton.parentElement?.classList.remove('active');
            }
        });
    }

    // Hover animation for user icon
    userButton?.addEventListener('mouseenter', function () {
        if (userIcon) userIcon.style.transform = 'rotate(360deg)';
    });

    userButton?.addEventListener('mouseleave', function () {
        if (userIcon) userIcon.style.transform = 'rotate(0deg)';
    });

    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date('2025-03-12T23:59:59').getTime(); // Updated to a future date
        const now = Date.now();
        const difference = targetDate - now;

        if (difference <= 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        // Add pulse animation to seconds
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 900);
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Simulate progress changes
    function updateProgress() {
        // Level progress
        let levelProgress = parseFloat(levelProgressBar.style.width) || 0;
        levelProgress = Math.min(Math.max(levelProgress + (Math.random() * 2 - 1), 0), 100);
        levelProgressBar.style.width = `${levelProgress}%`;
        levelProgressValue.textContent = `${Math.round(levelProgress)}%`;

        // Time progress
        let timeProgress = parseFloat(timeProgressBar.style.width) || 0;
        timeProgress = Math.min(Math.max(timeProgress + (Math.random() * 1.5 - 0.5), 0), 100);
        timeProgressBar.style.width = `${timeProgress}%`;
        timeProgressValue.textContent = `${Math.round(timeProgress)}%`;
    }

    // Update progress every 5 seconds
    setInterval(updateProgress, 5000);

    // Add fade-in animation to elements
    function addFadeInAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }

    addFadeInAnimation();

    // Test Cards Interaction
    testCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const button = this.querySelector('.test-button');
            button?.classList.add('pulse');
        });

        card.addEventListener('mouseleave', function () {
            const button = this.querySelector('.test-button');
            button?.classList.remove('pulse');
        });
    });

    // Test Buttons Click Event
    testButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.test-card');
            const difficulty = card?.getAttribute('data-difficulty');

            // You can redirect to the test page or show a modal
            alert(`Starting ${difficulty} test. This would redirect to the ${difficulty} test page.`);

            // Example of how you might redirect:
            // window.location.href = `/test/${difficulty}`;
        });
    });
});
