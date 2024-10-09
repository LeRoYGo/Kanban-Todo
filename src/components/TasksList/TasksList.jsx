import { useState } from "react";
import AddTask from "../AddTask/AddTask.jsx";
import FormTask from "../FormTask/FormTask.jsx";
import Modal from "../Modal/Modal.jsx";
import TaskCard from "../TaskCard/TaskCard.jsx";
import style from "./TasksList.module.css";

function TasksList(props) {
  const [openModal, setOpenModal] = useState(false);
  const [currentCardTask, setCurrentCardTask] = useState(null);
  const [currentTaskList, setCurrentTaskList] = useState(null);
  const [boards, setBoards] = props.boards;
  const { id, title, tasks } = props.board;
  const isEmpty = !tasks.length;

  function actionModal() {
    setOpenModal(!openModal);
  }
  function onDragEnter(style) {
    event.preventDefault();
    const target = event.target;
    target.classList.add(style);
    setTimeout(() => target.classList.remove(style), 5000);
  }
  function onDragLeave(style) {
    const target = event.target;
    setTimeout(() => target.classList.remove(style), 300);
  }
  function onDragOver(event) {
    event.preventDefault();
  }
  function onDragStart(task, taskList) {
    setCurrentCardTask(task);
    setCurrentTaskList(taskList);
  }
  function onDragEnd(task, taskList) {
    if (task == currentCardTask && taskList == currentTaskList) {
      return;
    }
    setCurrentCardTask(task);
    setCurrentTaskList(taskList);
  }
  function onDrop(task, taskList) {
    event.preventDefault();

    const currentIndex = currentTaskList.tasks.indexOf(currentCardTask);
    currentTaskList.tasks.splice(currentIndex, 1);

    const dropIndex = taskList.tasks.indexOf(task);
    taskList.tasks.splice(dropIndex + 1, 0, currentCardTask);

    setBoards(
      boards.map((b) => {
        if (b.id === taskList.id) {
          return taskList;
        } else if (b.id === currentTaskList.id) {
          return currentTaskList;
        }
        return b;
      })
    );
  }
  function dropCardHandler(taskList) {
    taskList.tasks.push(currentCardTask);
    console.log(currentCardTask);

    const currentIndex = currentTaskList.tasks.indexOf(currentCardTask);
    console.log(currentIndex);
    currentTaskList.tasks.splice(currentIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === taskList.id) {
          return taskList;
        } else if (b.id === currentTaskList.id) {
          return currentTaskList;
        }
        return b;
      })
    );
  }

  return (
    <>
      <div
        className={style["task-list"]}
        onDragOver={(e) => onDragOver(e)}
        onDrop={() => dropCardHandler(props.board)}
      >
        <h2 className={style["title"]}>{title}</h2>

        <AddTask actionModal={actionModal} />

        <ul
          className={`${style["list-column"]} 
          ${isEmpty ? style["empty"] : ""}`}
        >
          {isEmpty ? (
            <li>Нет задач</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id}>
                <TaskCard
                  task={task}
                  board={props.board}
                  dragDrop={[
                    onDrop,
                    onDragEnter,
                    onDragLeave,
                    onDragOver,
                    onDragStart,
                    onDragEnd,
                  ]}
                />
              </li>
            ))
          )}
        </ul>
      </div>

      {openModal && (
        <Modal actionModal={actionModal}>
          <FormTask
            boards={props.boards}
            boardID={id}
            actionModal={actionModal}
          />
        </Modal>
      )}
    </>
  );
}

export default TasksList;
