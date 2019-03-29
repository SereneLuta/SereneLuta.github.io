//variables//
let simonArray = [];
let playerArray = [];
let onArray = []; //flash sequence when game is turned on
let loseGameArray = []; //holds looped message when they fail
let simonArrayIndex;
let flashInterval;
let turnCountHolder; //holds the count of turnHolders
let isSimonTurn = true;
let isGood = false;
let isHard = false;
let hasNoise = true;
let isOn = false;
let hasWon = false;
let hasLost = false;

//JavaScript const's aka cannot be reassigned//
//querySelector: connects JS to HTML/CSS through CSS selector
const turnCounter = document.querySelector("#turn-counter");
const topLeft = document.querySelector("#top-left");
const topRight = document.querySelector("#top-right");
const bottomLeft = document.querySelector("#bottom-left");
const bottomRight = document.querySelector("#bottom-right");
const hardSwitch = document.querySelector("#difficulty");
const onSwitch = document.querySelector("#power-on");
const startButton = document.querySelector("#start-button");

//css transitions for scrolling message when game starts

function playGame() {
    hasWon = false;
    hasNoise = true;
    simonArray = [];
    playerArray = [];
    simonArrayIndex = 0;
    flashInterval = 0;
    turnCountHolder = 1;
    turnCounter.innerText = turnCountHolder;
    isGood = true;
    //forLoop creating array of random numbers 1-4 at the start of the game (connected to my four Simon sections)
    for (let i = 0; i < 15; i++) {
        simonArray.push(Math.floor(Math.random() * 4) + 1);
    }
    isSimonTurn = true;
    flashInterval = setInterval(gameTurn, 800);
}

function gameTurn() {
    isOn = false;

    if (simonArrayIndex == turnCountHolder) {
        clearInterval(flashInterval);
        isSimonTurn = false;
        clearColor();
        isOn = true;
    }

    if (isSimonTurn == true) {
      clearColor();
      setTimeout(() => {
            if (simonArray[simonArrayIndex] == 1) {
                oneBlue();
            }
            if (simonArray[simonArrayIndex] == 2) {
                twoGreen();
            }
            if (simonArray[simonArrayIndex] == 3) {
                threeRed();
            }
            if (simonArray[simonArrayIndex] == 4) {
                fourYellow();
            }
            simonArrayIndex++;
        }, 200);
    }
}


function check() {
    //if the last element in playerArray does not equal the same element at playerArray's last index
    if (playerArray[playerArray.length - 1] !== simonArray[playerArray.length - 1]){
        isGood = false;
        wrongFunction();
    }

    if (playerArray.length == 15 && isGood == true) {
        winGame();
    }

    if (turnCountHolder == playerArray.length && isGood && !hasWon) {
        turnCountHolder++;
        playerArray = [];
        isSimonTurn = true;
        simonArrayIndex = 0;
        turnCounter.innerHTML = turnCountHolder;
        flashInterval = setInterval(gameTurn, 800);
    }

}

function wrongFunction() {
    flashColor();
        turnCounter.innerText = "WRONG";
        setTimeout(() => {
            turnCounter.innerText = turnCountHolder;
            clearColor();
            if(isHard == true) {
                loseGame();
             } else {
                turnCountHolder = turnCountHolder;
                playerArray = []; 
                isSimonTurn = true;
                simonArrayIndex = 0;
                isGood = true;
                flashInterval = setInterval(gameTurn, 800);
        }},800);
}
//topLeft.classList.add('active') - put these colors in CSS ()
function clearColor() {
    topLeft.style.backgroundColor = "rgb(47,130,192)";
    topRight.style.backgroundColor = "rgb(81,160,78)";
    bottomRight.style.backgroundColor = "rgb(229,74,94)";
    bottomLeft.style.backgroundColor = "rgb(225,191,44)";
}

function flashColor() {
    topLeft.style.backgroundColor = "rgb(118,249,251)";
    topRight.style.backgroundColor = "rgb(120,237,158)";
    bottomRight.style.backgroundColor = "rgb(232,104,166)";
    bottomLeft.style.backgroundColor = "rgb(252,251,193)";
}

function oneBlue() {
    if (hasNoise) {
        topLeft.style.backgroundColor = "rgb(118,249,251)";
        let audioBlue = document.getElementById("blue_sound");
        audioBlue.playbackRate = 3.5;
        audioBlue.play();
    }
}

function twoGreen() {
    if (hasNoise) {
        topRight.style.backgroundColor = "rgb(120,237,158)";
        let audioGreen = document.getElementById("green_sound");
        audioGreen.playbackRate = 3.5;
        audioGreen.play();
    }
}

function threeRed() {
    if (hasNoise) {
        bottomRight.style.backgroundColor = "rgb(232,104,166)";
        let audioRed = document.getElementById("red_sound");
        audioRed.playbackRate = 3.5;
        audioRed.play();
    }
}

function fourYellow() {
    if (hasNoise) {
        bottomLeft.style.backgroundColor = "rgb(250,251,196)";
        let audioYellow = document.getElementById("yellow_sound");
        audioYellow.playbackRate = 3.5;
        audioYellow.play();
    }
}

//idea: loop through string array of "Game Over" until start is clicked
function loseGame() {
    flashColor();
    turnCounter.innerText = "FAILED";
    isOn = false;
    hasLost = true;
}

function winGame() {
    flashColor();
    turnCounter.innerText = "WINNER";
    isOn = false;
    hasWon = true;
}

//Event listeners will be active once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    onSwitch.addEventListener('click', (event) => {
        if (onSwitch.checked == true) {
            isOn = true;
            turnCounter.innerText = "-";
        } else {
            isOn = false;
            turnCounter.innerText = "";
            clearColor();
            clearInterval(flashInterval);
        }
    });
    
    hardSwitch.addEventListener('click', (event) => {
        if(hardSwitch.checked == true) {
            isHard = true;
        } else {
            isHard = false;
        }
    });
    
    startButton.addEventListener('click', (event) => {
        if (isOn == true || hasWon == true || hasLost == true) {
            playGame();
        }
    });

    topLeft.addEventListener('click', (event) => {
        if (isOn) {
            playerArray.push(1);
            check();
            oneBlue();
            if (!hasWon) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    })
    
    topRight.addEventListener('click', (event) => {
        if (isOn) {
            playerArray.push(2);
            check();
            twoGreen();
            if (!hasWon) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    })
    
    bottomRight.addEventListener('click', (event) => {
        if (isOn) {
            playerArray.push(3);
            check();
            threeRed();
            if (!hasWon) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    })
    
    bottomLeft.addEventListener('click', (event) => {
        if (isOn) {
            playerArray.push(4);
            check();
            fourYellow();
            if (!hasWon) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    })
});
