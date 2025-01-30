import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col justify-center items-center gap-10">
      <Outlet></Outlet>
    </div>

  )
}