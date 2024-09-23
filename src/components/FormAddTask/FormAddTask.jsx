import AddTask from '../AddTask/AddTask';
import style from './FormAddTask.module.css';

function FormAddTask(props) {
	const [boards, setBoards] = props.setBoards;
	const boardId = props.boardId;
	const onClickHandler = props.onClickHandler;

	function onSubmitHandler(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		const { text, date } = formProps;
		if (!text) return;
		if (!date) return;
		const newTask = {
			id: crypto.randomUUID(),
			title: text,
			date: date,
		};
		boards[boardId - 1].tasks.push(newTask);
		setBoards([...boards]);
		event.target.reset();
		onClickHandler();
	}
	return (
		<>
			<h2 className={style['title']}>Create task</h2>
			<form action='' onSubmit={onSubmitHandler} className={style['form']}>
				<textarea
					className={style['input-text']}
					name='text'
					autoComplete='off'
					placeholder='Create a new todo…'
				/>
				<input className={style['input-date']} type='date' name='date' />
				<AddTask />
			</form>
		</>
	);
}

export default FormAddTask;
