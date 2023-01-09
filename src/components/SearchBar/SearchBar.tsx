import styles from "./SearchBar.module.css";
import { useState } from "react";
import { isNumber } from "../../helpers/isNumber";
import Button from "../UI/Button/Button";
import { IoSearch } from "react-icons/io5";

type Props = {
    onSearch: (id: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
    const [enteredId, setEnteredId] = useState("");

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredId = event.target.value;

        if (enteredId === "") {
            setEnteredId(enteredId);
            return;
        }

        if (isNumber(enteredId)) {
            setEnteredId(enteredId);
        }
    };

    const searchHandler = () => onSearch(enteredId);

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
                Search <IoSearch />
            </Button>
        </div>
    );
};

export default SearchBar;
