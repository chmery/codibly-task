import styles from "./Button.module.css";
import { MdNavigateNext } from "react-icons/md";
import { IconType } from "react-icons/lib/esm/iconBase";

type Props = {
    text: string;
    onClick: () => void;
    icon: IconType;
};

const Button = ({ text, onClick, icon }: Props) => {
    return (
        <button className={styles.button}>
            Next Page <MdNavigateNext />
        </button>
    );
};

export default Button;
