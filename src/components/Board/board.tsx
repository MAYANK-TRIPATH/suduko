import React from "react";
import Square from "./Square";

const Board: React.FC = () => {
  const pause: boolean = false;
  const over: boolean = false;
  const numbers: number = Array(9).fill(null)


  const squares: (null | number)[][] = Array.from({ length: 3 }, () => Array(3).fill(null));

  return (
    <div className="flex w-screen h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative">
     
      {pause && (
        <span className="text-6xl font-bold bg-slate-800 text-white border border-black shadow-lg p-10 rounded-xl 
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Pause
        </span>
      )}

      
      {over && (
        <div className="text-3xl bg-slate-800 text-white border border-black shadow-lg p-10 rounded-xl 
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="mb-4">All Incorrect</span>
          <div className="flex gap-4">
            <GameButton text="Try Again" color="red" />
            <GameButton text="Start New" color="blue" />
          </div>
        </div>
      )}

      
      {squares.map((rowArr, row) => (
        <div key={row} className="flex gap-2 h-full w-full">
          {rowArr.map((_, col) => (
            <Square key={col} row={row} col={col} />
          ))}
        </div>
      ))}
      <div className="flex justify-around select-none w-full">
      {numbers.map((_,i) => (
        <span key={i} className="text-slate-200 bg-slate-800 shadow-lg rounded-md p-2 outline-[1px] hover:outline md:px-3 my-5 text-2xl cursor-pointer ">
          {i+1}
        </span>
      ))}
      </div>
    </div>
  );
};


interface GameButtonProps {
  text: string;
  color: "red" | "blue";
}

const GameButton: React.FC<GameButtonProps> = ({ text, color }) => {
  const bgColor = color === "red" ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500";
  
  return (
    <button className={`${bgColor} text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all 
    active:scale-95 focus:ring-2 focus:ring-opacity-50 focus:ring-white`}>
      {text}
    </button>
  );
};

export default Board;
