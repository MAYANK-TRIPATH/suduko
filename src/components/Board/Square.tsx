import Cell from "./Cell";


export default function Square({ row, col }) {

    const squares = Array(3).fill(Array(3).fill(null))

    return (
        <div className="box w-full h-full gap-1 flex flex-col">
            {squares.map((arr, i) => (
                <div className="flex gap-2 h-full w-full">
                    {arr.map((_, k) => (
                        <Cell row={row * 3 + i} col={col * 3 + k} />
                    ))}
                </div>
            ))}

        </div>
    )
}