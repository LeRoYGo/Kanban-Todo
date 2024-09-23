import style from './Modal.module.css';

function Modal({ children }) {
	return (
		<div className={style['modal']}>
			<div className={style['form']}>{children}</div>
		</div>
	);
}

export default Modal;
