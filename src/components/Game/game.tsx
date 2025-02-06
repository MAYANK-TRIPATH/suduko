import React, { useEffect } from "react";
import { Lightbulb, LogOut, Pause, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../store/gameStore"
import Board from "../Board/Board";

const Game: React.FC = () => {

  const navigate = useNavigate();
  const {isStart} = useGame();
  
  // useEffect(() => {
  //   if(!isStart){
  //     navigate('/')
  //   }
  // }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white">
      
      <Board/>

      
      <div className="flex items-center w-full max-w-md justify-around mt-6 space-x-4">
        
        <GameButton icon={<LogOut />} />
        <GameButton icon={<Pause />} />
        <GameButton text="Reset" />
        <GameButton icon={<PencilLine />} />
        <GameButton icon={<Lightbulb />} />
      </div>
    </div>
  );
};


interface GameButtonProps {
  icon?: React.ReactNode;
  text?: string;
}

const GameButton: React.FC<GameButtonProps> = ({ icon, text }) => {
  return (
    <button className="flex items-center justify-center bg-slate-800 border border-gray-700 p-3 rounded-lg hover:bg-slate-700 active:scale-90 transition-all w-14 h-14">
      {icon || <span className="text-lg font-semibold">{text}</span>}
    </button>
  );
};

export default Game;
