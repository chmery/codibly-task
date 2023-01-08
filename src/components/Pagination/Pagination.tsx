import styles from "./Pagination.module.css";
import Button from "../Button/Button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store/store";
import { nextPage, prevPage } from "../../store/paginationSlice/paginationSlice";

const Pagination = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);

    const prevPageHandler = () => dispatch(prevPage());
    const nextPageHandler = () => dispatch(nextPage());

    // number 3 is to be replaced by api response

    const canNextBtnBeShown = currentPage >= 1 && currentPage < 3;
    const canPrevBtnBeShown = currentPage >= 2 && currentPage <= 3;

    return (
        <div className={styles.pagination}>
            {canPrevBtnBeShown && (
                <Button onClick={prevPageHandler}>
                    <MdNavigateBefore /> Previous Page
                </Button>
            )}
            {canNextBtnBeShown && (
                <Button onClick={nextPageHandler} nextBtn>
                    Next Page <MdNavigateNext />
                </Button>
            )}
        </div>
    );
};

export default Pagination;
