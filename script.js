const start_pageEl = document.querySelector(".start_page");
const start_btnEl = document.querySelector(".start_btn");
const boardEl = document.querySelector(".board");
const reset_btnEl = document.querySelector(".reset_btn");
const result_pageEl = document.querySelector(".result_page");
const resultEl = document.querySelector(".result");

let check = false;
let mark = "X";
var count = 0;
var ans = "";
const music = new Audio("./assets/Click_Sound.mp3");

//Function to Start Game
start_btnEl.addEventListener("click", () => {
    start_pageEl.classList.add("hide");
    boardEl.classList.remove("hide");
    startGame();
});

//Function to change the mark
function changeMark() {
    return mark === "X" ? "O" : "X";
}

function startGame() {
    let cellEl = document.getElementsByClassName("cell");
    Array.from(cellEl).forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.innerText === "") {
                cell.innerText = mark;
                mark = changeMark();
                cell.classList.add("PENone");
                music.play();
                checkWin();
                
            }
        }); 
    });
}

//Function to check winner
function checkWin() {
    let cellEl = document.querySelectorAll(".cell");
    count++;
    const winNumber = [
        [0, 1, 2, 34, 63, 0, 25],
        [3, 4, 5, 34, 199, 0, 25],
        [6, 7, 8, 34, 336, 0, 25],
        [0, 3, 6, -102, 201, 90, 25],
        [1, 4, 7, 34, 201, 90, 25],
        [2, 5, 8, 170, 201, 90, 25],
        [0, 4, 8, 35, 203, 45, 25],
        [6, 4, 2, 36, 200, 135, 25],
    ];

    if (count == 9) {
        ans = "Draw";
        result(ans);
    } else {
        winNumber.forEach(e => {
            if((cellEl[e[0]].innerText === cellEl[e[1]].innerText) && (cellEl[e[2]].innerText === cellEl[e[1]].innerText) && (cellEl[e[0]].innerText !== "")) {
                ans = `${cellEl[e[0]].innerText} is OWN`;
                document.querySelector(".line").style.width =`${e[6]}vw`;
                document.querySelector(".line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
                check = true;
                result(ans);
            }
        });
    }
}

//Function to Print Result
function result (ans) {
    result_pageEl.classList.remove("hide");
    resultEl.innerText = ans;
}

//Function to Reset Game
reset_btnEl.addEventListener("click", () => {
    let cellEl = document.getElementsByClassName("cell");
    result_pageEl.classList.add("hide");
    resultEl.innerText = "";
    
    Array.from(cellEl).forEach(element => {
        element.innerText = "";
        element.classList.remove("PENone");
    });
    document.querySelector(".line").style.width = '0';
    check = false;
    mark = "X";
    ans = "";
    count = 0;
});