import { Modal } from "@mui/material";
import styles from "./DataModal.module.css";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { closeModal } from "../../../store/modalSlice/modalSlice";

const DataModal = () => {
    const { isOpen, productData } = useSelector((state: RootState) => state.modal);
    const { id, name, year, color, pantoneValue } = productData!;

    const dispatch = useDispatch();

    const closeModalHandler = () => dispatch(closeModal());

    return (
        <Modal open={isOpen} onClose={closeModalHandler}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Product Data</h3>
                    <IoClose onClick={closeModalHandler} />
                </div>
                <div className={styles.text}>
                    <div>
                        <span>ID:</span>
                        {id}
                    </div>
                    <div>
                        <span>Name:</span>
                        {name}
                    </div>
                    <div>
                        <span>Year:</span>
                        {year}
                    </div>
                    <div>
                        <span>Color:</span>
                        {color}
                    </div>
                    <div>
                        <span>Pantone Value:</span>
                        {pantoneValue}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DataModal;
