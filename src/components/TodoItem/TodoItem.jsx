/* eslint-disable react/prop-types */
import style from './TodoItem.module.css';

function TodoItem(props) {
	const { title, date } = props.task;
	const task = props.task;
	const board = props.board;
	const {
		dragOverHandler,
		dragLeaveHandler,
		dragEndHandler,
		dragStartHandler,
		dropHandler,
	} = props.dragDrop;

	return (
		<div
			className={style['item']}
			onDragOver={e => dragOverHandler(e, style, style['item'])}
			onDragLeave={e => dragLeaveHandler(e, style)}
			onDragEnd={e => dragEndHandler(e, style)}
			onDragStart={() => dragStartHandler(task, board)}
			onDrop={e => dropHandler(e, task, board)}
			draggable={true}
		>
			<h3 className={style['item__title']}>{title}</h3>
			<span className={style['item__date']}>{date}</span>
		</div>
	);
}

export default TodoItem;
