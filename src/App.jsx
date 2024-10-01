import { useLocalStorage } from "@uidotdev/usehooks";
import "./App.css";
import TasksList from "./components/TasksList/TasksList.jsx";
import INIT_BOARDS from "./state.js";

function App() {
  const [boards, setBoards] = useLocalStorage("boards", INIT_BOARDS);

  return (
    <div className="wrapper-body">
      {boards.map((board) => (
        <TasksList key={board.id} board={board} boards={[boards, setBoards]} />
      ))}
    </div>
  );
}

export default App;
