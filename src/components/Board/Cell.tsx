import React from 'react';
import { useGame } from "../../store/gameStore";

interface CellProps {
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ row, col }) => {
  const { qBoard } = useGame();

  
  const cellValue = qBoard[row]?.[col]?.value || '';

  return (
    <div className='Cell select-none flex items-center justify-center cursor-pointer bg-slate-600 w-full h-full rounded-md hover:outline outline-[1px]'>
      <span className="text-2xl md:text-3xl">{cellValue}</span>
    </div>
  );
};

export default Cell;