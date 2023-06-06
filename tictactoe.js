let clickSound = new Audio("./mixkit-game-click-1114.wav");
let winSound = new Audio("./mixkit-video-game-win-2016.wav");

let turn = "X";
let gameOver = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

const checkWinner = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,0,5,0],
        [3,4,5,0,15,0],
        [6,7,8,0,25,0],
        [0,3,6,-10,15,90],
        [1,4,7,0,15,90],
        [2,5,8,10,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135]
    ]

    wins.forEach((e) => {
        if(boxtexts[e[0]].innerText !== "" && boxtexts[e[0]].innerText === boxtexts[e[1]].innerText && boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) {
            document.getElementsByClassName("info")[0].innerText = boxtexts[e[0]].innerText + " Won";
            gameOver = true;
            winSound.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "300px";
            document.getElementsByClassName('line')[0].style.width = "30vw";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
}

let boxes = document.getElementsByClassName('box');

Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector('.boxtext');
    element.addEventListener('click', (event) => {
        if(!gameOver) {
            if(boxText.innerText == "") {
                boxText.innerText = turn;
                turn = changeTurn();
                clickSound.play();
                checkWinner();
                if(!gameOver) {
                    document.getElementsByClassName('info')[0].innerText = `Next ${turn}'s turn`;
                }
            }
        }
    })
}) 

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (event) => {
    let boxTexts = document.querySelectorAll('.boxtext');
    Array.from(boxTexts).forEach((element) => {
        element.innerText = "";
    })
    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementsByClassName('line')[0].style.width = "0px";

})