/* eslint-disable react/prop-types */
import TodoItem from '../TodoItem/TodoItem';
import style from './TasksList.module.css';

function TasksList(props) {
	const { title, tasks } = props.board;
	const { dragOverHandler, dropCardHandler } = props.dragDrop;

	return (
		<div className={style['task-list']}>
			<h2 className={style['task-list__title']}>{title}</h2>
			<ul
				className={style['task-list__column']}
				onDragOver={e => dragOverHandler(e)}
				onDrop={() => dropCardHandler(props.board)}
			>
				{tasks.map(task => (
					<li key={task.id}>
						<TodoItem
							board={props.board}
							task={task}
							dragDrop={props.dragDrop}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TasksList;
