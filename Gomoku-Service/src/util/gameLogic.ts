import { PLAYERS } from "../constants/types";

export const getCurrentPlayer = (turnCount: number): PLAYERS => {
    return turnCount % 2 !== 0 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1
}

function checkHorizontalWin(state: number[], boardWidth: number) {
    let counter = 0;
    let tile, start, stop;
    for (let i = 0; i < state.length; i++) {
        counter = 0;
        tile = state[i]
        start = Math.floor(tile / boardWidth) * boardWidth
        stop = (start + boardWidth - 1)
        for (let j = 0; j < boardWidth; j++) { // other tiles
            if (state.includes(tile + 1) && tile + 1 <= stop) {
                tile = tile + 1;
                counter++;
            } else
                break;
        }
        if (counter === 4 && (!state.includes(state[i] - 1) || (state[i] - 1) < start))
            return true;
    }
    return false;
}

function checkVerticalWin(state: number[], boardWidth: number) {
    let tile;
    let counter = 0;
    for (let i = 0; i < state.length; i++) { // check each tile for a vertical line
        counter = 0;
        tile = state[i];
        for (let j = 0; j < boardWidth; j++) { // other tiles
            if (state.includes(tile + boardWidth)) {
                tile = tile + boardWidth;
                counter++;
            } else
                break;
        }
        // check that the chain isn't longer than 5
        if (counter === 4 && !state.includes(state[i] - boardWidth))
            return true;
    }
    return false;
}

function checkDiagonalWin(state: number[], angle: number, boardWidth: number) {
    let tile;
    let counter = 0;
    for (let i = 0; i < state.length; i++) {
        counter = 0;
        tile = state[i];
        for (let j = 0; j < boardWidth; j++) { // other tiles
            if (state.includes(tile + boardWidth + angle) &&
                (((tile + boardWidth + angle) % boardWidth) - (tile % boardWidth) === angle)) {
                tile = tile + boardWidth + angle;
                counter++;
            } else
                break;
        }
        // check that the chain isn't longer than 5
        if (counter === 4) {
            if (state[i] - boardWidth - angle < 0 || !state.includes(state[i] - boardWidth - angle) ||
                (Math.floor(state[i] / boardWidth) - Math.floor((state[i] - boardWidth - angle) / boardWidth)) === 0 ||
                (Math.floor(state[i] / boardWidth) - Math.floor((state[i] - boardWidth - angle) / boardWidth)) === 2)
                return true;
        }
    }
    return false;
}

export const checkForWin = (state: number[], boardWidth: number) => {
    if (state.length >= 5) {
        // check horizontal:
        if (checkHorizontalWin(state, boardWidth) ||
            // check vertical
            checkVerticalWin(state, boardWidth) ||
            // check forward diagonals
            checkDiagonalWin(state, 1, boardWidth) ||
            // check backward diagonals
            checkDiagonalWin(state, -1, boardWidth)) {
            return true
        }
    }
    return false
}

export const checkForDraw = (numberOfTurns: number, boardWidth: number) => {
    if (numberOfTurns === (boardWidth * boardWidth))
        return true
    return false
}