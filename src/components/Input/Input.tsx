import styles from "./Input.module.css";
import { useState } from "react";
import isNumber from "../../helpers/isNumber";

const Input = () => {
    const [value, setValue] = useState("");

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === "") setValue(value);

        if (!isNumber(value)) return;
        setValue(value);
    };

    return (
        <input
            type="text"
            placeholder="Search by ID"
            className={styles.input}
            onChange={inputChangeHandler}
            value={value}
        />
    );
};

export default Input;
