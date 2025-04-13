let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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
    if(checkWinner()){
        document.querySelector(".status").innerText =  `Player ${currentPlayer} Won`
        gameActive = !gameActive; 
        highLightWinner();
        board.classList.add("game-over");
        return;
    }
    if(checkDraw()){
        document.querySelector(".status").innerText =  `It's a draw!`
        gameActive = !gameActive;
        board.classList.add("game-over");
        return;
    }
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    document.querySelector(".status").innerText =  `Player ${currentPlayer}'s turn`;
    computerPlay();
}

function checkWinner(){
    const winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

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

document.querySelector('.reset-btn').addEventListener("click", () => {
    currentPlayer = "X";
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    let cellArr = document.querySelectorAll(".cell");
    cellArr.forEach((item)=>{
        item.innerText = "";
        item.classList.remove("winning-cell");
    })
    board.classList.remove("game-over");
    document.querySelector(".status").innerText =  `Player ${currentPlayer}'s turn`;
})


function computerPlay(){
    let pos = gameBoard.indexOf("");
    gameBoard[pos] = currentPlayer;
    document.querySelector(`[data-index="${pos}"]`).innerText = currentPlayer;
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    document.querySelector(".status").innerText =  `Player ${currentPlayer}'s turn`;
    if(checkWinner()){
        document.querySelector(".status").innerText =  `Player ${currentPlayer} Won`
        gameActive = !gameActive; 
        highLightWinner();
        board.classList.add("game-over");
        return;
    }
    if(checkDraw()){
        document.querySelector(".status").innerText =  `It's a draw!`
        gameActive = !gameActive;
        board.classList.add("game-over");
        return;
    }
}