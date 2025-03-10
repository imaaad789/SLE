// Main class to manage all phases
class QuizManager {
    private currentPhase = 0
    private totalScore = 0
    private phase1: Phase1_De_Chaque_Niveau
    private phase2: Phase2_De_Chaque_Niveau
    private phase3: Phase3_de_chaque_Niveau
  
    constructor() {
      try {
        this.phase1 = new Phase1_De_Chaque_Niveau(questions_phase1, choices_phase1, correctAnswers_phase1)
        this.phase2 = new Phase2_De_Chaque_Niveau(photo_phase1, photo_answer1)
        this.phase3 = new Phase3_de_chaque_Niveau(arabicSentences, englishSentences)
        this.setupEventListeners()
      } catch (error) {
        this.handleError(error, "Error initializing quiz manager")
      }
    }
  
    private setupEventListeners(): void {
      try {
        document.getElementById("start-btn")?.addEventListener("click", () => {
          this.startQuiz()
        })
      } catch (error) {
        this.handleError(error, "Error setting up event listeners")
      }
    }
  
    private startQuiz(): void {
      try {
        const startElement = document.getElementsByClassName("start")[0] as HTMLElement
        if (startElement) {
          startElement.style.display = "none"
        }
        this.showCurrentPhase()
      } catch (error) {
        this.handleError(error, "Error starting quiz")
      }
    }
  
    private showCurrentPhase(): void {
      try {
        // Clear main content
        const main = document.querySelector("main")
        if (!main) throw new Error("Main element not found")
        main.innerHTML = ""
  
        // Display phase indicator
        const phaseIndicator = document.createElement("div")
        phaseIndicator.className = "phase-indicator"
        phaseIndicator.innerHTML = `<h2>Phase ${this.currentPhase + 1} of 3</h2>`
        main.appendChild(phaseIndicator)
  
        // Show appropriate phase
        switch (this.currentPhase) {
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
            this.showFinalResults()
        }
      } catch (error) {
        this.handleError(error, "Error displaying current phase")
      }
    }
  
    private moveToNextPhase(score: number): void {
      try {
        this.totalScore += score
        this.currentPhase++
  
        if (this.currentPhase < 3) {
          this.showCurrentPhase()
        } else {
          this.showFinalResults()
        }
      } catch (error) {
        this.handleError(error, "Error moving to next phase")
      }
    }
  
    private showFinalResults(): void {
      try {
        const main = document.querySelector("main")
        if (!main) throw new Error("Main element not found")
  
        main.innerHTML = ""
  
        const resultsContainer = document.createElement("div")
        resultsContainer.className = "results-container"
  
        resultsContainer.innerHTML = `
          <h1>Quiz Completed!</h1>
          <h2>Your Final Score: ${this.totalScore} points</h2>
          <button id="restart-quiz">Restart Quiz</button>
        `
  
        main.appendChild(resultsContainer)
  
        document.getElementById("restart-quiz")?.addEventListener("click", () => {
          this.currentPhase = 0
          this.totalScore = 0
          this.showCurrentPhase()
        })
      } catch (error) {
        this.handleError(error, "Error showing final results")
      }
    }
  
    private handleError(error: unknown, context: string): void {
      console.error(`${context}:`, error)
  
      // Display user-friendly error message
      const errorMessage = document.createElement("div")
      errorMessage.className = "error-message"
      errorMessage.innerHTML = `
        <h3>Something went wrong</h3>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        <p>Error details: ${context}</p>
      `
  
      const main = document.querySelector("main")
      if (main) {
        main.innerHTML = ""
        main.appendChild(errorMessage)
      } else {
        document.body.appendChild(errorMessage)
      }
    }
  }
  
  class Phase1_De_Chaque_Niveau {
    constructor(
      private question: string[],
      private choix: string[][],
      private correct_answer: string[],
    ) {}
  
    afficheQuize(onComplete: (score: number) => void): void {
      try {
        const main = document.querySelector("main")
        if (!main) throw new Error("Main element not found")
  
        const quiz_container = document.createElement("div")
        quiz_container.className = "quiz-container"
  
        this.question.forEach((element_Q, index) => {
          try {
            const question = document.createElement("div")
            const options_container = document.createElement("div")
  
            question.className = "question"
            options_container.className = "options-container"
  
            question.innerHTML = `Q${index + 1} : ${element_Q}`
            quiz_container.appendChild(question)
  
            if (!this.choix[index]) throw new Error(`Choices not found for question ${index + 1}`)
  
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
            })
  
            quiz_container.appendChild(options_container)
          } catch (error) {
            console.error(`Error rendering question ${index + 1}:`, error)
            // Continue with other questions
          }
        })
  
        const valideDiv = document.createElement("div")
        valideDiv.className = "valide-btn"
        valideDiv.id = "valide-btn1"
  
        const previousButtonDiv = document.createElement("div")
        const previousButton = document.createElement("button")
        previousButton.id = "Previous"
        previousButton.textContent = "Previous"
        previousButton.disabled = true // Disabled in Phase 1
        previousButtonDiv.appendChild(previousButton)
        valideDiv.appendChild(previousButtonDiv)
  
        const nextButtonDiv = document.createElement("div")
        const nextButton = document.createElement("button")
        nextButton.id = "next"
        nextButton.textContent = "Submit Answers"
        nextButton.addEventListener("click", () => {
          try {
            const score = this.checkanswer()
            onComplete(score)
          } catch (error) {
            console.error("Error checking answers:", error)
            alert("There was a problem checking your answers. Please try again.")
          }
        })
        nextButtonDiv.appendChild(nextButton)
        valideDiv.appendChild(nextButtonDiv)
  
        quiz_container.appendChild(valideDiv)
        main.appendChild(quiz_container)
      } catch (error) {
        console.error("Error displaying quiz:", error)
        throw new Error("Failed to display quiz")
      }
    }
  
    checkanswer(): number {
      try {
        let score = 0
        let unansweredQuestions = 0
  
        this.question.forEach((element, index_question) => {
          try {
            const answer_checked = document.querySelector(
              `input[name="answer${index_question}"]:checked`,
            ) as HTMLInputElement
  
            if (!answer_checked) {
              unansweredQuestions++
              return
            }
  
            if (answer_checked.value === this.correct_answer[index_question]) {
              score = score + 2
            }
          } catch (error) {
            console.error(`Error checking answer for question ${index_question + 1}:`, error)
          }
        })
  
        if (unansweredQuestions > 0) {
          if (!confirm(`You have ${unansweredQuestions} unanswered question(s). Do you want to continue?`)) {
            throw new Error("User canceled submission due to unanswered questions")
          }
        }
  
        return score
      } catch (error) {
        console.error("Error in checkanswer:", error)
        throw error
      }
    }
  }
  
  class Phase2_De_Chaque_Niveau {
    constructor(
      private photo_link: string[],
      private answer_photo: string[],
    ) {}
  
    affichePhoto(onComplete: (score: number) => void): void {
      try {
        const main = document.querySelector("main")
        if (!main) throw new Error("Main element not found")
  
        const cont_image = document.createElement("div")
        cont_image.className = "container-image"
  
        const h1_Quiz = document.createElement("h1")
        h1_Quiz.textContent = "Image Quiz"
        cont_image.appendChild(h1_Quiz)
  
        this.photo_link.forEach((element, index) => {
          try {
            const image_items = document.createElement("div")
            image_items.className = "image-item"
  
            const image_container = document.createElement("div")
            image_container.className = "image-container"
  
            const img = document.createElement("img")
            img.src = element
            img.alt = "image" + index
            img.onerror = () => {
              img.src = "/placeholder.svg?height=200&width=200"
              img.alt = "Image failed to load"
              console.error(`Failed to load image: ${element}`)
            }
  
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
          } catch (error) {
            console.error(`Error rendering image ${index + 1}:`, error)
            // Continue with other images
          }
        })
  
        const div_btn = document.createElement("div")
        div_btn.className = "button-container"
  
        const previousButton = document.createElement("button")
        previousButton.textContent = "Previous"
        previousButton.addEventListener("click", () => {
          if (confirm("Going back will lose your progress in this phase. Continue?")) {
            onComplete(-2) // Special value to indicate going back
          }
        })
        div_btn.appendChild(previousButton)
  
        const btn_next = document.createElement("button")
        btn_next.textContent = "Submit Answers"
        btn_next.addEventListener("click", () => {
          try {
            const score = this.CheckAnswerPhoto()
            onComplete(score)
          } catch (error) {
            console.error("Error checking answers:", error)
            alert("There was a problem checking your answers. Please try again.")
          }
        })
        div_btn.appendChild(btn_next)
  
        cont_image.appendChild(div_btn)
        main.appendChild(cont_image)
      } catch (error) {
        console.error("Error displaying photo quiz:", error)
        throw new Error("Failed to display photo quiz")
      }
    }
  
    CheckAnswerPhoto(): number {
      try {
        let score = 0
        const Input_answer = document.querySelectorAll('input[type="text"]')
  
        Input_answer.forEach((element1, index1) => {
          try {
            const inputElement = element1 as HTMLInputElement
            const userAnswer = inputElement.value.trim().toLowerCase()
            const correctAnswer = this.answer_photo[index1].toLowerCase()
  
            if (userAnswer === correctAnswer) {
              score = score + 2
              inputElement.style.borderColor = "green"
            } else if (userAnswer === "") {
              // No points for unanswered
              inputElement.style.borderColor = "orange"
            } else {
              inputElement.style.borderColor = "red"
            }
          } catch (error) {
            console.error(`Error checking answer for image ${index1 + 1}:`, error)
          }
        })
  
        return score
      } catch (error) {
        console.error("Error in CheckAnswerPhoto:", error)
        throw error
      }
    }
  }
  
  class Phase3_de_chaque_Niveau {
    constructor(
      private arSentences: string[],
      private enSentences: string[],
    ) {}
  
    AfficheSentences(onComplete: (score: number) => void): void {
      try {
        const main = document.querySelector("main")
        if (!main) throw new Error("Main element not found")
  
        const container_sentence = document.createElement("div")
        container_sentence.className = "container-sentence"
  
        const sentence_h1 = document.createElement("h1")
        sentence_h1.textContent = "Translate the Arabic sentences to English"
        container_sentence.appendChild(sentence_h1)
  
        this.arSentences.forEach((element, index) => {
          try {
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
            label.htmlFor = "sentence-input-" + index
            label.textContent = "Your translation: "
  
            const input = document.createElement("input")
            input.type = "text"
            input.name = "sentence-input-" + index
            input.id = "sentence-input-" + index
            input.placeholder = "Type your translation here"
  
            input_sentence.appendChild(label)
            input_sentence.appendChild(input)
  
            sentence_item.appendChild(sentence_container)
            sentence_item.appendChild(input_sentence)
            container_sentence.appendChild(sentence_item)
          } catch (error) {
            console.error(`Error rendering sentence ${index + 1}:`, error)
            // Continue with other sentences
          }
        })
  
        const div_btn = document.createElement("div")
        div_btn.className = "button-sentence"
  
        const previousButton = document.createElement("button")
        previousButton.textContent = "Previous"
        previousButton.addEventListener("click", () => {
          if (confirm("Going back will lose your progress in this phase. Continue?")) {
            onComplete(-2) // Special value to indicate going back
          }
        })
        div_btn.appendChild(previousButton)
  
        const btn_next = document.createElement("button")
        btn_next.textContent = "Submit Translations"
        btn_next.addEventListener("click", () => {
          try {
            const score = this.CheckAnswerSentence()
            onComplete(score)
          } catch (error) {
            console.error("Error checking translations:", error)
            alert("There was a problem checking your translations. Please try again.")
          }
        })
        div_btn.appendChild(btn_next)
  
        container_sentence.appendChild(div_btn)
        main.appendChild(container_sentence)
      } catch (error) {
        console.error("Error displaying sentences:", error)
        throw new Error("Failed to display sentences")
      }
    }
  
    CheckAnswerSentence(): number {
      try {
        let score = 0
        // Fixed: Using querySelectorAll instead of querySelector
        const inputElements = document.querySelectorAll('input[type="text"]')
  
        inputElements.forEach((element, index) => {
          try {
            const inputElement = element as HTMLInputElement
            const userAnswer = inputElement.value.trim()
  
            // More flexible matching - case insensitive and ignoring trailing punctuation
            const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[.,!?]$/, "")
            const normalizedCorrectAnswer = this.enSentences[index].toLowerCase().replace(/[.,!?]$/, "")
  
            if (normalizedUserAnswer === normalizedCorrectAnswer) {
              score = score + 2
              inputElement.style.borderColor = "green"
            } else if (userAnswer === "") {
              // No points for unanswered
              inputElement.style.borderColor = "orange"
            } else {
              inputElement.style.borderColor = "red"
            }
          } catch (error) {
            console.error(`Error checking translation for sentence ${index + 1}:`, error)
          }
        })
  
        return score
      } catch (error) {
        console.error("Error in CheckAnswerSentence:", error)
        throw error
      }
    }
  }
  
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
  
  // phase3
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
    "I love apples.",
    "I live in Paris.",
    "This is a big book.",
    "Where is the market?",
    "I study Arabic.",
    "The cat is on the table.",
    "I have a red car.",
    "I drink water.",
    "My sister works as a teacher.",
    "The weather is hot today.",
  ]
  
  // Initialize the quiz manager when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const quizManager = new QuizManager()
    } catch (error) {
      console.error("Failed to initialize quiz:", error)
      alert("There was a problem loading the quiz. Please refresh the page.")
    }
  })
  
  