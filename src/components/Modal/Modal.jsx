import style from './Modal.module.css';

// eslint-disable-next-line react/prop-types
function Modal({ сloseModal, children }) {
	return (
		<div className={style['modal']}>
			<div className={style['form']}>
				<button className={style['сloseModal']} onClick={сloseModal} >&#10060;</button>
				{children}
				</div>
		</div>
	);
}

export default Modal;
