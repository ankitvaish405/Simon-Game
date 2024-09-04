// Initialize the variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let level = 0;
let h2 = document.querySelector("h2");
let gameActive = false; // To control game state

// Start or restart the game on keypress
document.addEventListener("keypress", function () {
    if (!gameActive) {
        reset(); // Reset and start a new game
        levelup();
    }
});

// Flash the game's sequence button
function gameFlash(btn) {
    btn.classList.add("inputflash");
    setTimeout(function () {
        btn.classList.remove("inputflash");
    }, 250);
}

// Flash the user's sequence button
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Move to the next level
function levelup() {
    userSeq = []; // Reset the user's sequence for the new level
    level++; // Increment the level
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`#${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

// Check the user's answer
function checkAns(idx) {
    if (!gameActive) return; // Ignore checks if the game is not active

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000); // Move to the next level after a short delay
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red"; // Flash the screen red on game over
        gameActive = false; // Disable game interactions
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black"; // Reset the background color
        }, 150);
    }
}

// Handle button press by the user
function btnPress() {
    if (!gameActive) return; // Ignore clicks if the game is not active

    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
    btn.addEventListener("click", btnPress);
});

// Reset the game variables
function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Level 0 - Press any key to start";
    document.querySelector("body").style.backgroundColor = "black"; // Reset background color
    gameActive = true; // Enable game interactions
}
