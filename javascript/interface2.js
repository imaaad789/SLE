// ****A1*****
// phase1
let questions_phase1 = [
    "Which sentence uses the correct relative clause?", 
    "Choose the correct form: 'By this time next year, I ____ my degree.'", 
    "What is the synonym of 'persuade'?", 
    "Which sentence is in the correct reported speech form?", 
    "Choose the correct phrasal verb: 'She finally ____ smoking after ten years.'", 
    "What does the idiom 'break the ice' mean?", 
    "Which sentence is in the third conditional?", 
    "What is the opposite of 'generous'?", 
    "Which sentence uses the correct subjunctive form?", 
    "What is the correct response to: 'Would you mind opening the window?'"
];

let choices_phase1 = [
    ["A) This is the book what I bought.", "B) This is the book which I bought.", "C) This is the book who I bought.", "D) This is the book whose I bought."],
    ["A) will finish", "B) will have finished", "C) finish", "D) am finishing"],
    ["A) Convince", "B) Ignore", "C) Discuss", "D) Mention"],
    ["A) He said he will go to the party.", "B) He said he would go to the party.", "C) He said he goes to the party.", "D) He said he going to the party."],
    ["A) took up", "B) gave up", "C) put off", "D) ran out of"],
    ["A) To start a conversation in a social situation.", "B) To make a mistake.", "C) To exaggerate.", "D) To get very angry."],
    ["A) If I studied harder, I would pass the exam.", "B) If I had studied harder, I would have passed the exam.", "C) If I study harder, I will pass the exam.", "D) If I study hard, I passed the exam."],
    ["A) Selfish", "B) Kind", "C) Thoughtful", "D) Helpful"],
    ["A) It is important that he be on time.", "B) It is important that he is on time.", "C) It is important that he was on time.", "D) It is important that he were on time."],
    ["A) Sure, no problem.", "B) Yes, I do.", "C) No, I don’t mind.", "D) Sorry, I can’t."]
];

let correctAnswers_phase1 = [
    "B) This is the book which I bought.", 
    "B) will have finished", 
    "A) Convince", 
    "B) He said he would go to the party.", 
    "B) gave up", 
    "A) To start a conversation in a social situation.", 
    "B) If I had studied harder, I would have passed the exam.", 
    "A) Selfish", 
    "A) It is important that he be on time.", 
    "A) Sure, no problem."
];

// *********************************************************************
// phase2
let photo_phase1 = [
    "../img/imagB1/architecture.jfif",
    "../img/imagB1/debate.jpg",
    "../img/imagB1/environment.jfif",
    "../img/imagB1/invention.jfif",
    "../img/imagB1/negotiation.jfif",
    "../img/imagB1/portrait.jpg",
    "../img/imagB1/research.jfif",
    "../img/imagB1/scientist.jfif",
    "../img/imagB1/teamwork.jfif",
    "../img/imagB1/volunteering.jfif"
];

let photo_answer1 = [
    "architecture",
    "debate",
    "environment",
    "invention",
    "negotiation",
    "portrait",
    "research",
    "scientist",
    "teamwork",
    "volunteering"
];

// *********************************************************************
// phase3
let arabicSentences = [
    "أعتقد أن التكنولوجيا تغير العالم بسرعة",
    "يجب علينا حماية البيئة من التلوث",
    "قرأت مقالًا مثيرًا عن الاقتصاد العالمي",
    "من الضروري أن يتعلم الأطفال مهارات جديدة",
    "هل يمكنك أن توضح لي هذا المفهوم؟",
    "التعليم العالي يفتح أبوابًا جديدة للفرص",
    "الصحة النفسية مهمة بقدر الصحة الجسدية",
    "أرغب في تحسين مستواي في اللغة الإنجليزية",
    "السفر إلى بلدان مختلفة يساعد في توسيع الأفق",
    "النقاشات البناءة تساعد على تطوير الأفكار"
];

let englishSentences = [
    "I believe that technology is rapidly changing the world",
    "We must protect the environment from pollution",
    "I read an interesting article about the global economy",
    "It is necessary for children to learn new skills",
    "Can you clarify this concept for me?",
    "Higher education opens new doors for opportunities",
    "Mental health is as important as physical health",
    "I would like to improve my English level",
    "Traveling to different countries helps broaden one's perspective",
    "Constructive discussions help develop ideas"
];

// *********************************************************************
const WORDS = [
    { 
        word: "FAST",
        hint: "Moving or happening quickly",
        scrambled: "ATSF",
        row: 1,
        col: 0,
        direction: 'horizontal'
    },
    { 
        word: "PLAY",
        hint: "To have fun doing something",
        scrambled: "YLAP",
        row: 0,
        col: 4,
        direction: 'vertical'
    },
    { 
        word: "HAPPY",
        hint: "Feeling good",
        scrambled: "PYAPH",
        row: 3,
        col: 0,
        direction: 'horizontal'  
    },
    { 
        word: "BOOK",
        hint: "A collection of pages",
        scrambled: "OBKO",
        row: 5,
        col: 0,
        direction: 'horizontal'  
    },
    { 
        word: "RED",
        hint: "color",
        scrambled: "EDR",
        row: 0,
        col: 5,
        direction: 'vertical'
    },
    { 
        word: "CAR",
        hint: "Used for driving",
        scrambled: "ACR",
        row: 0,
        col: 1,
        direction: 'vertical'  
    },
];

const GRID_SIZE = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let foundWords = [];
let gridCells = [];
let score = 0; 

function initializeGame() {
    createGrid();
    populateGrid();
    renderWordList();
    
    document.getElementById('puzzle').style.display = 'block';
}

function createGrid() {
    const grid = document.getElementById('crossword');
    grid.innerHTML = '';
    gridCells = []; 
    
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
    gridCells.forEach(cell => {
        cell.textContent = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    });

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

function checkAnswer(word) {
    const targetWord = WORDS.find(w => w.word === word);
    
    if (!targetWord) return false;
    
    const isCorrect = verifyWordPlacement(targetWord);
    
    if (isCorrect) {
        score += 2;
        return true;
    }
    
    return false;
}

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
