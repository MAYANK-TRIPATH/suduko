import React from "react";
import MiniSquare from "./MiniSquare";

type SquareProps = {
  row: number;
  col: number;
};

const Square: React.FC<SquareProps> = ({ row, col }) => {
  return (
    <div className="box w-full h-full gap-1 flex flex-col">
      {[0, 1, 2].map((r) => (
        <div key={r} className="flex gap-1 w-full h-full">
          {[0, 1, 2].map((c) => (
            <MiniSquare key={c} row={row * 3 + r} col={col * 3 + c} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Square;
