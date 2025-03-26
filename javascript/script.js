document.addEventListener('DOMContentLoaded', function () {
    let app=document.getElementById('app');
    let themeToggle=document.getElementById('themeToggle');
    let themeIcon=themeToggle?.querySelector('i');
    let userButton=document.getElementById('userButton');
    let userDropdown=document.getElementById('userDropdown');
    let userIcon=document.querySelector('.user-icon');
    let daysElement=document.getElementById('days');
    let hoursElement=document.getElementById('hours');
    let minutesElement=document.getElementById('minutes');
    let secondsElement=document.getElementById('seconds');
    let testCards=document.querySelectorAll('.test-card');
    let testButtons=document.querySelectorAll('.test-button');
    let dateTarget=0;
    let HourTarget=2;
    let MinutesTarget=59;
    let SecondTarget=59;

    let savedTheme=localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

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
        let dropdown=userButton.parentElement;
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
            userIcon.style.transform='rotate(360deg)';
        }
    });

    userButton.addEventListener('mouseleave',function () {
        if (userIcon){
            userIcon.style.transform='rotate(0deg)';
        }
    });

    function updateCountdown() {
        SecondTarget=SecondTarget-1;
        if(SecondTarget==0){
            MinutesTarget=MinutesTarget-1;
            SecondTarget=59;
            if(MinutesTarget==0){
                SecondTarget=59;
                MinutesTarget=59;
                HourTarget=HourTarget-1;
            }if(HourTarget<=0){
                SecondTarget=0;
                MinutesTarget=0;
                HourTarget=0;
            }
        }
        if (HourTarget===0 && MinutesTarget===0 && SecondTarget===0) {
            clearInterval(countdownInterval);
        }
        let days=0;
        daysElement.textContent=days.toString().padStart(2,'0');
        hoursElement.textContent=HourTarget.toString().padStart(2,'0');
        minutesElement.textContent=MinutesTarget.toString().padStart(2,'0');
        secondsElement.textContent=SecondTarget.toString().padStart(2,'0');

        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 900);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    testCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            let button=this.querySelector('.test-button');
            button.classList.add('pulse');
        });

        card.addEventListener('mouseleave', function () {
            let button=this.querySelector('.test-button');
            button.classList.remove('pulse');
        });
    });

    testButtons.forEach(button => {
        button.addEventListener('click', function () {
            let card=this.closest('.test-card');
            let difficulty=card?.getAttribute('data-difficulty');
            alert(`Starting ${difficulty} test. This would redirect to the ${difficulty} test page.`);
        });
    });
    document.getElementById('Profile').addEventListener('click',()=>{
        alert("This operation is not available at the moment!!");
    })
});
