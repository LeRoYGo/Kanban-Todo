/* eslint-disable react/jsx-key */
import { useState } from 'react';
import './App.css';
import TasksList from './components/TasksList/TasksList.jsx';

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: 'to do',
			tasks: [],
		},
		{
			id: 2,
			title: 'Doing',
			tasks: [],
		},
		{
			id: 3,
			title: 'Done',
			tasks: [],
		},
	]);
	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentTodoItem, setCurrentTodoItem] = useState(null);

	function dragOverHandler(event, style, styleItem) {
		event.preventDefault();
		if (event.target.classList === styleItem) {
			event.target.classList.add(style['hover-drag-drop']);
		}
	}
	function dragLeaveHandler(event, styleItem) {
		event.target.classList.remove(styleItem['hover-drag-drop']);
	}
	function dragEndHandler(event, styleItem) {
		event.target.classList.remove(styleItem['hover-drag-drop']);
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
					setBoards={[boards, setBoards]}
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
