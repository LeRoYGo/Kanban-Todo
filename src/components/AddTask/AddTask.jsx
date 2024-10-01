import style from './AddTask.module.css';

function AddTask(props) {
	const { actionModal } = props;
	return (
		<button className={style['button']} onClick={actionModal}>
			Add Task
		</button>
	);
}

export default AddTask;
