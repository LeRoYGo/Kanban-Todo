import style from "./Modal.module.css";

function Modal({ actionModal, children }) {
  return (
    <div className={style["modal"]}>
      <div className={style["form"]}>
        <button className={style["сlose"]} onClick={actionModal}>
          &#10060;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
