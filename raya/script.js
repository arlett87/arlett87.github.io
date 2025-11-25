const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "blue"; // blue comienza
let gameActive = true;

const boardDiv = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("reset");

// --- Crear tablero ---
function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(""));
    boardDiv.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => handleMove(c));
            boardDiv.appendChild(cell);
        }
    }
}

// --- Colocar ficha ---
function handleMove(col) {
    if (!gameActive) return;

    // Buscar fila libre desde abajo
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === "") {
            board[row][col] = currentPlayer;
            updateUI();
            checkGame(row, col);
            switchPlayer();
            return;
        }
    }
}

// --- Actualizar interfaz ---
function updateUI() {
    document.querySelectorAll(".cell").forEach(cell => {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        cell.className = "cell"; // reset

        if (board[r][c] === "blue") cell.classList.add("blue");
        if (board[r][c] === "red") cell.classList.add("red");
    });
}

// --- Cambiar de jugador ---
function switchPlayer() {
    if (!gameActive) return;

    currentPlayer = currentPlayer === "blue" ? "red" : "blue";
    statusDisplay.textContent = `Turno del jugador ${currentPlayer === "blue" ? "🔵 Azul" : "🔴 Rojo"}`;
}

// --- Verificar victoria ---
function checkGame(row, col) {
    if (checkWin(row, col)) {
        statusDisplay.textContent = `¡Jugador ${currentPlayer === "blue" ? "🔵 Azul" : "🔴 Rojo"} ha ganado!`;
        gameActive = false;
    } else if (board.flat().every(cell => cell !== "")) {
        statusDisplay.textContent = "¡Empate!";
        gameActive = false;
    }
}

function checkWin(r, c) {
    return (
        countDirection(r, c, 1, 0) >= 4 || // horizontal
        countDirection(r, c, 0, 1) >= 4 || // vertical
        countDirection(r, c, 1, 1) >= 4 || // diagonal \
        countDirection(r, c, 1, -1) >= 4   // diagonal /
    );
}

// Cuenta fichas consecutivas en una dirección
function countDirection(r, c, dr, dc) {
    let count = 1;
    let color = board[r][c];

    for (let i = 1; i < 4; i++) {
        let nr = r + dr * i;
        let nc = c + dc * i;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== color) break;
        count++;
    }
    for (let i = 1; i < 4; i++) {
        let nr = r - dr * i;
        let nc = c - dc * i;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== color) break;
        count++;
    }
    return count;
}

// --- Reiniciar juego ---
resetBtn.addEventListener("click", () => {
    currentPlayer = "blue";
    gameActive = true;
    statusDisplay.textContent = "Turno del jugador 🔵 Azul";
    createBoard();
});

// Inicializar
createBoard();
