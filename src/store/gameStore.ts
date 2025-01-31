import {create} from 'zustand';
import { MODES } from './sudokoUtils';

const initialState = {
    isStart: false,
    isPause: false,
    isComplete: false,
    pencilMode: false,
    mistake: 0,
    totalMistake: 5,
    hints: 0,
    time: 0,
    mode: MODES["easy"],
    board: Array.from({length:9},()=>Array(9).fill(0)),
    qboard: Array.from({length:9},()=>Array(9).fill(0)),
    selectedCell: {
        row: null,
        col: null,
        squares: null,
    }
}

const gameState = (set)=> ({
    ...initialState,
    startGame:() =>{},
    tryAgain:() =>{},
    pauseGame:() =>{},
    continueGame:() =>{},
    tooglePencilMode:() =>{},
    changeQBoard:() =>{},
    resetQBoard:() =>{},
    quitGame:() =>{},
    setSelectedCell:() =>{},
    useHint:() =>{},
    increaseTime:() =>{},
    setState:() =>{},
})

const useGame = create(gameState)