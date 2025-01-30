import React from 'react'
import Square from './Square'

const Board = () => {
  const squares = Array(3).fill(Array(3).fill(null))

  return (
    <div className='flex w-screen h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative'>
      {squares.map((arr, row) => (
        <div className="flex gap-2 h-full w-full">
          {arr.map((_, col) => (
            <Square row={row} col={col} />
          ))}
        </div>
      ))}

    </div>
  )
}

export default Board