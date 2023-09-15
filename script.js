let question = document.getElementById("question")
let choices = Array.from( document.getElementsByClassName("choice-text"))
let progressText = document.getElementById("progressText");
let progressParFull = document.getElementById("progress-par-full");
let scoreText = document.getElementById("score")
let loader = document.getElementById("loader")
let game = document.getElementById("game")

let currentQuestion = {};
let acceptAnswer = false ;
let score = 0;
let questionCounter = 0;
let availableQuestion =[];

let questions = []

fetch("questions.json").then(res =>{
  return res.json()

}).then(loadedQuestions=>{

  questions = loadedQuestions;
   
  startGame();
}).catch(err =>{
  
  console.log(err)
})
  let correct_bonus = 10
  let max_questions = 6;

  startGame = ()=>{
    questionCounter = 0
    score = 0;
    availableQuestion = [...questions]

    getNewQuestion()

    game.classList.remove("hidden")
    loader.classList.add("hidden")
  }

   getNewQuestion = ()=>{

    if(availableQuestion.length === 0 || questionCounter >= max_questions){
     localStorage.setItem("mostRecentScore",score)
   
     
      return window.location.assign("/end.html")
    }
    questionCounter ++;

    progressText.innerText =`Questions ${questionCounter} / ${max_questions}`
    progressParFull.style.width=`${(questionCounter /  max_questions) *100}%`

    let questionIndex = Math.floor(Math.random()* availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        let number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
       
    });

    availableQuestion.splice(questionIndex , 1)
    acceptAnswer = true
}

choices.forEach(e =>{
    e.addEventListener("click",e=>{
       if(!acceptAnswer)return;
       acceptAnswer = false;
       let selectedChoice = e.target;
       let selectAnswer = selectedChoice.dataset["number"]

       let classToApply =
       selectAnswer == currentQuestion.answer ?"correct" : "incorrect"
       console.log(classToApply)

       if(classToApply ==="correct"){
     incrementScore(correct_bonus)
       }
       selectedChoice.parentElement.classList.add(classToApply)

       setTimeout(()=>{
         selectedChoice.parentElement.classList.remove(classToApply)
       getNewQuestion()
       },500)
      
    })
})


function incrementScore(num){
  score += num
 scoreText.innerText=score 
}

