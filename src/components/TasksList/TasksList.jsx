/* eslint-disable react/prop-types */
import { useState } from 'react';
import AddTask from '../AddTask/AddTask';
import FormAddTask from '../FormAddTask/FormAddTask.jsx';
import Modal from '../Modal/Modal.jsx';
import TodoItem from '../TodoItem/TodoItem';
import style from './TasksList.module.css';

function TasksList(props) {
	const [openModal, setOpenModal] = useState(false);
	const { id, title, tasks } = props.board;
	const { dragOverHandler, dropCardHandler } = props.dragDrop;

	function onClickHandler() {
		setOpenModal(!openModal);
	}

	return (
		<div className={style['task-list']}>
			<h2 className={style['task-list__title']}>{title}</h2>
			<AddTask openModal={onClickHandler} />
			{tasks.length == 0 ? (
				<ul
					className={`${style['task-list__column']} ${style['task-list-empty']}`}
					onDragOver={e => dragOverHandler(e)}
					onDrop={() => dropCardHandler(props.board)}
				>
					<li>Нет задач</li>
				</ul>
			) : (
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
			)}
			{openModal && (
				<Modal>
					<FormAddTask
						onClickHandler={onClickHandler}
						setBoards={props.setBoards}
						boardId={id}
					/>
				</Modal>
			)}
		</div>
	);
}

export default TasksList;
