let gameSequence = [];
let userSequence = [];

let btns = ["shade-1", "shade-2", "shade-3", "shade-4"];

let statusText = document.querySelector("#status-text");
let currentScoreDisplay = document.querySelector("#current-score");
let highScoreDisplay = document.querySelector("#high-score");

let started = false;
let level = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;

highScoreDisplay.innerText = highScore;

// Start game on keydown or touchstart
document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame, {once: true}); 

function startGame() {
    if (!started) {
        started = true;
        document.body.classList.remove("game-over");
        levelup();
    }
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 350);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}

function levelup() {
    userSequence = [];
    level++;
    statusText.innerText = `Level ${level}`;
    currentScoreDisplay.innerText = level - 1;

    // choose a random button
    let rndidx = Math.floor(Math.random() * 4);
    let rndcolor = btns[rndidx];
    let rndBtn = document.querySelector(`#${rndcolor}`);
    gameSequence.push(rndcolor);
    
    // Delay slightly so user can prepare for the next sequence flash
    setTimeout(() => {
        gameflash(rndBtn);
    }, 600);
}

function checkAns(idx) {
    if(userSequence[idx] === gameSequence[idx]) {
        if(userSequence.length == gameSequence.length) {
            currentScoreDisplay.innerText = level;
            setTimeout(levelup, 1000);
        }
    } else {
        // Game Over Logic
        let finalScore = level - 1;
        statusText.innerHTML = `Game Over! Press any key to restart`; 
        currentScoreDisplay.innerText = finalScore;
        
        document.body.classList.add("game-over");
        
        if (finalScore > highScore) {
            highScore = finalScore;
            localStorage.setItem("simonHighScore", highScore);
            highScoreDisplay.innerText = highScore;
            statusText.innerHTML = `New Best! Press any key to restart`; 
        }

        reset();
    }
}

function btnPress() {
    if (!started) return; // Ignore clicks if game hasn't started

    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userSequence.push(usercolor);
    checkAns(userSequence.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress); 
}

function reset() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
    
    // Re-attach touchstart for mobile users to restart easily
    document.addEventListener("touchstart", startGame, {once: true}); 
}
