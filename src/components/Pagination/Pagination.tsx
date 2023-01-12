import styles from "./Pagination.module.css";
import Button from "../UI/Button/Button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store/store";
import { nextPage, prevPage } from "../../store/paginationSlice/paginationSlice";
import { useSearchParams } from "react-router-dom";

type Props = {
    totalPages: number;
};

const Pagination = ({ totalPages }: Props) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);

    const prevPageHandler = () => {
        dispatch(prevPage());
        setSearchParams({ p: (currentPage - 1).toString() });
    };
    const nextPageHandler = () => {
        dispatch(nextPage());
        setSearchParams({ p: (currentPage + 1).toString() });
    };

    const canNextBtnBeShown = currentPage >= 1 && currentPage < totalPages;
    const canPrevBtnBeShown = currentPage >= 2 && currentPage <= totalPages;

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
