import styles from "./Pagination.module.css";
import Button from "../Button/Button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Pagination = () => {
    const prevPageHandler = () => {};
    const nextPageHandler = () => {};

    return (
        <div className={styles.pagination}>
            <Button onClick={prevPageHandler}>
                <MdNavigateBefore /> Previous Page
            </Button>
            <Button onClick={nextPageHandler}>
                Next Page <MdNavigateNext />
            </Button>
        </div>
    );
};

export default Pagination;
