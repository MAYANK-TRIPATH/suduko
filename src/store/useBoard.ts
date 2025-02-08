import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MODES, suduku } from "./SudukoUtils";

interface Cell {
  value: number;
  default: boolean;
  pencilValue: number;
}

interface SelectedCell {
  cell: { row: number; col: number } | null;
  squares: [number, number][] | null;
  row: number | null;
  col: number | null;
}

interface GameState {
  isStart: boolean;
  isPause: boolean;
  isCustom: boolean;
  isComplete: boolean;
  pencilMode: boolean;
  mistake: number;
  totalMistakes: number;
  hints: number;
  time: number;
  mode: typeof MODES[keyof typeof MODES];
  board: number[][];
  Qboard: Cell[][];
  allEntries: number[][];
  selectedCell: SelectedCell;
  startGame: (mode: keyof typeof MODES) => void;
  tryAgain: () => void;
  pauseGame: () => void;
  continueGame: () => void;
  togglePencilMode: () => void;
  changeBoard: (element: number) => void;
  resetBoard: () => void;
  quitGame: () => void;
  setSelectedCell: (row: number, col: number) => void;
  useHint: () => void;
  increaseTime: () => void;
  setTime: (seconds: number) => void;
  setState: (newState: Partial<GameState>) => void;
}

const initialState: Omit<GameState, keyof GameState> = {
  isStart: false,
  isPause: false,
  isCustom: false,
  isComplete: false,
  pencilMode: false,
  mistake: 0,
  totalMistakes: 5,
  hints: 0,
  time: 0,
  mode: MODES.easy,
  board: Array.from({ length: 9 }, () => Array(9).fill(0)),
  Qboard: Array.from({ length: 9 }, () =>
    Array(9).fill({ value: 0, default: false, pencilValue: 0 })
  ),
  allEntries: [],
  selectedCell: {
    cell: null,
    squares: null,
    row: null,
    col: null,
  },
};

const gameState = (set: any) => ({
  ...initialState,
  startGame: (mode: keyof typeof MODES) => {
    const board = suduko(mode);
    set({
      ...initialState,
      board: board.solvedBoard,
      Qboard: board.unSolvedBoard,
      isStart: true,
      totalMistakes: MODES[mode].mistakes,
      hints: MODES[mode].hints,
      mode: MODES[mode],
    });
  },
  tryAgain: () => {
    set((state: GameState) => {
      const Qboard = state.Qboard.map((row) =>
        row.map((item) =>
          item.default ? item : { default: false, value: 0, pencilValue: 0 }
        )
      );
      return {
        ...state,
        Qboard,
        allEntries: [],
        mistake: 0,
        hints: MODES[state.mode.key as keyof typeof MODES].hints,
        isComplete: false,
        time: 0,
      };
    });
  },
  pauseGame: () => {
    set((state: GameState) => ({
      ...state,
      isPause: !state.isPause,
    }));
  },
  continueGame: () => {
    const oldGame = JSON.parse(localStorage.getItem("oldboard") || "{}");
    set((state: GameState) => ({ ...state, ...oldGame }));
  },
  togglePencilMode: () => {
    set((state: GameState) => ({ ...state, pencilMode: !state.pencilMode }));
  },
  changeBoard: (element: number) => {
    set((state: GameState) => {
      if (
        state.selectedCell.row === null ||
        state.selectedCell.col === null ||
        state.Qboard[state.selectedCell.row][state.selectedCell.col].default ||
        state.mistake >= state.totalMistakes
      )
        return state;

      const Qboard = state.Qboard.map((row) => [...row]);
      const query: Partial<GameState> = {};
      
      if (state.pencilMode) {
        Qboard[state.selectedCell.row][state.selectedCell.col].pencilValue = element;
      } else {
        Qboard[state.selectedCell.row][state.selectedCell.col].value = element;
      }

      if (
        Qboard[state.selectedCell.row][state.selectedCell.col].value !==
          state.board[state.selectedCell.row][state.selectedCell.col] &&
        !state.pencilMode
      ) {
        query.mistake = state.mistake + 1;
      }

      const win = Qboard.every((row, rowIdx) =>
        row.every(
          (item, colIdx) => item.value === state.board[rowIdx][colIdx]
        )
      );

      if (win) query.isComplete = true;

      if (query.mistake !== undefined && query.mistake >= state.totalMistakes) {
        return { ...state, Qboard, ...query, isComplete: true };
      }

      return { ...state, Qboard, ...query };
    });
  },
  resetBoard: () => {
    set((state: GameState) => {
      const Qboard = state.Qboard.map((row) =>
        row.map((item) =>
          item.default ? item : { default: false, value: 0, pencilValue: 0 }
        )
      );
      return { ...state, Qboard, allEntries: [] };
    });
  },
  quitGame: () => {
    set(initialState);
  },
  setSelectedCell: (row: number, col: number) => {
    let sqRow = Math.floor(row / 3) * 3;
    let sqCol = Math.floor(col / 3) * 3;
    const allSquares: [number, number][] = [];
    for (let x = sqRow; x < sqRow + 3; x++)
      for (let y = sqCol; y < sqCol + 3; y++) {
        allSquares.push([x, y]);
      }

    set((state: GameState) => {
      if (state.isPause || state.isComplete) return state;
      return {
        ...state,
        selectedCell: {
          cell: { row, col },
          squares: allSquares,
          row,
          col,
        },
      };
    });
  },
  useHint: () => {
    set((state: GameState) => {
      if (
        state.selectedCell.cell &&
        state.selectedCell.row !== null &&
        state.selectedCell.col !== null &&
        state.hints > 0
      ) {
        const Qboard = state.Qboard.map((row) => [...row]);
        Qboard[state.selectedCell.row][state.selectedCell.col] = {
          default: false,
          value: state.board[state.selectedCell.row][state.selectedCell.col],
          pencilValue: 0,
        };
        return { ...state, Qboard, hints: state.hints - 1 };
      }
      return state;
    });
  },
  increaseTime: () => {
    set((state: GameState) => {
      localStorage.setItem("oldboard", JSON.stringify(state));
      return { ...state, time: state.time + 1 };
    });
  },
  setTime: (seconds: number) => {
    set((state: GameState) => ({ ...state, time: seconds }));
  },
  setState: (newState: Partial<GameState>) => {
    set((state: GameState) => ({ ...state, ...newState }));
  },
});

export const useBoard = create(persist(gameState, { name: "board" }));
