import styles from "./Pagination.module.css";
import Button from "../UI/Button/Button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

type Props = {
    totalPages: number;
    currentPage: number;
};

const Pagination = ({ totalPages, currentPage }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prevPageHandler = () => setSearchParams({ p: (currentPage - 1).toString() });
    const nextPageHandler = () => setSearchParams({ p: (currentPage + 1).toString() });

    const canNextBtnBeShown = currentPage >= 1 && currentPage < totalPages;
    const canPrevBtnBeShown = currentPage >= 2 && currentPage <= totalPages;

    return (
        <div className={styles.pagination}>
            {canPrevBtnBeShown && (
                <Button onClick={prevPageHandler} dataTestId={"prev"}>
                    <MdNavigateBefore />
                </Button>
            )}
            <div className={styles["page-number"]}>
                <span data-testid={"page-number"}>
                    {currentPage} / {totalPages}
                </span>
            </div>
            {canNextBtnBeShown && (
                <Button onClick={nextPageHandler} nextBtn dataTestId={"next"}>
                    <MdNavigateNext />
                </Button>
            )}
        </div>
    );
};

export default Pagination;
