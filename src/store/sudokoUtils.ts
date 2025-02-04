type Mode = "easy" | "medium" | "hard";

type ModeConfig = {
    key: Mode;
    name: string;
    value: [number, number];
    mistakes: number;
    hints: number;
};

export const MODES: Record<Mode, ModeConfig> = {
    easy: {
        key: "easy",
        name: "Easy",
        value: [15, 25],
        mistakes: 5,
        hints: 6,
    },
    medium: {
        key: "medium",
        name: "Medium",
        value: [25, 35],
        mistakes: 3,
        hints: 4,
    },
    hard: {
        key: "hard",
        name: "Hard",
        value: [35, 50],
        mistakes: 2,
        hints: 2,
    },
};

// Function to generate Random Numbers
export function generateRandom(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Board = number[][];

type Cell = {
    value: number;
    default: boolean;
    pencilValue: number;
};

type UnsolvedBoard = Cell[][];

//This function checks if placing num in board[row][col] follows Sudoku rules.
export function isSafe(board: Board, row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    } // If num is already in the same row or same column, return false

    const iRow = Math.floor(row / 3) * 3;
    const iCol = Math.floor(col / 3) * 3;
    for (let x = iRow; x < iRow + 3; x++) {
        for (let y = iCol; y < iCol + 3; y++) {
            if (board[x][y] === num) return false;
        }
    }
    return true;
}

function removeCell(board: Board, num: number): void {
    for (let x = num; x > 0; x--) {
        const row = generateRandom(1, 9) - 1;
        const col = generateRandom(1, 9) - 1;
        board[row][col] = 0;
    }
}

export function generateSudoku(board: Board, randomArray: number[]): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num of randomArray) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (generateSudoku(board, randomArray)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export function sudoku(mode: Mode) {
    const no_of_cell = generateRandom(MODES[mode].value[0], MODES[mode].value[1]);
    let solvedBoard: Board = Array.from({ length: 9 }, () => Array(9).fill(0));
    let randomArray: number[] = [];
    while (randomArray.length < 9) {
        const num = generateRandom(1, 9);
        if (!randomArray.includes(num)) randomArray.push(num);
    }
    generateSudoku(solvedBoard, randomArray);
    let unSolvedBoard: Board = solvedBoard.map(row => [...row]);
    removeCell(unSolvedBoard, no_of_cell);
    let formattedUnSolvedBoard: UnsolvedBoard = unSolvedBoard.map(row => 
        row.map(num => ({ value: num, default: num !== 0, pencilValue: 0 }))
    );
    return { solvedBoard, unSolvedBoard: formattedUnSolvedBoard };
}


