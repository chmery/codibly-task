import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { isNumber } from "../../helpers/isNumber";
import Button from "../UI/Button/Button";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

type Props = {
    onSearch: (id: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [enteredId, setEnteredId] = useState("");

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredId = event.target.value;
        if (isNumber(enteredId) || enteredId === "") setEnteredId(enteredId);
    };

    const searchHandler = () => onSearch(enteredId);

    useEffect(() => {
        setEnteredId("");
    }, [searchParams]);

    return (
        <div className={styles["search-bar"]}>
            <input
                type="text"
                placeholder="Search by ID"
                className={styles.input}
                onChange={inputChangeHandler}
                value={enteredId}
            />
            <Button onClick={searchHandler}>
                <IoSearch />
            </Button>
        </div>
    );
};

export default SearchBar;
