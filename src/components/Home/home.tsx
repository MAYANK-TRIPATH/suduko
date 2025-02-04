import React, { useRef } from "react";
import { useGame } from "../../store/gameStore";

const Home: React.FC = () => {
  const { startGame } = useGame();
  const modeRef = useRef<HTMLSelectElement | null>(null);

  function handleStart() {
    if (modeRef.current) {
      startGame(modeRef.current.value);
      localStorage.setItem("mode", modeRef.current.value);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <h1
        id="heading"
        className="text-6xl font-extrabold mb-8 tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse"
      >
        SUDOKU GAME
      </h1>

      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 text-center border border-purple-500/30 transform transition-all duration-300 hover:scale-105">
        <div className="space-y-6">
          <button
            onClick={handleStart}
            className="w-full py-3 text-lg font-semibold uppercase rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            New Game
          </button>
          <button className="w-full py-3 text-lg font-semibold uppercase rounded-lg bg-gradient-to-r from-green-600 to-teal-600 shadow-lg hover:from-green-500 hover:to-teal-500 transition-all duration-200 transform hover:scale-105 active:scale-95">
            Continue
          </button>
        </div>

        <div className="mt-8">
          <label htmlFor="mode" className="font-semibold text-lg text-purple-200">
            Difficulty:
          </label>
          <select
            id="mode"
            ref={modeRef}
            className="w-full mt-2 bg-gray-800/50 text-white py-3 px-5 rounded-lg text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-500/30"
            defaultValue="Noop"
          >
            <option value="Noop" className="bg-gray-800">
              Noob 🫣
            </option>
            <option value="Medium" className="bg-gray-800">
              Medium 🤓
            </option>
            <option value="Expert" className="bg-gray-800">
              Expert 😎
            </option>
          </select>
        </div>
      </div>

      <div className="mt-12 text-sm text-purple-300/50">
        &copy; {new Date().getFullYear()} Sudoku Game. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
