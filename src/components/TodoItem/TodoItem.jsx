/* eslint-disable react/prop-types */
import style from './TodoItem.module.css';

function TodoItem(props) {
	const { title, date } = props.task;
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
			onDragOver={e => dragOverHandler(e)}
			onDragLeave={e => dragLeaveHandler(e)}
			onDragEnd={e => dragEndHandler(e)}
			onDragStart={() => dragStartHandler(props.task, props.board)}
			onDrop={e => dropHandler(e, props.task, props.board)}
			draggable={true}
		>
			<h3 className={style['item__title']}>{title}</h3>
			<span className={style['item__date']}>{date}</span>
		</div>
	);
}

export default TodoItem;
