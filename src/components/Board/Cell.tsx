import React from 'react'

const Cell = (row, col) => {
  return (
    <div onClick={()=> console.log(row, col)} className='Cell select-none flex items-center justify-center cursor-pointer bg-slate-600 w-full h-full rounded-md hover:outline outline-[1px]'>
        
    </div>
    
    
  )
}

export default Cell