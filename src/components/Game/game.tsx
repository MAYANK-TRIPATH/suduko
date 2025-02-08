import React, { useEffect, useRef } from "react";
import { useBoard } from "../../store/useBoard";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Board from "../Board/Board";
import { Lightbulb, LogOut, Pause, PencilLine, Play } from "lucide-react";

const Game: React.FC = () => {
  const {
    isStart,
    quitGame,
    useHint,
    hints,
    isPause,
    time,
    Qboard,
    tooglePencilMode,
    pencilMode,
    selectedCell,
    isComplete,
    increaseTime,
    pauseGame,
    changeBoard,
    resetBoard,
  } = useBoard();

  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleQuit = () => {
    gsap.to(".box", {
      y: -50,
      opacity: 0,
      duration: 0.1,
      stagger: 0.01,
      onComplete: () => {
        gsap.to(".option", {
          y: -50,
          opacity: 0,
          duration: 0.1,
          stagger: 0.01,
          onComplete: () => {
            navigate("/");
            quitGame();
          },
        });
      },
    });
  };

  const handlePause = () => {
    pauseGame();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "p") {
      pauseGame();
    }
    if (isPause || !selectedCell) return;

    const num = parseInt(event.key);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      changeBoard(num);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isPause, selectedCell]);

  useEffect(() => {
    if (!isStart) {
      navigate("/", { replace: true });
    }

    timeRef.current = setInterval(() => {
      if (!isPause && !isComplete) increaseTime();
    }, 1000);

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [isPause, isComplete]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".miniBox", { y: -50, opacity: 0, duration: 0.1, stagger: 0.01 })
      .from(".defaultValue", { y: -50, opacity: 0, duration: 0.1, stagger: 0.01 })
      .from(".value", { y: -50, opacity: 0, duration: 0.1, stagger: 0.01 })
      .from(".option", { x: -50, opacity: 0, duration: 0.1, stagger: 0.02 });
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <Board />
      <div className="flex items-center justify-around w-full">
        <button
          onClick={handleQuit}
          className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90"
        >
          <LogOut />
        </button>
        <button
          onClick={handlePause}
          className="option bg-slate-900 pause p-3 disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 rounded-md hover:bg-slate-800 active:scale-90"
        >
          {isPause ? <Play /> : <Pause />}
        </button>
        <button
          onClick={resetBoard}
          disabled={isPause}
          className="option bg-slate-900 pause disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 p-3 rounded-md hover:bg-slate-800 active:scale-90"
        >
          Reset
        </button>
        <button
          onClick={tooglePencilMode}
          className={`option bg-slate-900 pause disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 p-3 rounded-md hover:bg-slate-800 active:scale-90 ${
            pencilMode ? "text-green-600" : ""
          }`}
        >
          <PencilLine />
        </button>
        <button
          onClick={useHint}
          disabled={isPause}
          className="option bg-slate-900 pause disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 p-3 rounded-md hover:bg-slate-800 active:scale-90 relative"
        >
          <span className="absolute h-6 w-6 -right-3 -top-3 flex items-center justify-center text-xl bg-blue-700 text-white p-2 rounded-full">
            {hints}
          </span>
          <Lightbulb />
        </button>
      </div>
    </div>
  );
};

export default Game;
