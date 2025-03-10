// ****A1*****
// phase1
const questions_phase1 = [
  "What is the correct sentence?",
  "Choose the correct word: 'I ____ a student.'",
  "What is the opposite of 'big'?",
  "What is the correct plural of 'child'?",
  "Choose the correct question:",
  "What time is '3:45'?",
  "Which sentence is correct?",
  "What is the opposite of 'happy'?",
  "Choose the correct sentence:",
  "What is the correct response to: 'How are you?'",
]

const choices_phase1 = [
  ["A) She have a cat.", "B) She has a cat.", "C) She haves a cat.", "D) She are a cat."],
  ["A) is", "B) be", "C) am", "D) are"],
  ["A) Large", "B) Tall", "C) Small", "D) Fast"],
  ["A) Childs", "B) Childes", "C) Children", "D) Childies"],
  ["A) Where you live?", "B) Where do you live?", "C) Where are live you?", "D) Where does live you?"],
  ["A) Three past forty-five", "B) A quarter to four", "C) Three before forty-five", "D) Four to quarter"],
  [
    "A) He go to school every day.",
    "B) He goes to school every day.",
    "C) He going to school every day.",
    "D) He gone to school every day.",
  ],
  ["A) Sad", "B) Hungry", "C) Tired", "D) Angry"],
  ["A) She like apples.", "B) She likes apples.", "C) She liking apples.", "D) She liked apples."],
  ["A) I am fine, thank you.", "B) I fine, thanks.", "C) I is fine, thank you.", "D) Fine am I, thank you."],
]

const correctAnswers_phase1 = [
  "B) She has a cat.",
  "C) am",
  "C) Small",
  "C) Children",
  "B) Where do you live?",
  "B) A quarter to four",
  "B) He goes to school every day.",
  "A) Sad",
  "B) She likes apples.",
  "A) I am fine, thank you.",
]
// *********************************************************************
// phase2
const photo_phase1 = [
  "../img/imagA1/bed.jfif",
  "../img/imagA1/bird.jfif",
  "../img/imagA1/cat.jpg",
  "../img/imagA1/horse.jfif",
  "../img/imagA1/Hospital.jpg",
  "../img/imagA1/Library.jfif",
  "../img/imagA1/milk.jfif",
  "../img/imagA1/plane.jfif",
  "../img/imagA1/Supermarket.jfif",
  "../img/imagA1/table.jfif",
]
const photo_answer1 = ["bed", "bird", "cat", "horse", "hospital", "library", "milk", "plane", "supermarket", "table"]
// *********************************************************************
// phase2
const arabicSentences = [
  "أنا أحب التفاح",
  "أنا أعيش في باريس",
  "هذا كتاب كبير",
  "أين السوق؟",
  "أنا أدرس اللغة العربية",
  "القط على الطاولة",
  "عندي سيارة حمراء",
  "أنا أشرب الماء",
  "أختي تعمل معلمة",
  "الجو حار اليوم",
]
const englishSentences = [
  "I love apples",
  "I live in Paris",
  "This is a big book",
  "Where is the market?",
  "I study Arabic",
  "The cat is on the table",
  "I have a red car",
  "I drink water",
  "My sister works as a teacher",
  "The weather is hot today",
]
// *********************************************************************

class Phase1_De_Chaque_Niveau {
  constructor(question, choix, correct_answer) {
    this.question = question
    this.choix = choix
    this.correct_answer = correct_answer
    this.callback = null
  }

  afficheQuize(callback) {
    this.callback = callback
    const main = document.querySelector("main")
    main.innerHTML = "" // Clear previous content

    const quiz_container = document.createElement("div")
    quiz_container.className = "quiz-container"

    this.question.forEach((element_Q, index) => {
      const question = document.createElement("div")
      const options_container = document.createElement("div")

      question.className = "question"
      options_container.className = "options-container"

      question.innerHTML = `Q${index + 1} : ${element_Q}`
      quiz_container.appendChild(question)
      this.choix[index].forEach((element_C) => {
        const option = document.createElement("div")
        option.className = "option"

        const label = document.createElement("label")
        const input = document.createElement("input")
        input.type = "radio"
        input.name = "answer" + index
        input.value = element_C

        const span = document.createElement("span")
        span.className = "option-text"
        span.innerHTML = element_C

        label.appendChild(input)
        label.appendChild(span)
        option.appendChild(label)
        options_container.appendChild(option)
        quiz_container.appendChild(options_container)
      })
    })

    const valideDiv = document.createElement("div")
    valideDiv.className = "valide-btn"
    valideDiv.id = "valide-btn1"

    const previousButtonDiv = document.createElement("div")
    const previousButton = document.createElement("button")
    previousButton.id = "Previous"
    previousButton.textContent = "Previous"
    previousButton.addEventListener("click", () => {
      // Handle previous button click if needed
      // For now, just alert that this is the first phase
      alert("This is the first phase of the quiz!")
    })
    previousButtonDiv.appendChild(previousButton)
    valideDiv.appendChild(previousButtonDiv)

    const nextButtonDiv = document.createElement("div")
    const nextButton = document.createElement("button")
    nextButton.id = "next"
    nextButton.textContent = "Next"
    nextButton.addEventListener("click", () => {
      this.checkanswer()
    })
    nextButtonDiv.appendChild(nextButton)
    valideDiv.appendChild(nextButtonDiv)

    quiz_container.appendChild(valideDiv)
    main.appendChild(quiz_container)
  }

  checkanswer() {
    let score = 0
    let allAnswered = true

    this.question.forEach((element, index_question) => {
      const answer_checked = document.querySelector(`input[name="answer${index_question}"]:checked`)
      if (!answer_checked) {
        allAnswered = false
        return
      }

      if (answer_checked.value === this.correct_answer[index_question]) {
        score = score + 2
      }
    })

    if (!allAnswered) {
      alert("Please answer all questions before proceeding!")
      return
    }

    alert(`Phase 1 completed! Your score: ${score}/${this.question.length * 2}`)

    // Call the callback to move to the next phase
    if (this.callback) {
      this.callback()
    }
  }
}

class Phase2_De_Chaque_Niveau {
  constructor(photo_link, answer_photo) {
    this.photo_link = photo_link
    this.answer_photo = answer_photo
    this.callback = null
  }

  affichePhoto(callback) {
    this.callback = callback
    const main = document.querySelector("main")
    main.innerHTML = "" // Clear previous content

    const cont_image = document.createElement("div")
    cont_image.className = "container-image"

    const h1_Quiz = document.createElement("h1")
    h1_Quiz.textContent = "Image Quiz"
    cont_image.appendChild(h1_Quiz)

    this.photo_link.forEach((element, index) => {
      const image_items = document.createElement("div")
      image_items.className = "image-item"

      const image_container = document.createElement("div")
      image_container.className = "image-container"

      const img = document.createElement("img")
      img.src = element
      img.alt = "image" + index

      image_container.appendChild(img)

      const input_container = document.createElement("div")
      input_container.className = "input-container"
      const label = document.createElement("label")
      label.htmlFor = "answer" + index
      label.textContent = "Your answer : "

      const input = document.createElement("input")
      input.type = "text"
      input.name = "answer" + index
      input.id = "answer" + index
      input.placeholder = "Type your answer here"

      input_container.appendChild(label)
      input_container.appendChild(input)

      image_items.appendChild(image_container)
      image_items.appendChild(input_container)

      cont_image.appendChild(image_items)
    })

    const div_btn = document.createElement("div")
    div_btn.className = "button-container"

    const btn_previous = document.createElement("button")
    btn_previous.id = "Previous"
    btn_previous.textContent = "Previous"
    btn_previous.addEventListener("click", () => {
      if (confirm("Are you sure you want to go back to Phase 1? Your progress will be lost.")) {
        // Go back to phase 0 (which is Phase 1 in the UI)
        const quizManager = new MangerQuize()
        quizManager.phase = -1 // Will become 0 after moveToNextPhase
        quizManager.moveToNextPhase()
      }
    })
    div_btn.appendChild(btn_previous)

    const btn_next = document.createElement("button")
    btn_next.id = "next"
    btn_next.textContent = "Next"
    btn_next.addEventListener("click", () => {
      this.CheckAnswerPhoto()
    })
    div_btn.appendChild(btn_next)

    cont_image.appendChild(div_btn)
    main.appendChild(cont_image)
  }

  CheckAnswerPhoto() {
    let score = 0
    let allAnswered = true

    const Input_answer = document.querySelectorAll('input[type="text"]')
    Input_answer.forEach((element1, index1) => {
      if (element1.value.trim() === "") {
        allAnswered = false
        element1.style.border = "2px solid red"
      } else {
        element1.style.border = ""
        if (element1.value.toLowerCase() === this.answer_photo[index1].toLowerCase()) {
          score = score + 2
        }
      }
    })

    if (!allAnswered) {
      alert("Please answer all questions before proceeding!")
      return
    }

    alert(`Phase 2 completed! Your score: ${score}/${this.photo_link.length * 2}`)

    // Call the callback to move to the next phase
    if (this.callback) {
      this.callback()
    }
  }
}

class Phase3_de_chaque_Niveau {
  constructor(arSentences, enSentences) {
    this.arSentences = arSentences
    this.enSentences = enSentences
    this.callback = null
  }

  AfficheSentences(callback) {
    this.callback = callback
    const main = document.querySelector("main")
    main.innerHTML = "" // Clear previous content

    const container_sentence = document.createElement("div")
    container_sentence.className = "container-sentence"

    const sentence_h1 = document.createElement("h1")
    sentence_h1.textContent = "Translate the Arabic sentences to English"
    container_sentence.appendChild(sentence_h1)

    this.arSentences.forEach((element, index) => {
      const sentence_item = document.createElement("div")
      sentence_item.className = "sentence-item"

      const sentence_container = document.createElement("div")
      sentence_container.className = "sentence-container"

      const p = document.createElement("p")
      p.textContent = element
      p.id = "sentence-text-" + index
      sentence_container.appendChild(p)

      const input_sentence = document.createElement("div")
      input_sentence.className = "input-sentence"

      const label = document.createElement("label")
      label.htmlFor = "sentence" + index
      label.textContent = "Your answer : "

      const input = document.createElement("input")
      input.type = "text"
      input.name = "sentence" + index
      input.id = "sentence" + index
      input.placeholder = "Type your answer here"

      input_sentence.appendChild(label)
      input_sentence.appendChild(input)

      sentence_item.appendChild(sentence_container)
      sentence_item.appendChild(input_sentence)
      container_sentence.appendChild(sentence_item)
    })

    const div_btn = document.createElement("div")
    div_btn.className = "button-sentence"

    const btn_previous = document.createElement("button")
    btn_previous.id = "previous"
    btn_previous.textContent = "Previous"
    btn_previous.addEventListener("click", () => {
      if (confirm("Are you sure you want to go back to Phase 2? Your progress will be lost.")) {
        // Go back to phase 1 (which is Phase 2 in the UI)
        const quizManager = new MangerQuize()
        quizManager.phase = 0 // Will become 1 after moveToNextPhase
        quizManager.moveToNextPhase()
      }
    })
    div_btn.appendChild(btn_previous)

    const btn_next = document.createElement("button")
    btn_next.textContent = "Finish"
    btn_next.id = "next"
    btn_next.addEventListener("click", () => {
      this.CheckAnswerSentence()
    })

    div_btn.appendChild(btn_next)
    container_sentence.appendChild(div_btn)
    main.appendChild(container_sentence)
  }

  CheckAnswerSentence() {
    let score = 0
    let allAnswered = true
    let hasNumbers = false

    const Input_answer = document.querySelectorAll('input[type="text"]')
    Input_answer.forEach((element, index) => {
      if (element.value.trim() === "") {
        allAnswered = false
        element.style.border = "2px solid red"
      } else {
        if (/\d/.test(element.value) === true) {
          hasNumbers = true
          element.style.border = "2px solid red"
        } else {
          element.style.border = ""
          // Case-insensitive comparison for more user-friendly experience
          if (element.value.toLowerCase() === this.enSentences[index].toLowerCase()) {
            score = score + 2
          }
        }
      }
    })

    if (!allAnswered) {
      alert("Please answer all questions before proceeding!")
      return
    }

    if (hasNumbers) {
      alert("Answers must not contain numbers. Please correct the highlighted fields.")
      return
    }

    alert(`Quiz completed! Your score in Phase 3: ${score}/${this.arSentences.length * 2}`)

    // Show completion message
    const main = document.querySelector("main")
    main.innerHTML = ""

    const completion = document.createElement("div")
    completion.className = "quiz-completion"
    completion.innerHTML = `
            <h1>Congratulations!</h1>
            <p>You have completed all phases of the quiz.</p>
            <p>Your score in Phase 3: ${score}/${this.arSentences.length * 2}</p>
            <button id="restart">Restart Quiz</button>
        `

    main.appendChild(completion)

    document.getElementById("restart").addEventListener("click", () => {
      const quizManager = new MangerQuize()
      quizManager.phase = -1 // Will become 0 after moveToNextPhase
      quizManager.moveToNextPhase()
    })
  }
}

class MangerQuize {
  phase = -1 // Start at -1 so first moveToNextPhase sets it to 0

  constructor() {
    this.phase1 = new Phase1_De_Chaque_Niveau(questions_phase1, choices_phase1, correctAnswers_phase1)
    this.phase2 = new Phase2_De_Chaque_Niveau(photo_phase1, photo_answer1)
    this.phase3 = new Phase3_de_chaque_Niveau(arabicSentences, englishSentences)
  }

  startQuize() {
    try {
      let main = document.querySelector("main")
      if (!main) {
        main = document.createElement("main")
        document.body.appendChild(main)
      }

      main.innerHTML = "" // Clear previous content

      const phaseIndicator = document.createElement("div")
      phaseIndicator.className = "phase-indicator"
      phaseIndicator.innerHTML = `<h2>Phase ${this.phase + 1} of 3</h2>`
      main.appendChild(phaseIndicator)

      switch (this.phase) {
        case 0:
          this.phase1.afficheQuize(this.moveToNextPhase.bind(this))
          break
        case 1:
          this.phase2.affichePhoto(this.moveToNextPhase.bind(this))
          break
        case 2:
          this.phase3.AfficheSentences(this.moveToNextPhase.bind(this))
          break
        default:
          // Should not reach here
          this.gestionErreur(new Error("Invalid phase"), "Invalid phase number")
          break
      }
    } catch (error) {
      this.gestionErreur(error, `Error displaying Quiz with phase ${this.phase}.`)
    }
  }

  moveToNextPhase() {
    this.phase++
    if (this.phase < 3) {
      this.startQuize()
    } else {
      // Quiz is complete, handled in Phase3's CheckAnswerSentence
      console.log("Quiz completed!")
    }
  }

  gestionErreur(errour, text) {
    const erreurmessage = document.createElement("div")
    erreurmessage.className = "error-message"
    erreurmessage.innerHTML = `
            <h3>Something went wrong</h3>
            <p>Please try refreshing the page. If the problem persists, contact support.</p>
            <p>Error details: ${text}</p>
            <p>${errour}</p>
        `

    const main = document.querySelector("main")
    if (main) {
      main.innerHTML = ""
      main.appendChild(erreurmessage)
    } else {
      document.body.appendChild(erreurmessage)
    }
  }

  startEventClass() {
    try {
      // Initialize the quiz by showing the start screen
      let main = document.querySelector("main")
      if (!main) {
        main = document.createElement("main")
        document.body.appendChild(main)
      }

      main.innerHTML = ""

      const startScreen = document.createElement("div")
      startScreen.className = "start"
      startScreen.innerHTML = `
                <h1>Language Learning Quiz</h1>
                <p>This quiz has three phases:</p>
                <ol>
                    <li>English grammar and vocabulary</li>
                    <li>Image identification</li>
                    <li>Arabic to English translation</li>
                </ol>
                <button id="start-btn">Start Quiz</button>
            `

      main.appendChild(startScreen)

      document.getElementById("start-btn").addEventListener("click", () => {
        this.moveToNextPhase()
      })
    } catch (error) {
      this.gestionErreur(error, "Error setting up event listeners")
    }
  }
}

// Initialize the quiz
const Quiz = new MangerQuize()
Quiz.startEventClass()

