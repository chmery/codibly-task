import { Modal } from "@mui/material";
import styles from "./ErrorModal.module.css";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { closeErrorModal } from "../../../store/modalSlice/modalSlice";

const ErrorModal = () => {
    const { isOpen, errorMessage } = useSelector((state: RootState) => state.modal.errorModal);

    const dispatch = useDispatch();

    const closeModalHandler = () => dispatch(closeErrorModal());

    return (
        <Modal open={isOpen} onClose={closeModalHandler}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Error</h3>
                    <IoClose onClick={closeModalHandler} />
                </div>
                <div className={styles.text}>{errorMessage}</div>
            </div>
        </Modal>
    );
};

export default ErrorModal;
