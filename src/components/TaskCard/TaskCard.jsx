import style from "./TaskCard.module.css";

function TaskCard(props) {
  const { title, date } = props.task;
  const board = props.board;
  const [onDrop, onDragEnter, onDragLeave, onDragOver, onDragStart, onDragEnd] =
    props.dragDrop;

  return (
    <div
      className={style["item"]}
      draggable={true}
      onDragOver={onDragOver}
      onDragEnter={() => onDragEnter(style["hover-drag"])}
      onDragLeave={() => onDragLeave(style["hover-drag"])}
      onDragStart={() => onDragStart(props.task, board)}
      onDragEnd={() => onDragEnd(props.task, board)}
      onDrop={() => onDrop(props.task, board)}
    >
      <h3 className={style["title"]}>{title}</h3>
      <span className={style["date"]}>{date}</span>
    </div>
  );
}

export default TaskCard;
