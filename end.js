let username = document.getElementById("username")
let saveScoreBtn = document.getElementById("saveHightScore")
let finalScore= document.getElementById("finalScore")
let mostRecentScore =localStorage.getItem("mostRecentScore")

let highScores = JSON.parse(localStorage.getItem("highScores")) || []
let maxHighScore = 5
finalScore.innerText  = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveScoreBtn.onclick=(function(e){
    console.log("clicked save")
    e.preventDefault();

const score ={
    score: Math.floor(Math.random() * 100),
    name: username.value,
};
highScores.push(score);
highScores.sort((a,b) => b.score - a.score)
highScores.splice(5)

localStorage.setItem("highScores" ,JSON.stringify(highScores))
window.location.assign("/")

console.log(highScores)
})



