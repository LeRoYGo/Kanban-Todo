import AddTask from "../AddTask/AddTask";
import style from "./FormTask.module.css";

function FormTask(props) {
  const [boards, setBoards] = props.boards;
  const boardID = props.boardID;
  const actionModal = props.actionModal;

  function onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { text, date } = Object.fromEntries(formData);

    if (!text || !date) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: text,
      date: date.split("-").reverse().join("/"),
    };
    boards[boardID - 1].tasks.push(newTask);
    setBoards([...boards]);
    event.target.reset();
    actionModal();
  }

  return (
    <>
      <h2 className={style["title"]}>Create task</h2>
      <form onSubmit={onSubmitHandler} className={style["form"]}>
        <textarea
          name="text"
          className={style["input-text"]}
          placeholder="Create a new todo…"
        />
        <input className={style["input-date"]} type="date" name="date" />
        <AddTask />
      </form>
    </>
  );
}

export default FormTask;
