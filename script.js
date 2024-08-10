let welcomeScreen = document.querySelector(".welcome")
let quizScreen = document.querySelector(".quiz")
let resultScreen = document.querySelector(".result")
let startQuizBtn = document.querySelector(".start-quiz-btn")
let answerBtns = document.querySelectorAll(".answer")
let restartQuizBtn = document.querySelector(".restart-quiz-btn")
let quizQuestion = document.querySelector(".quiz_question")
let resultTitle = document.querySelector(".result_title")
let quizCounter = document.querySelector(".quiz_counter span")

let timerElement = document.querySelector(".timer")
let interval
let startTimerValue = 10

function startTimer() {
    timerElement.innerHTML = startTimerValue
    
    interval = setInterval(function () {
       if  (startTimerValue == 1) {
           timerElement.innerHTML = 0
           clearInterval(interval)
           showQuestionResult("red")
           showNextQuestion()
        } else { 
           startTimerValue--
           timerElement.innerHTML = startTimerValue  
        }
    }, 1000)
}
let allQuestion = [
{
    question: "Яка найпопулярніша ігрова онлайн-платформа?",
    answers: ["Origins", "Wargaming", "EpicGames", "EA", "Steam"],
    correctAnswer: "Steam"
},
{
    question: "Хто зробив Steam?",
    answers: ["Valve", "Microsoft", "Apple", "Blizzard", "Electronic Arts"],
    correctAnswer: "Valve"
},    
{
    question: "Хто засновник Microsoft?",
    answers: ["Білл Гейтс","Стів Джобс","Гейб Ньюелл","Тім Суїні","Майклом Морхеймом"],
    correctAnswer:"Білл Гейтс"
},
{
    question: "Яка онлайн платформа найбільш відома своїми відео трансляціями і стрімами?",
    answers: ["YouTube","Facebook","Twitch","Reddit","TikTok"],
    correctAnswer:"Twitch"
},
{
    question: "Яка з наступних платформ відома фотографіями і короткими відео?",
    answers: ["YouTube","TikTok","Instagram","Pinterest","Snapchat"],
    correctAnswer:"Instagram"
}
]
let userPoint = 0
let currQustionNumber = 0

function renderQuestion(quest) {
quizQuestion.innerHTML = quest.question
answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
startTimer()
}
function showQuestionResult(color) {
    quizScreen.style.background = color

    setTimeout(() => {
       quizScreen.style.background = "#133018"
    }, 600)
}
function disabledButton(option) {
    answerBtns.forEach(btn => btn.disabled = option)
}
function runQuiz() {
    deleteActiveScreen()
    quizScreen.classList.add("active")
    userPoint = 0
    currQustionNumber = 0
    renderQuestion(allQuestion[currQustionNumber])
    quizCounter.innerHTML = currQustionNumber + 1
}

function finishQuiz() {
    deleteActiveScreen()
    resultScreen.classList.add("active")
    resultTitle.innerHTML = `Вітаю, ти закінчив опитування і отримав ${userPoint} з ${allQuestion.length}`
}

function deleteActiveScreen() {
    welcomeScreen.classList.remove("active")
    quizScreen.classList.remove("active")
    resultScreen.classList.remove("active")
}

startQuizBtn.addEventListener("click", runQuiz)
restartQuizBtn.addEventListener("click", runQuiz)
  
answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(interval)  
      
        if (btn.innerHTML == allQuestion[currQustionNumber].correctAnswer) {
           userPoint++
           showQuestionResult("lightgreen")
        } else {
           showQuestionResult("red")
        }
       
        showNextQuestion()
    
    })
})
function showNextQuestion() {
   disabledButton(true)

   startTimerValue = 10

   setTimeout(() => {
        if (currQustionNumber == allQuestion.length - 1) {
            finishQuiz()
        } else {
           currQustionNumber++
           renderQuestion(allQuestion[currQustionNumber])
           quizCounter.innerHTML = currQustionNumber + 1
        }
        disabledButton(false)
    },  800)
}
