import style from './AddTask.module.css';

function AddTask(props) {
	const { openModal } = props;
	return (
		<button className={style['button']} onClick={openModal}>
			Add Task
		</button>
	);
}

export default AddTask;
