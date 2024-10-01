import { useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import './App.css';
import TasksList from './components/TasksList/TasksList.jsx';
import INIT_BOARDS from './state.js'

function App() {

	const [boards, setBoards] = useLocalStorage("boards", INIT_BOARDS);
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
