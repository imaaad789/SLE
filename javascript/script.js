document.addEventListener('DOMContentLoaded', function () {
    let app = document.getElementById('app');
    let themeToggle = document.getElementById('themeToggle');
    let themeIcon = themeToggle?.querySelector('i');
    let userButton = document.getElementById('userButton');
    let userDropdown = document.getElementById('userDropdown');
    let userIcon = document.querySelector('.user-icon');
    let daysElement = document.getElementById('days');
    let hoursElement = document.getElementById('hours');
    let minutesElement = document.getElementById('minutes');
    let secondsElement = document.getElementById('seconds');
    let testCards = document.querySelectorAll('.test-card');
    let testButtons = document.querySelectorAll('.test-button');

    let savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Theme Toggle
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    userButton.addEventListener('click', function () {
        let dropdown = userButton.parentElement;
        dropdown.classList.toggle('active');
    });


    if (userDropdown && userButton) {
        document.addEventListener('click', function (event) {
            if (!userButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userButton.parentElement.classList.remove('active');
            }
        });
    }

    userButton.addEventListener('mouseenter',function () {
        if (userIcon){
            userIcon.style.transform = 'rotate(360deg)';
        }
    });

    userButton.addEventListener('mouseleave',function () {
        if (userIcon){
            userIcon.style.transform = 'rotate(0deg)';
        }
    });

    function updateCountdown() {
        let targetDate = new Date('2025-03-13T23:59:59').getTime();
        let now = Date.now();
        let difference = targetDate - now;
        if (difference <= 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 900);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    testCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            let button = this.querySelector('.test-button');
            button?.classList.add('pulse');
        });

        card.addEventListener('mouseleave', function () {
            let button = this.querySelector('.test-button');
            button?.classList.remove('pulse');
        });
    });

    // Test Buttons Click Event
    testButtons.forEach(button => {
        button.addEventListener('click', function () {
            let card = this.closest('.test-card');
            let difficulty = card?.getAttribute('data-difficulty');

            // You can redirect to the test page or show a modal
            alert(`Starting ${difficulty} test. This would redirect to the ${difficulty} test page.`);

            // Example of how you might redirect:
            // window.location.href = `/test/${difficulty}`;
        });
    });
});
