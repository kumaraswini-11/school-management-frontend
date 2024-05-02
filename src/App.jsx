import { Outlet } from "react-router-dom";
import { SideBar } from "./components/";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 ml-4 mt-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
