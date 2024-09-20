let gameSequence = [];
let userSequence = [];

let btns = ["yellow", "green", "red", "purple"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    // choose a random button
    let rndidx = Math.floor(Math.random() * 4);
    let rndcolor = btns[rndidx];
    let rndBtn = document.querySelector(`.${rndcolor}`);
    gameSequence.push(rndcolor);
    console.log(gameSequence);
    gameflash(rndBtn);
}

function checkAns(idx){
    
    

    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            
            setTimeout(levelup,1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! your score was <b> ${level-1} </b>. <br> Press any key to start the game`; 
        document.querySelector("body").style.backgroundColor= "red"; 
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "white";   
        } , 250);
        reset();
    }
}

function btnPress() {

    let btn = this ;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userSequence.push(usercolor);
    checkAns(userSequence.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress); 
}

function reset(){
started = false;
gameSequence = [];
userSequence = [];
level = 0;
}
