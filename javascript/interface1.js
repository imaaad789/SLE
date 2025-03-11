// ****A1*****
// phase1
let questions_phase1 = [
    "What is the correct sentence?", 
    "Choose the correct word: 'I ____ a student.'", 
    "What is the opposite of 'big'?", 
    "What is the correct plural of 'child'?", 
    "Choose the correct question:", 
    "What time is '3:45'?", 
    "Which sentence is correct?", 
    "What is the opposite of 'happy'?", 
    "Choose the correct sentence:", 
    "What is the correct response to: 'How are you?'"
];
  
let choices_phase1 = [
    ["A) She have a cat.", "B) She has a cat.", "C) She haves a cat.", "D) She are a cat."],
    ["A) is", "B) be", "C) am", "D) are"],
    ["A) Large", "B) Tall", "C) Small", "D) Fast"],
    ["A) Childs", "B) Childes", "C) Children", "D) Childies"],
    ["A) Where you live?", "B) Where do you live?", "C) Where are live you?", "D) Where does live you?"],
    ["A) Three past forty-five", "B) A quarter to four", "C) Three before forty-five", "D) Four to quarter"],
    ["A) He go to school every day.", "B) He goes to school every day.", "C) He going to school every day.", "D) He gone to school every day."],
    ["A) Sad", "B) Hungry", "C) Tired", "D) Angry"],
    ["A) She like apples.", "B) She likes apples.", "C) She liking apples.", "D) She liked apples."],
    ["A) I am fine, thank you.", "B) I fine, thanks.", "C) I is fine, thank you.", "D) Fine am I, thank you."]
];
  
let correctAnswers_phase1 = [
    "B) She has a cat.", 
    "C) am", 
    "C) Small", 
    "C) Children", 
    "B) Where do you live?", 
    "B) A quarter to four", 
    "B) He goes to school every day.", 
    "A) Sad", 
    "B) She likes apples.", 
    "A) I am fine, thank you."
];
// *********************************************************************
// phase2
let photo_phase1=[
    "../img/imagA1/bed.jfif",
    "../img/imagA1/bird.jfif",
    "../img/imagA1/cat.jpg",
    "../img/imagA1/horse.jfif",
    "../img/imagA1/Hospital.jpg",
    "../img/imagA1/Library.jfif",
    "../img/imagA1/milk.jfif",
    "../img/imagA1/plane.jfif",
    "../img/imagA1/Supermarket.jfif",
    "../img/imagA1/table.jfif"
];
let photo_answer1=[
    "bed",
    "bird",
    "cat",
    "horse",
    "hospital",
    "library",
    "milk",
    "plane",
    "supermarket",
    "table"
];
// *********************************************************************
// phase2
let arabicSentences = [
    "أنا أحب التفاح",
    "أنا أعيش في باريس",
    "هذا كتاب كبير",
    "أين السوق؟",
    "أنا أدرس اللغة العربية",
    "القط على الطاولة",
    "عندي سيارة حمراء",
    "أنا أشرب الماء",
    "أختي تعمل معلمة",
    "الجو حار اليوم"
];
let englishSentences = [
    "I love apples",
    "I live in Paris",
    "This is a big book",
    "Where is the market?",
    "I study Arabic",
    "The cat is on the table",
    "I have a red car",
    "I drink water",
    "My sister works as a teacher",
    "The weather is hot today"
];
// *********************************************************************
const WORDS = [
    { 
        word: "SUN",
        hint: "Source of daylight",
        scrambled: "SNU",
        row: 0,
        col: 0,
        direction: 'horizontal'
    },
    { 
        word: "CAT",
        hint: "Domestic feline pet",
        scrambled: "ACT",
        row: 1,
        col: 1,
        direction: 'horizontal'
    },
    { 
        word: "DOG",
        hint: "Human's best friend",
        scrambled: "OGD",
        row: 2,
        col: 0,
        direction: 'horizontal'
    },
    { 
        word: "TREE",
        hint: "Tall plant with trunk",
        scrambled: "ETRE",
        row: 3,
        col: 0,
        direction: 'horizontal'
    },
    { 
        word: "BIRD",
        hint: "Feathered flying creature",
        scrambled: "BIDR",
        row: 4,
        col: 0,
        direction: 'horizontal'
    }
];

const GRID_SIZE = 5;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let foundWords = [];
let gridCells = [];
let score = 0; // Variable pour stocker le score

function initializeGame() {
    createGrid();
    populateGrid();
    renderWordList();
    
    // Show the puzzle div that was hidden
    document.getElementById('puzzle').style.display = 'block';
}

function createGrid() {
    const grid = document.getElementById('crossword');
    grid.innerHTML = '';
    gridCells = []; // Reset gridCells array
    
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            gridCells.push(cell);
            grid.appendChild(cell);
        }
    }
}

function populateGrid() {
    // Fill grid with random letters
    gridCells.forEach(cell => {
        cell.textContent = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    });

    // Place hidden words
    WORDS.forEach(({ word, row, col, direction }) => {
        const letters = word.split('');
        for (let i = 0; i < letters.length; i++) {
            const targetRow = direction === 'vertical' ? row + i : row;
            const targetCol = direction === 'horizontal' ? col + i : col;
            const cell = gridCells.find(
                c => c.dataset.row == targetRow && c.dataset.col == targetCol
            );
            if (cell) cell.textContent = letters[i];
        }
    });
}

function renderWordList() {
    const list = document.getElementById('wordList');
    list.innerHTML = WORDS.map(word => `
        <li 
            data-word="${word.word}"
            data-hint="${word.hint}"
            class="scrambled"
        >
            ${word.scrambled}
        </li>
    `).join('');
}

function validateWord() {
    const input = document.getElementById('wordInput');
    const feedback = document.getElementById('feedback');
    const userWord = input.value.trim().toUpperCase();

    if (!userWord) {
        showFeedback('Please enter a word', 'error');
        return;
    }

    if (foundWords.includes(userWord)) {
        showFeedback('Word already found!', 'error');
        return;
    }

    const targetWord = WORDS.find(w => w.word === userWord);
    
    if (!targetWord) {
        showFeedback('Word not in puzzle', 'error');
        return;
    }

    // Vérifier si la réponse est correcte et ajouter des points
    const result = checkAnswer(userWord);
    
    if (result) {
        foundWords.push(userWord);
        highlightWord(targetWord);
        updateWordList(userWord);
        showFeedback('Congratulations! Word found! +2 points', 'success');
        input.value = '';
    } else {
        showFeedback('Word not found in grid', 'error');
    }
}

// Nouvelle fonction pour vérifier les réponses et ajouter des points
function checkAnswer(word) {
    const targetWord = WORDS.find(w => w.word === word);
    
    if (!targetWord) return false;
    
    const isCorrect = verifyWordPlacement(targetWord);
    
    if (isCorrect) {
        // Ajouter 2 points pour une réponse correcte
        score += 2;
        return true;
    }
    
    return false;
}

// Fonction pour obtenir le score actuel
function getScore() {
    return score;
}

function verifyWordPlacement({ word, row, col, direction }) {
    const letters = word.split('');
    for (let i = 0; i < letters.length; i++) {
        const targetRow = direction === 'vertical' ? row + i : row;
        const targetCol = direction === 'horizontal' ? col + i : col;
        const cell = gridCells.find(
            c => c.dataset.row == targetRow && c.dataset.col == targetCol
        );
        if (!cell || cell.textContent !== letters[i]) return false;
    }
    return true;
}

function highlightWord({ word, row, col, direction }) {
    const letters = word.split('');
    letters.forEach((_, i) => {
        const targetRow = direction === 'vertical' ? row + i : row;
        const targetCol = direction === 'horizontal' ? col + i : col;
        const cell = gridCells.find(
            c => c.dataset.row == targetRow && c.dataset.col == targetCol
        );
        if (cell) cell.style.backgroundColor = 'var(--highlight-color)';
    });
}

function updateWordList(word) {
    const listItems = document.querySelectorAll('#wordList li');
    listItems.forEach(li => {
        if (li.dataset.word === word) {
            li.textContent = word;
            li.classList.remove('scrambled');
            li.classList.add('found');
        }
    });
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.color = type === 'error' ? '#e74c3c' : '#27ae60';
}



// **********************************************************************
class Phase1_De_Chaque_Niveau{
    constructor(question,choix,correct_answer){
        this.question=question;
        this.choix=choix;
        this.correct_answer=correct_answer;
    }
    
    afficheQuize(){
        try {
            let main=document.querySelector('main');
            let quiz_container=document.createElement('div');
            quiz_container.className='quiz-container';

            let container_quize_text=document.createElement('div');
            container_quize_text.className="container-Quize";

            let quize_p=document.createElement('p');
            quize_p.textContent="Phase 1 of 4";
            container_quize_text.appendChild(quize_p);

            quiz_container.appendChild(container_quize_text);
            // let quize_h1=document.createElement('h1');
            // quize_h1.textContent=""
            this.question.forEach((element_Q,index) => {
                let question=document.createElement('div');
                let options_container=document.createElement('div');

                question.className='question';
                options_container.className='options-container';

                question.innerHTML=`Q${index+1} : ${element_Q}`;
                quiz_container.appendChild(question);

                this.choix[index].forEach((element_C) =>{
                    let option=document.createElement('div');
                    option.className='option';

                    let label=document.createElement('label');
                    let input=document.createElement('input');
                    input.type='radio';
                    input.name='answer'+index;
                    input.value=element_C;

                    let span=document.createElement('span');
                    span.className="option-text";
                    span.innerHTML=element_C;

                    label.appendChild(input);
                    label.appendChild(span);
                    option.appendChild(label);
                    options_container.appendChild(option);
                    quiz_container.appendChild(options_container);
                });
            });
            
            let valideDiv = document.createElement('div');
            valideDiv.className = 'valide-btn';
            valideDiv.id = 'valide-btn1';

            // let previousButtonDiv = document.createElement('div');
            // let previousButton = document.createElement('button');
            // previousButton.id = 'Previous';
            // previousButton.textContent = 'Previous';
            // previousButtonDiv.appendChild(previousButton);
            // valideDiv.appendChild(previousButtonDiv);

            let nextButtonDiv = document.createElement('div');
            let nextButton = document.createElement('button');
            nextButton.id = 'next';
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click',()=>{
                this.checkanswer();
            });
            nextButtonDiv.appendChild(nextButton);
            valideDiv.appendChild(nextButtonDiv);

            quiz_container.appendChild(valideDiv);
            main.appendChild(quiz_container);
        } catch (error) {
            console.error("Error in afficheQuize:", error);
            alert("An error occurred while displaying the quiz. Please try again.");
        }
    }
    
    checkanswer(){
        try {
            let score = 0;
            let unansweredQuestions = [];
            
            this.question.forEach((element, index_question) => {
                let answer_checked=document.querySelector(`input[name="answer${index_question}"]:checked`);
                if (!answer_checked) {
                    unansweredQuestions.push(index_question + 1);
                } else if (answer_checked.value===this.correct_answer[index_question]) {
                    score=score+2;
                }
            });
            
            if (unansweredQuestions.length > 0) {
                alert(`Please answer question(s) ${unansweredQuestions.join(', ')} before proceeding.`);
                return false;
            }
            
            return score;
        } catch (error) {
            console.error("Error in checkanswer:", error);
            alert("An error occurred while checking answers. Please try again.");
            return 0;
        }
    }
}

class Phase2_De_Chaque_Niveau{
    constructor(photo_link,answer_photo){
        this.photo_link=photo_link;
        this.answer_photo=answer_photo;
    }
    
    affichePhoto(){
        try {
            let main = document.querySelector('main');
            main.innerHTML = '';
            
            let cont_image=document.createElement('div');
            cont_image.className="container-image";

            let quize_text=document.createElement('p');
            quize_text.textContent="Phase 2 of 4";
            cont_image.appendChild(quize_text);
            let h1_Quiz=document.createElement('h1');
            h1_Quiz.textContent="Image Quiz";
            cont_image.appendChild(h1_Quiz);
            
            this.photo_link.forEach((element,index)=>{

                let image_items=document.createElement('div');
                image_items.className="image-item";

                let image_container=document.createElement('div');
                image_container.className="image-container";

                let img=document.createElement('img');
                img.src=element;
                img.alt="image"+index;
                image_container.appendChild(img);

                let input_container=document.createElement('div');
                input_container.className="input-container";
                let label=document.createElement('label');
                label.htmlFor="answer"+index;
                label.textContent="Your answer : ";

                let input=document.createElement('input');
                input.type="text";
                input.name="answer"+index;
                input.id="answer"+index;
                input.placeholder="Type your answer here";

                input_container.appendChild(label);
                input_container.appendChild(input);

                image_items.appendChild(image_container);
                image_items.appendChild(input_container);

                cont_image.appendChild(image_items);
            });
            
            let div_btn=document.createElement('div');
            div_btn.className="button-container";
            let btn_next=document.createElement('button');
            btn_next.id="next";
            btn_next.textContent="Next";
            btn_next.addEventListener('click',()=>{
                this.CheckAnswerPhoto();
            });
            div_btn.appendChild(btn_next);
            cont_image.appendChild(div_btn);
            main.appendChild(cont_image);
        } catch (error) {
            console.error("Error in affichePhoto:", error);
            this.gestionErreur(error,"Error in affichePhoto");
        }
    }
    
    CheckAnswerPhoto(){
        try {
            let score=0;
            let Input_answer=document.querySelectorAll('input[type="text"]');

            Input_answer.forEach((element1,index1)=>{
                if(element1.value.toLowerCase()===this.answer_photo[index1]){
                    score=score+2;
                    element1.style.border="2px solid green";
                }else if(element1.value==""){
                    // pass
                } else {
                    element1.style.border="2px solid red";
                }
            });
            
            return score;
        } catch (error) {
            this.gestionErreur(error,"Error in CheckAnswerPhoto");
            return 0;
        }
    }
}

class Phase3_de_chaque_Niveau{
    constructor(arSentences,enSentences){
        this.arSentences=arSentences;
        this.enSentences=enSentences;
    }
    
    AfficheSentences(){
        try {
            let main = document.querySelector('main');
            main.innerHTML = '';
            
            let container_sentence=document.createElement('div');
            container_sentence.className="container-sentence";

            let sentence_text=document.createElement('p');
            sentence_text.textContent="Phase 3 of 4";
            container_sentence.appendChild(sentence_text);

            let sentence_h1=document.createElement('h1');
            sentence_h1.textContent = "Translate Sentences";
            container_sentence.appendChild(sentence_h1);

            
            this.arSentences.forEach((element,index)=>{
                let sentence_item=document.createElement('div');
                sentence_item.className="sentence-item";

                let sentence_container=document.createElement('div');
                sentence_container.className="sentence-container";

                let p=document.createElement('p');
                p.textContent=element;
                p.id="sentence-text"+index;
                sentence_container.appendChild(p);

                let input_sentence=document.createElement('div');
                input_sentence.className="input-sentence";
                
                let label=document.createElement('label');
                label.htmlFor="sentence-input"+index;
                label.textContent="Your answer : ";

                let input=document.createElement('input');
                input.type="text";
                input.name="sentence-input"+index;
                input.id="sentence-input"+index;
                input.placeholder="Type your answer here";

                input_sentence.appendChild(label);
                input_sentence.appendChild(input);

                sentence_item.appendChild(sentence_container);
                sentence_item.appendChild(input_sentence);
                container_sentence.appendChild(sentence_item);
            });
            
            let div_btn=document.createElement('div');
            div_btn.className="button-sentence";
            let btn_next=document.createElement('button');
            btn_next.textContent="Next";
            btn_next.id="next";
            btn_next.addEventListener('click',()=>{
                this.CheckAnswerSentence();
            });

            div_btn.appendChild(btn_next);
            container_sentence.appendChild(div_btn);
            main.appendChild(container_sentence);
        } catch (error) {
            console.error(error,"Error in AfficheSentences");
            throw new Error(`Failed to display sentence quiz: ${error.message}`);
        }
    }
    
    CheckAnswerSentence(){
        try {
            let score=0;
            let Input_answer=document.querySelectorAll('input[type="text"]');
            Input_answer.forEach((element,index)=>{
                if (/\d/.test(element.value)===true){
                    element.style.border="2px solid red";
                    alert(`The answer ${ index+1} must not consist of number.`);
                    return false;
                }
                
                if(element.value===this.enSentences[index]){
                    score=score+2;
                    element.style.border="2px solid green";
                }else if(element.value===""){
                    // pass
                } else {
                    element.style.border="2px solid orange"; 
                }
            });
            return score;
        } catch (error) {
            console.error("Error in CheckAnswerSentence:", error);
            alert("An error occurred while checking sentence answers. Please try again.");
            return 0;
        }
    }
}

class MangerQuize{
    constructor(){
        this.phase=-1;
        this.scores = [0,0,0,0]; 
        this.phase1=new Phase1_De_Chaque_Niveau(questions_phase1,choices_phase1,correctAnswers_phase1);
        this.phase2=new Phase2_De_Chaque_Niveau(photo_phase1,photo_answer1);
        this.phase3=new Phase3_de_chaque_Niveau(arabicSentences,englishSentences);
    }
    
    startQuize(){
        try {
            let main=document.querySelector('main');
            main.innerHTML = '';
            
            // let phaseIndicator=document.createElement("div");
            // phaseIndicator.className="phase-indicator";
            // phaseIndicator.innerHTML=`<h2>Phase ${this.phase+1} of 4</h2>`;
            // main.appendChild(phaseIndicator);
            
            switch (this.phase) {
                case 0:
                    this.phase1.afficheQuize();
                    this.updateNextButtonListener();
                    break;
                case 1:
                    this.phase2.affichePhoto();
                    this.updateNextButtonListener();
                    break;
                case 2:
                    this.phase3.AfficheSentences();
                    this.updateNextButtonListener();
                    break;
                case 3:
                    score = 0;
                    main.innerHTML = '';
                    initializeGame();
                    
                    let puzzle_container=document.getElementById('puzzle');
                    let nextButtonDiv = document.createElement('div');
                    nextButtonDiv.className = 'button-container';
                    let nextButton = document.createElement('button');
                    nextButton.id = 'next';
                    nextButton.textContent = 'Finish Quiz';
                    nextButtonDiv.appendChild(nextButton);
                    puzzle_container.appendChild(nextButtonDiv);
                    this.updateNextButtonListener();
                    break;
                default:
                    throw new Error(`Invalid phase: ${this.phase}`);
            }
        } catch (error) {
            console.error("Error in startQuize:", error);
            this.gestionErreur(error,`Error displaying Quiz with phase ${this.phase}.`);
        }
    }
    
    updateNextButtonListener() {
        try {
            let nextButton = document.getElementById('next');
            let newNextButton = nextButton.cloneNode(true);
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
            
            newNextButton.addEventListener('click', () => {
                let result;
                switch (this.phase) {
                    case 0:
                        result = this.phase1.checkanswer();
                        break;
                    case 1:
                        result = this.phase2.CheckAnswerPhoto();
                        break;
                    case 2:
                        result = this.phase3.CheckAnswerSentence();
                        break;
                    case 3:
                        result=getScore()
                        break;
                }
                
                if (result !== false) {
                    this.scores[this.phase] = result;
                    this.moveToNextPhase();
                }
            });
        } catch (error) {
            this.gestionErreur(error, "Failed to set up next button");
        }
    }
    
    moveToNextPhase(){
        try {
            this.phase++;
            if(this.phase < 4){
                this.startQuize();
            } else {
                this.showResults();
            }
        } catch (error) {
            this.gestionErreur(error, "Failed to move to next phase");
        }
    }
    
    showResults(){
        try {
            let main = document.querySelector('main');
            main.innerHTML = '';
            document.getElementById('puzzle').style.display = 'none';
            
            let totalScore = this.scores[0]+this.scores[1]+this.scores[2]+this.scores[3];
            let maxScore = 70;
            
            let resultDiv = document.createElement('div');
            resultDiv.className = 'results';
            resultDiv.innerHTML = `
                <div class="completion-card">
                    <h2>Quiz Completed!</h2>
                    <p>Thank you for completing all four phases of the quiz.</p>
                    
                    <div class="score-summary">
                        <h3>Your score</h3>
                        <div class="score-container">
                            <div class="score-items">
                                <div>
                                    <span>${this.scores[0]}/20</span>
                                </div>
                                <p>Phase 1</p>
                            </div>
                            <div class="score-items">
                                <div>
                                    <span>${this.scores[1]}/20</span>
                                </div>
                                <p>Phase 2</p>
                            </div>
                            <div class="score-items">
                                <div>
                                    <span>${this.scores[2]}/20</span>
                                </div>
                                <p>Phase 3</p>
                            </div>
                            <div class="score-items">
                                <div>
                                    <span>${this.scores[3]}/10</span>
                                </div>
                                <p>Phase 3</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="total-score-container">
                        <div class="total-score-box">
                            <div class="total-score-label">Total Score</div>
                            <div class="total-score-value">${totalScore}/${maxScore} (${Math.round(totalScore/maxScore*100)}%)</div>
                        </div>
                    </div>
                    <div class="button-group">
                        <button id="restart-btn" class="btn btn-primary">Restart Quiz</button>
                        <button id="home-btn" class="btn btn-secondary"><a href="../html/index.html">Home</a></button>
                    </div>
                </div>
            `;
            
            main.appendChild(resultDiv);
            
            document.getElementById("restart-btn").addEventListener("click", () => {
                this.phase = -1;
                this.scores = [0, 0, 0, 0];
                this.moveToNextPhase();
            });

        } catch (error) {
            this.gestionErreur(error, "Failed to display results");
        }
    }
    
    gestionErreur(erreur,text){
        let erreurmessage = document.createElement("div");
        erreurmessage.className = "error-message";
        erreurmessage.innerHTML = `
            <h3>Something went wrong</h3>
            <p>Please try refreshing the page. If the problem persists, contact support.</p>
            <p>Error details: ${text}</p>
            <p>${erreur}</p>
            <button id="retry-btn">Retry</button>
        `;
        
        let main = document.querySelector("main");
        if (main) {
            main.innerHTML = "";
            main.appendChild(erreurmessage);
        } else {
            document.body.innerHTML = "";
            document.body.appendChild(erreurmessage);
        }

        document.getElementById("retry-btn")?.addEventListener("click", () => {
            window.location.reload();
        });

    }
    
    startEventClass(){
        try {
            let startBtn = document.getElementById("start-btn");
            if (startBtn) {
                startBtn.addEventListener("click", () => {
                    this.phase = 0;
                    this.startQuize();
                });
            } else {
                // If no start button exists, create one
                let main = document.querySelector("main");
                if (!main) {
                    main = document.createElement("main");
                    document.body.appendChild(main);
                }
                
                let startDiv = document.createElement("div");
                startDiv.className = "start";
                startDiv.innerHTML = `
                    <h1>Language Learning Quiz</h1>
                    <p>Test your knowledge through multiple phases!</p>
                    <button id="start-btn">Start Quiz</button>
                `;
                
                main.appendChild(startDiv);
                
                document.getElementById("start-btn").addEventListener("click", () => {
                    this.phase = 0;
                    this.startQuize();
                });
            }
        } catch (error) {
            this.gestionErreur(error, "Error setting up event listeners");
        }    
    }
}

// Function to toggle between light and dark themes
function toggleTheme() {
    // Check if dark mode is already active
    const isDarkMode = document.body.classList.contains('dark');
    
    // Toggle the dark class on the body
    document.body.classList.toggle('dark');
    
    // Update the icon in the theme switcher button
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkMode) {
        // Switching to light mode
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        // Switching to dark mode
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Save the user's preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
}

// Function to initialize theme based on user's saved preference
function initTheme() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    // Set default icon to sun (light mode)
    themeIcon.classList.add('fa-sun');
    
    if (savedTheme === 'dark') {
        // Apply dark theme if saved
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Apply dark theme if user's system preference is dark
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add theme switcher button to the body
    const themeSwitcher = document.createElement('button');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = '<i id="theme-icon" class="fas"></i>';
    themeSwitcher.addEventListener('click', toggleTheme);
    document.body.appendChild(themeSwitcher);
    
    // Initialize theme
    initTheme();
});

let Quiz = new MangerQuize();
Quiz.startEventClass(); 
