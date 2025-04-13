let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winLine = document.querySelector(".line");

let singlePlayerModeBtn = document.querySelector(".single-player-mode");
let multiPlayerModeBtn = document.querySelector(".multi-player-mode");

let singlePlayerMode = true;

singlePlayerModeBtn.addEventListener("click", ()=>{
    if(singlePlayerMode != true){
        singlePlayerMode = true;
        singlePlayerModeBtn.classList.add("active");
        multiPlayerModeBtn.classList.remove("active");
        reset();
    }
})

multiPlayerModeBtn.addEventListener("click", ()=>{
    if(singlePlayerMode == true){
        singlePlayerMode = false;
        multiPlayerModeBtn.classList.add("active");
        singlePlayerModeBtn.classList.remove("active");
        reset();
    }
})

const board = document.getElementById("board");
for(let i = 0; i<9; i++){
    const cell = document.createElement('button');
    cell.classList = 'cell';
    cell.setAttribute('data-index', i);
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
}

function handleClick(e){
    const cell = e.target;
    const cellIndex = Number(cell.getAttribute("data-index"));
    if(gameBoard[cellIndex] !== '' || !gameActive){
        return;
    }
    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    let winner = checkWinner();
    if(winner){
        if(singlePlayerMode){
            document.querySelector(".status").innerText =  `${currentPlayer == "X" ? "You " : "Computer "} Won`
        }else{
            document.querySelector(".status").innerText =  `Player ${currentPlayer} Won`
        }
        gameActive = !gameActive; 
        highLightWinner();
        line(winner);
        return;
    }
    if(checkDraw()){
        document.querySelector(".status").innerText =  `It's a draw!`
        gameActive = !gameActive;
        return;
    }
    currentPlayer = currentPlayer == "X" ? "O" : "X";

    if(singlePlayerMode){
        document.querySelector(".status").innerText =  `Computer's turn`;
        setTimeout(() => { computerPlay() }, 500);
    }else{
        document.querySelector(".status").innerText =  `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner(){
    const winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for(const combination of winningPattern){
        const [a, b, c] = combination;
        if(gameBoard[a] !== "" && gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c]){
            return combination;
        }
    }

    return winningPattern.some((combination)=>{
        const [a, b, c] = combination;
        return gameBoard[a] !== "" && gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c];
    })
}

function checkDraw(){
    return gameBoard.every((cell)=> { return cell != ""});
}

function highLightWinner(){
    const winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for(const combination of winningPattern){
        const [a, b, c] = combination;

        if(gameBoard[a] !== "" && gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c]){
            document.querySelector(`[data-index="${a}"]`).classList.add('winning-cell');
            document.querySelector(`[data-index="${b}"]`).classList.add('winning-cell');
            document.querySelector(`[data-index="${c}"]`).classList.add('winning-cell');
        }
    }
}

document.querySelector('.reset-btn').addEventListener("click", reset);

function reset(){
    currentPlayer = "X";
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    let cellArr = document.querySelectorAll(".cell");
    cellArr.forEach((item)=>{
        item.innerText = "";
        item.classList.remove("winning-cell");
    })
    winLine.style.display = "none";
    winLine.style.transform = "unset";
    winLine.style.width = "100%";
    winLine.style.left = "unset";
    winLine.style.right = "unset";
    winLine.style.top = "unset";
    winLine.style.bottom = "unset";
    if(singlePlayerMode){
        document.querySelector(".status").innerText =  `Your turn`;
    }else{
        document.querySelector(".status").innerText =  `Player ${currentPlayer}'s turn`;
    }
}


function computerPlay(){
    let pos = gameBoard.indexOf("");
    gameBoard[pos] = currentPlayer;
    document.querySelector(`[data-index="${pos}"]`).innerText = currentPlayer;
    let winner = checkWinner()
    if(winner){
        document.querySelector(".status").innerText =  `${currentPlayer == "X" ? "You " : "Computer "} Won`
        gameActive = !gameActive; 
        highLightWinner();
        line(winner);
        return;
    }
    if(checkDraw()){
        document.querySelector(".status").innerText =  `It's a draw!`
        gameActive = !gameActive;
        return;
    }
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    document.querySelector(".status").innerText =  `Your turn`;
}

function line(combination){
    const [a, b, c] = combination;
    winLine.style.display = "block";

    if (a === 0 && b === 1 && c === 2) {
        winLine.style.top = "50px";
    } else if (a === 3 && b === 4 && c === 5) {
        winLine.style.top = "155px";
        winLine.style.left = "0px";
    } else if (a === 6 && b === 7 && c === 8) {
        winLine.style.top = "260px";
        winLine.style.left = "0px";
    }else if (a === 0 && b === 3 && c === 6) {
        winLine.style.top = "157px";
        winLine.style.left = "-105px";
        winLine.style.transform = "rotate(90deg)";
    } else if (a === 1 && b === 4 && c === 7) {
        winLine.style.top = "157px";
        winLine.style.transform = "rotate(90deg)";
    } else if (a === 2 && b === 5 && c === 8) {
        winLine.style.top = "157px";
        winLine.style.left = "105px";
        winLine.style.transform = "rotate(90deg)";
    }else if (a === 0 && b === 4 && c === 8) {
        winLine.style.width = "400px";
        winLine.style.top = "155px";
        winLine.style.left = "-40px";
        winLine.style.transform = "rotate(45deg)";
    } else if (a === 2 && b === 4 && c === 6) {
        winLine.style.width = "400px";
        winLine.style.top = "155px";
        winLine.style.left = "-40px";
        winLine.style.transform = "rotate(-45deg)";

    }
}