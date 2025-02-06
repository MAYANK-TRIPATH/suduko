import { create } from "zustand";
import { MODES, sudoku } from "./sudokoUtils";


interface SelectedCell {
  row: number | null;
  col: number | null;
  squares: number | null;
}

interface GameState {
  isStart: boolean;
  isPause: boolean;
  isComplete: boolean;
  pencilMode: boolean;
  mistake: number;
  totalMistake: number;
  hints: number;
  time: number;
  mode: typeof MODES[keyof typeof MODES]; 
  board: number[][];
  qBoard: number[][];
  selectedCell: SelectedCell;
}


interface GameActions {
  startGame: (mode: keyof typeof MODES) => void;
  tryAgain: () => void;
  pauseGame: () => void;
  continueGame: () => void;
  togglePencilMode: () => void;
  changeQBoard: () => void;
  resetQBoard: () => void;
  quitGame: () => void;
  setSelectedCell: (cell: SelectedCell) => void;
  useHint: () => void;
  increaseTime: () => void;
}


const initialState: GameState = {
  isStart: false,
  isPause: false,
  isComplete: false,
  pencilMode: false,
  mistake: 0,
  totalMistake: 5,
  hints: 0,
  time: 0,
  mode: MODES["easy"], 
  board: Array.from({ length: 9 }, () => Array(9).fill(0)),
  qBoard: Array.from({ length: 9 }, () => Array(9).fill(0)),
  selectedCell: {
    row: null,
    col: null,
    squares: null,
  },
};


export const useGame = create<GameState & GameActions>((set) => ({
  ...initialState,

  startGame: (mode) => {
    const data = sudoku(mode);
    set({
      board: data.solvedBoard,
      qBoard: data.unSolvedBoard,
      isStart: true,
      hints: MODES[mode].hints,
      totalMistake: MODES[mode].mistakes,
      mode: MODES[mode],
    });
  },

  tryAgain: () => {},
  pauseGame: () => {},
  continueGame: () => {},
  togglePencilMode: () => {},
  changeQBoard: () => {},
  resetQBoard: () => {},
  quitGame: () => {},
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  useHint: () => {},
  increaseTime: () => {},
}));

