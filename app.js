let gameSeq = [];
let userSeq = [];
let btns = ["red", "blue", "green", "orange"];
let level = 0;
let hghscore = 0;
let started = false;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
const heading = document.getElementById("game");
const highScore = document.getElementById("high");
const textWidth = heading.offsetWidth;
const halfScreenWidth = window.innerWidth / 2-textWidth / 2;
heading.style.transform = `translateX(${halfScreenWidth}px)`;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);

}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp() {
    level++;
    h2.innerText = ("Level " + level);
    let randNum = Math.floor(Math.random() * 4);
    let randColor = btns[randNum];
    let randBtn = document.querySelector("." + randColor);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    userSeq = [];
}
function checkAnswer(idx) {
    
    
    if (gameSeq[idx] === userSeq[idx]) {
            
        if (userSeq.length === gameSeq.length) {
            if(hghscore < level) {
                hghscore = level;
                highScore.innerHTML = `Highscore: <b>${hghscore}</b>`;
            }
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Wrong");
        h2.innerHTML = "GAME OVER";
        body.classList.add("wrong");
        setTimeout(function () {
            body.classList.remove("wrong");
        }, 300);
        h2.innerHTML = `Your Score was <b>${level-1}</b> <br> Press Any Key to Restart`;
        started = false;
        gameSeq = [];
        userSeq = [];
       
        level = 0;
    }
}
function buttonClick(event) {
    let btn = event.target;
    if (started) {
        userFlash(btn);
        let userColor = btn.classList[1];
        userSeq.push(userColor);
        checkAnswer(userSeq.length - 1);
    }
    // checkAnswer(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
    btn.addEventListener("click", buttonClick);
});