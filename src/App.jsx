/* eslint-disable react/jsx-key */
import { useState } from 'react';
import './App.css';
import TasksList from './components/TasksList/TasksList.jsx';
import styleTodoItem from './components/TodoItem/TodoItem.module.css';

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: 'to do',
			tasks: [
				// {
				// 	id: `1-1`,
				// 	title: 'Задача №1',
				// 	date: '01/01/2001',
				// },
				// {
				// 	id: `1-2`,
				// 	title: 'Задача №2',
				// 	date: '02/02/2002',
				// },
				// {
				// 	id: `1-3`,
				// 	title: 'Задача №3',
				// 	date: '03/03/2003',
				// },
			],
		},
		{
			id: 2,
			title: 'Doing',
			tasks: [
				{
					id: `2-1`,
					title: 'Задача №1',
					date: '01/01/2001',
				},
				{
					id: `2-2`,
					title: 'Задача №2',
					date: '02/02/2002',
				},
				{
					id: `2-3`,
					title: 'Задача №3',
					date: '03/03/2003',
				},
			],
		},
		{
			id: 3,
			title: 'Done',
			tasks: [
				{
					id: `3-1`,
					title: 'Задача №1',
					date: '01/01/2001',
				},
				{
					id: `3-2`,
					title: 'Задача №2',
					date: '02/02/2002',
				},
				{
					id: `3-3`,
					title: 'Задача №3',
					date: '03/03/2003',
				},
			],
		},
	]);
	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentTodoItem, setCurrentTodoItem] = useState(null);

	function dragOverHandler(event) {
		event.preventDefault();
		if (event.target.classList == styleTodoItem['item']) {
			event.target.classList.add(styleTodoItem['hover-drag-drop']);
		}
	}
	function dragLeaveHandler(event) {
		event.target.classList.remove(styleTodoItem['hover-drag-drop']);
	}
	function dragEndHandler(event) {
		event.target.classList.remove(styleTodoItem['hover-drag-drop']);
	}
	function dragStartHandler(task, boards) {
		setCurrentBoard(boards);
		setCurrentTodoItem(task);
	}
	function dropHandler(e, task, board) {
		e.preventDefault();

		const currentIndex = currentBoard.tasks.indexOf(currentTodoItem);
		currentBoard.tasks.splice(currentIndex, 1);

		const dropIndex = board.tasks.indexOf(task);
		board.tasks.splice(dropIndex + 1, 0, currentTodoItem);

		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board;
				} else if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	}
	function dropCardHandler(board) {
		board.tasks.push(currentTodoItem);
		const currentIndex = currentBoard.tasks.indexOf(currentTodoItem);
		currentBoard.tasks.splice(currentIndex, 1);
		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board;
				} else if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	}

	return (
		<div className='wrapper-body'>
			{boards.map(board => (
				<TasksList
					key={board.id}
					board={board}
					dragDrop={{
						dragOverHandler,
						dropCardHandler,
						dragLeaveHandler,
						dragEndHandler,
						dragStartHandler,
						dropHandler,
					}}
				/>
			))}
		</div>
	);
}

export default App;
